"use client";
import React from 'react';
import { CircularGallery } from './circular-gallery';

const corporateVideoData = [
    {
        concept: 'Strategic Brand Story',
        description: 'Crafting a compelling narrative that connects your brand with its audience.',
        shot: {
            url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&auto=format&fit=crop&q=80',
            text: 'A team in a modern office collaboratively brainstorming over a storyboard.',
            pos: 'center',
            by: 'Austin Distel'
        }
    },
    {
        concept: 'Cinematic Corporate Intro',
        description: 'Powerful opening sequences that establish tone and prestige.',
        shot: {
            url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&auto=format&fit=crop&q=80',
            text: 'A dynamic, slow-motion shot of a professional walking through a sleek office lobby.',
            pos: '60% 30%',
            by: 'Surface'
        }
    },
    {
        concept: 'Leadership & Vision',
        description: 'Authentic executive interviews that communicate vision and trust.',
        shot: {
            url: 'https://images.pexels.com/photos/8837781/pexels-photo-8837781.jpeg',
            text: 'A confident CEO being interviewed in a sunlit, minimalist office.',
            pos: '70% 40%',
            by: 'Christina @ wocintechchat.com'
        }
    },
    {
        concept: 'Product in Action',
        description: 'Showcasing product features and benefits through elegant visuals.',
        shot: {
            url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&auto=format&fit=crop&q=80',
            text: 'Close-up, detailed shots of hands interacting with a high-tech product.',
            pos: '50% 30%',
            by: 'ThisisEngineering RAEng'
        }
    },
    {
        concept: 'Team & Culture',
        description: 'Capturing the energy, collaboration, and spirit of your workplace.',
        shot: {
            url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&auto=format&fit=crop&q=80',
            text: 'A diverse team laughing and collaborating in a creative studio space.',
            pos: 'center',
            by: 'Austin Distel'
        }
    },
    {
        concept: 'Motion Graphics & Data',
        description: 'Transforming complex data into clear, engaging animated visuals.',
        shot: {
            url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=900&auto=format&fit=crop&q=80',
            text: 'Animated graphs and charts displayed on a designer’s computer screen.',
            pos: '35% 20%',
            by: 'Carlos Muza'
        }
    },
    {
        concept: 'Customer Testimonials',
        description: 'Genuine stories from satisfied clients that build social proof.',
        shot: {
            url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=900&auto=format&fit=crop&q=80',
            text: 'A smiling customer speaking candidly in a relaxed, real-world setting.',
            pos: '65% 50%',
            by: 'Mapbox'
        }
    },
    {
        concept: 'Event Highlights',
        description: 'Energetic recap videos of conferences, launches, and celebrations.',
        shot: {
            url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&auto=format&fit=crop&q=80',
            text: 'Crowd shot at a corporate event with vibrant lighting and a speaker on stage.',
            pos: '50% 20%',
            by: 'Product School'
        }
    },
    {
        concept: 'Drone & Establishing Shots',
        description: 'Breathtaking aerial and location shots that showcase scale and setting.',
        shot: {
            url: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=900&auto=format&fit=crop&q=80',
            text: 'A sweeping drone shot ascending over a modern corporate campus.',
            pos: 'center',
            by: 'Jørgen Håland'
        }
    },
    {
        concept: 'Call to Action',
        description: 'A strong, clear finale that drives the viewer to engage.',
        shot: {
            url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=900&auto=format&fit=crop&q=80',
            text: 'A clean shot of a website contact form or a hand clicking a call-to-action button.',
            pos: '40% 60%',
            by: 'Firmbee.com'
        }
    }
];

const CircularGalleryDemo = () => {
  return (
    // This outer container provides the scrollable height
    <div className="w-full bg-white text-foreground" style={{ height: '500vh' }}>
      {/* This inner container sticks to the top while scrolling */}
      <div className="w-full h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden">
        <div className="w-full h-full">
          <CircularGallery items={corporateVideoData} />
        </div>
      </div>
    </div>
  );
};

export default CircularGalleryDemo;
