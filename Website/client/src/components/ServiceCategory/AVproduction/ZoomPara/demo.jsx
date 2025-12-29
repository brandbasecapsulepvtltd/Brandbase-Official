'use client';
import React from 'react';
import { cn } from '@/lib/utils'; // Ensure you have this utility or remove 'cn' wrapper
import Lenis from '@studio-freight/lenis'
// Adjust this import path based on where you saved the file above
import { ZoomParallax } from "./zoom-parallax"; 

export default function DefaultDemo() {

    React.useEffect(() => {
        const lenis = new Lenis()

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
    }, [])

    const images = [
        {
            src: 'https://images.pexels.com/photos/2510425/pexels-photo-2510425.jpeg',
            alt: 'Modern architecture building',
        },
        {
            src: 'https://images.pexels.com/photos/3062545/pexels-photo-3062545.jpeg',
            alt: 'Urban cityscape at sunset',
        },
        {
            src: 'https://images.pexels.com/photos/2883160/pexels-photo-2883160.jpeg',
            alt: 'Abstract geometric pattern',
        },
        {
            src: 'https://images.pexels.com/photos/3062547/pexels-photo-3062547.jpeg',
            alt: 'Mountain landscape',
        },
        {
            src: 'https://images.pexels.com/photos/3062539/pexels-photo-3062539.jpeg',
            alt: 'Minimalist design elements',
        },
        {
            src: 'https://images.pexels.com/photos/67654/pexels-photo-67654.jpeg',
            alt: 'Ocean waves and beach',
        },
        {
            src: 'https://images.pexels.com/photos/8088378/pexels-photo-8088378.jpeg',
            alt: 'Forest trees and sunlight',
        },
    ];

    return (
        <main className="min-h-screen w-full">
            <div className="relative flex h-[50vh] items-center justify-center">
                {/* Radial spotlight */}
                <div
                    aria-hidden="true"
                    className={cn(
                        'pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full',
                        'bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)]',
                        'blur-[30px]',
                    )}
                />
                <h1 className="text-center text-4xl font-bold">
                    Scroll Down for Zoom Parallax
                </h1>
            </div>
            <ZoomParallax images={images} />
            <div className="h-[50vh]"/>
        </main>
    );
}