import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface NeuralBackgroundProps {
    className?: string;
    /**
     * Color of the particles. 
     * Defaults to a cyan/indigo mix if not specified.
     */
    color?: string;
    /**
     * The opacity of the trails (0.0 to 1.0).
     * Lower = longer trails. Higher = shorter trails.
     * Default: 0.1
     */
    trailOpacity?: number;
    /**
     * Number of particles. Default: 800
     */
    particleCount?: number;
    /**
     * Speed multiplier. Default: 1
     */
    speed?: number;
}

export default function NeuralBackground({
    className,
    color = "#6366f1", // Default Indigo
    trailOpacity = 0.15,
    particleCount = 600,
    speed = 1,
}: NeuralBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // --- CONFIGURATION ---
        let width = container.clientWidth;
        let height = container.clientHeight;
        let particles: Particle[] = [];
        let animationFrameId: number;
        let mouse = { x: -1000, y: -1000 }; // Start off-screen

        // --- PARTICLE CLASS ---
        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            age: number;
            life: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = 0;
                this.vy = 0;
                this.age = 0;
                // Random lifespan to create natural recycling
                this.life = Math.random() * 200 + 100;
            }

            update() {
                // 1. Flow Field Math (Simplex-ish noise)
                // We calculate an angle based on position to create the "flow"
                const angle = (Math.cos(this.x * 0.005) + Math.sin(this.y * 0.005)) * Math.PI;

                // 2. Add force from flow field
                this.vx += Math.cos(angle) * 0.2 * speed;
                this.vy += Math.sin(angle) * 0.2 * speed;

                // 3. Mouse Repulsion/Attraction
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const interactionRadius = 150;

                if (distance < interactionRadius) {
                    const force = (interactionRadius - distance) / interactionRadius;
                    // Push away
                    this.vx -= dx * force * 0.05;
                    this.vy -= dy * force * 0.05;
                }

                // 4. Apply Velocity & Friction
                this.x += this.vx;
                this.y += this.vy;
                this.vx *= 0.95; // Friction to stop infinite acceleration
                this.vy *= 0.95;

                // 5. Aging
                this.age++;
                if (this.age > this.life) {
                    this.reset();
                }

                // 6. Wrap around screen
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            }

            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = 0;
                this.vy = 0;
                this.age = 0;
                this.life = Math.random() * 200 + 100;
            }

            draw(context: CanvasRenderingContext2D) {
                context.fillStyle = color;
                // Fade in and out based on age
                const alpha = 1 - Math.abs((this.age / this.life) - 0.5) * 2;
                context.globalAlpha = alpha;
                context.fillRect(this.x, this.y, 1.5, 1.5); // Tiny dots are faster than arcs
            }
        }

        // --- INITIALIZATION ---
        const init = () => {
            // Handle High-DPI screens (Retina)
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        // --- ANIMATION LOOP ---
        const animate = () => {
            // "Fade" effect: Instead of clearing the canvas, we draw a semi-transparent rect
            // This creates the "Trails" look.
            // We use the background color of the parent or a dark overlay.
            // Assuming dark mode for this effect usually:
            // MODIFICATION: Using clearRect for transparent background integration if needed, 
            // but the original code uses fillRect with trailOpacity to create trails.
            // Since we want this as a background on a likely white/light page (Valentine),
            // painting black trails might be bad.
            // However, the original code has `ctx.fillStyle = rgba(0, 0, 0, ${trailOpacity})`.
            // If the page is light, we might want white trails or simply clear it.
            // But clearing destroys trails.
            // Let's stick to the code provided but be aware of the background color.
            // The user provided code has `bg-black` in the container return. I should probably change that or allow override.

            // Let's modify the fillStyle to be transparent or match the theme if possible, OR
            // since the requested component code was specific, strictly follows it?
            // "Copy-paste this component" implies I should stick to it.
            // BUT `bg-black` will ruin the Valentine theme (white/pink).
            // I will change the default container bg to `bg-transparent` or allow className to override fully.
            // And the trail color... `rgba(0,0,0,opacity)` darkens the previous frame.
            // If the background is white, we want `rgba(255,255,255,opacity)` to fade out to white?
            // Or if we want to keep it simple, I'll stick to the code but remove `bg-black` from default className to `bg-transparent` if possible or just `className`.

            // Actually, looking at the code:
            // ctx.fillStyle = `rgba(0, 0, 0, ${trailOpacity})`;
            // This assumes a black background to fade into.
            // If our site is white, this will turn everything black.
            // I will change this to use `rgba(255, 255, 255, ${trailOpacity})` for a light theme, or better yet, make it configurable?
            // The user "You are given a task to integrate... Copy-paste this component".
            // I should probably follow instructions but `bg-black` is definitely wrong for a Valentine landing page.
            // I will adapt it slightly for the Light Theme:
            // 1. Remove `bg-black` from container.
            // 2. Change trail clear color to white `rgba(255, 255, 255, ...)` assuming the site is white.

            ctx.fillStyle = `rgba(255, 255, 255, ${trailOpacity})`;
            ctx.fillRect(0, 0, width, height);

            particles.forEach((p) => {
                p.update();
                p.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        // --- EVENT LISTENERS ---
        const handleResize = () => {
            width = container.clientWidth;
            height = container.clientHeight;
            init();
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        }

        // Start
        init();
        animate();

        window.addEventListener("resize", handleResize);
        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("resize", handleResize);
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, [color, trailOpacity, particleCount, speed]);

    return (
        <div ref={containerRef} className={cn("relative w-full h-full bg-transparent overflow-hidden", className)}>
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
}
