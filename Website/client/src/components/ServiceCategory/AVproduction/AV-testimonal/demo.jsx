"use client";
import React from "react";
// Ensure the filename matches where you saved the previous component
import { CircularTestimonials } from './circular-testimonals'; 

const testimonials = [
  {
    quote: "The corporate video they produced for our annual report exceeded all expectations. Their team's attention to detail and creative storytelling transformed complex financial data into an engaging visual narrative that our shareholders loved.",
    name: "Sarah Chen",
    designation: "Marketing Director, TechVision Inc.",
    src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote: "Our product launch video generated a 40% increase in pre-orders. The team understood our vision perfectly and delivered content that was both innovative and perfectly aligned with our brand identity. The animation work was particularly outstanding.",
    name: "Marcus Rodriguez",
    designation: "Product Manager, Innovate Labs",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
  },
  {
    quote: "As a startup, we needed impactful video content that wouldn't break our budget. They delivered exceptional quality at every stage—from concept to final edit. Our social media engagement tripled after launching their video campaign.",
    name: "Priya Sharma",
    designation: "Founder & CEO, GreenTech Solutions",
    src: "https://tse4.mm.bing.net/th/id/OIP.ByTEaHkCx1_fzVlEj-AKywHaE8?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    quote: "The event coverage for our international conference was flawless. They captured every key moment with cinematic quality and delivered the highlights reel within 24 hours. The footage has been invaluable for our future marketing campaigns.",
    name: "James Wilson",
    designation: "Events Director, Global Finance Forum",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
  },
  {
    quote: "Working with their team on our testimonial videos was a pleasure. They created a comfortable environment for our customers to share authentic stories, resulting in content that genuinely builds trust with potential clients.",
    name: "Elena Petrova",
    designation: "Head of Customer Success, CloudSecure",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
  },
  {
    quote: "The explainer video series they created for our SaaS platform reduced customer onboarding time by 60%. Their ability to simplify complex technical concepts through clear visuals and concise narration is remarkable.",
    name: "David Kim",
    designation: "CTO, DataFlow Analytics",
    src: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
  },
];

export const CircularTestimonialsDemo = () => {
  return (
    <section>
      {/* Light testimonials section */}
      <div className="bg-white p-20 rounded-lg min-h-[300px] flex flex-wrap gap-6 items-center justify-center relative">
        <div
          className="items-center justify-center relative flex w-full"
          style={{ maxWidth: "1456px" }}
        >
          <CircularTestimonials
            testimonials={testimonials}
            autoplay={true}
            colors={{
              name: "#0a0a0a",
              designation: "#454545",
              testimony: "#171717",
              arrowBackground: "#ff5e00ff",
              arrowForeground: "#f1f1f7",
              arrowHoverBackground: "#ffae00ff",
            }}
            fontSizes={{
              name: "28px",
              designation: "20px",
              quote: "20px",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default CircularTestimonialsDemo;
