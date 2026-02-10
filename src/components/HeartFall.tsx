import React, { useEffect, useRef } from 'react';

const COLORS = ['#E11D48', '#FB7185', '#FFF1F2', '#FECDD3', '#F43F5E'];

class HeartSprite {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    radius: number;

    constructor(color: string) {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d")!;
        this.radius = 8;
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = this.radius * 2 * dpr;
        this.canvas.height = this.radius * 2 * dpr;
        this.ctx.scale(dpr, dpr);
        this.ctx.fillStyle = color;
        this.drawHeart();
    }

    drawHeart() {
        const ctx = this.ctx;
        const r = this.radius;
        ctx.translate(r, r);
        ctx.beginPath();
        // Simple heart shape
        ctx.moveTo(0, 4);
        ctx.bezierCurveTo(-2, 2, -5, -1, -5, -4);
        ctx.bezierCurveTo(-5, -7, -2, -8, 0, -5);
        ctx.bezierCurveTo(2, -8, 5, -7, 5, -4);
        ctx.bezierCurveTo(5, -1, 2, 2, 0, 4);
        ctx.fill();
    }
}

const HeartFall: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        let w: number, h: number;
        let hearts: any[] = [];
        const sprites: HTMLCanvasElement[] = [];

        const init = () => {
            COLORS.forEach(color => {
                sprites.push(new HeartSprite(color).canvas);
            });
            restart();
        };

        const restart = () => {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w;
            canvas.height = h;
            hearts = [];
            // Minimalist count
            for (let i = 0; i < 150; i++) {
                hearts.push(createHeart(true));
            }
        };

        const createHeart = (initial = false) => {
            return {
                x: Math.random() * w,
                y: initial ? Math.random() * h : -20,
                vx: (Math.random() - 0.5) * 0.5,
                vy: 0.5 + Math.random() * 1.5,
                r: 2 + Math.random() * 4,
                rot: Math.random() * Math.PI * 2,
                rv: (Math.random() - 0.5) * 0.02,
                sprite: sprites[Math.floor(Math.random() * sprites.length)],
                opacity: 0.1 + Math.random() * 0.4
            };
        };

        const render = () => {
            ctx.clearRect(0, 0, w, h);

            for (let i = 0; i < hearts.length; i++) {
                const hrt = hearts[i];

                hrt.x += hrt.vx;
                hrt.y += hrt.vy;
                hrt.rot += hrt.rv;

                if (hrt.y > h + 10 || hrt.x > w + 10 || hrt.x < -10) {
                    Object.assign(hrt, createHeart(false));
                }

                ctx.save();
                ctx.translate(hrt.x, hrt.y);
                ctx.rotate(hrt.rot);
                ctx.globalAlpha = hrt.opacity;
                ctx.drawImage(hrt.sprite, -hrt.r, -hrt.r, hrt.r * 2, hrt.r * 2);
                ctx.restore();
            }
            requestAnimationFrame(render);
        };

        init();
        render();

        window.addEventListener('resize', restart);
        return () => window.removeEventListener('resize', restart);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none -z-50"
            style={{ background: 'transparent' }}
        />
    );
};

export default HeartFall;
