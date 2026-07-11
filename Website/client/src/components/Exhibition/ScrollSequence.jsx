import React, { useEffect, useRef, useState } from 'react';

const ScrollSequence = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Scroll duration in screen heights
    const scrollHeight = 500;

    useEffect(() => {
        const loadImages = async () => {
            // Total number of frames in the public folder
            const totalFrames = 178;

            const loadedImages = [];

            // Load images from public folder
            for (let i = 1; i <= totalFrames; i++) {
                const img = new Image();
                const frameNumber = i.toString().padStart(3, '0');
                img.src = `/ezgif-7e9344113e6a6bd7-jpg/ezgif-frame-${frameNumber}.jpg`;
                loadedImages.push(img);
            }

            // Wait for all images to load
            await Promise.all(loadedImages.map(img => new Promise((resolve) => {
                if (img.complete) {
                    resolve();
                } else {
                    img.onload = resolve;
                    img.onerror = () => {
                        console.warn(`Failed to load frame: ${img.src}`);
                        resolve(); // Resolve anyway to avoid hanging
                    };
                }
            })));

            setImages(loadedImages);
            setIsLoading(false);
        };

        loadImages();
    }, []);

    useEffect(() => {
        if (isLoading || images.length === 0) return;

        const renderFrame = (index, canvas) => {
            const ctx = canvas.getContext('2d');
            const img = images[index];
            if (!img) return;

            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.max(hRatio, vRatio);

            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img,
                0, 0, img.width, img.height,
                centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
            );
        };

        const handleScroll = () => {
            if (!containerRef.current || !canvasRef.current) return;

            const container = containerRef.current;
            const canvas = canvasRef.current;
            const rect = container.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate scroll progress through the container
            // Start pinning when container top touches viewport top (rect.top <= 0)
            // Stop pinning when container bottom touches viewport bottom (rect.bottom <= windowHeight)

            const totalScrollableDistance = rect.height - windowHeight;

            // Determine positioning state
            let progress = 0;

            if (rect.top > 0) {
                // Before the section
                progress = 0;
                canvas.style.position = 'absolute';
                canvas.style.top = '0px';
                canvas.style.bottom = 'auto';
                canvas.style.left = '0px';
            } else if (rect.bottom < windowHeight) {
                // After the section
                progress = 1;
                canvas.style.position = 'absolute';
                canvas.style.top = 'auto';
                canvas.style.bottom = '0px';
                canvas.style.left = '0px';
            } else {
                // Inside the section (Pinned)
                progress = Math.abs(rect.top) / totalScrollableDistance;
                canvas.style.position = 'fixed';
                canvas.style.top = '0px';
                canvas.style.bottom = 'auto';
                canvas.style.left = '0px';
            }

            // Clamp progress
            progress = Math.max(0, Math.min(1, progress));

            const frameIndex = Math.min(
                images.length - 1,
                Math.floor(progress * (images.length - 1))
            );

            // Only re-render if we haven't already rendered this frame (optimization)
            if (canvas.dataset.lastFrame !== frameIndex.toString()) {
                renderFrame(frameIndex, canvas);
                canvas.dataset.lastFrame = frameIndex.toString();
            }
        };

        const handleResize = () => {
            if (canvasRef.current && containerRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                handleScroll();
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        // Initial setup
        handleResize();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [isLoading, images]);

    if (isLoading) {
        return (
            <div className="h-screen w-full bg-black flex items-center justify-center text-[#FF6600] z-50 relative">
                Loading Experience...
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            style={{ height: `${scrollHeight}vh` }}
            className="relative bg-black w-full"
        >
            <canvas
                ref={canvasRef}
                className="w-full h-screen block z-10"
            />
            {/* Helper overlay to indicate scroll if needed */}
        </div>
    );
};

export default ScrollSequence;
