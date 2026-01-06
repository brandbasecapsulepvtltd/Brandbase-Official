"use client";
import React from "react";
// Adjust the import path to match your file structure
import { ContainerScroll } from "./ContainerScroll"; 

export default function ConScroll() {
  return (
    <div className="flex flex-col overflow-hidden bg-white dark:bg-black text-black dark:text-white dark:bg-black dark:text-white">
      {/* Section 1 */}
      <ContainerScroll
        titleComponent={
          <h1 className="text-4xl font-semibold text-black dark:text-white dark:text-white">
            Dive into the Depths of Creativity
            <br />
            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
              Where Every Scroll Breathes Life
            </span>
          </h1>
        }
      >
        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&h=720&auto=format&fit=crop"
          alt="hero"
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>

      {/* Section 2 */}
      <ContainerScroll
        titleComponent={
          <h1 className="text-4xl font-semibold text-black dark:text-white dark:text-white">
            Build with the Power of Code
            <br />
            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
              Your Vision, Seamlessly Integrated
            </span>
          </h1>
        }
      >
        <img
          src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1400&h=720&auto=format&fit=crop"
          alt="hero"
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>

      {/* Section 3 */}
      <ContainerScroll
        titleComponent={
          <h1 className="text-4xl font-semibold text-black dark:text-white dark:text-white">
            Collaborate and Create, Together
            <br />
            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
              Unlock Your Team's Potential
            </span>
          </h1>
        }
      >
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&h=720&auto=format&fit=crop"
          alt="hero"
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
