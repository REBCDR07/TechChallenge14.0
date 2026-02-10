import React, { useId } from 'react';
import { cn } from '@/lib/utils';
import './electric-card.css';

interface ElectricCardProps {
    children: React.ReactNode;
    className?: string;
    color?: string; // Optional override
}

export const ElectricCard = ({ children, className, color }: ElectricCardProps) => {
    const id = useId();
    const filterId = `turbulent-displace-${id.replace(/:/g, '')}`;

    return (
        <div className={cn("electric-card-container relative p-[2px]", className)}>
            {/* SVG Filters Definition - Hidden but functional */}
            <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
                <defs>
                    <filter id={filterId} colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
                        <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
                            <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
                        </feOffset>

                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
                        <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
                            <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
                        </feOffset>

                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2" />
                        <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
                            <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
                        </feOffset>

                        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2" />
                        <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
                            <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
                        </feOffset>

                        <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
                        <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
                        <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />

                        <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="30" xChannelSelector="R" yChannelSelector="B" />
                    </filter>
                </defs>
            </svg>

            <div className="electric-inner-container w-full h-full relative rounded-[22px] bg-white/90 backdrop-blur-sm">
                {/* Moving Border Layers */}
                <div className="electric-border-outer" />
                <div
                    className="electric-main-border"
                    style={{ filter: `url(#${filterId})` }}
                />
                <div className="electric-glow-layer-1" />
                <div className="electric-glow-layer-2" />

                {/* Glow & Overlay */}
                <div className="electric-overlay-1" />
                <div className="electric-background-glow" />

                {/* Content */}
                <div className="electric-content rounded-[22px] overflow-hidden h-full">
                    {children}
                </div>
            </div>
        </div>
    );
};
