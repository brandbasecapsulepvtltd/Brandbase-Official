"use client";
import React from "react";
// Adjust the import path to match your file structure
import { ContainerScroll } from "./ContainerScroll"; 

export default function ConScroll() {
  return (
    <div className="flex flex-col overflow-hidden bg-white dark:bg-zinc-900 dark:bg-black text-black dark:text-white dark:bg-black dark:text-white">
      {/* Section 1 */}
      <ContainerScroll
        titleComponent={
          <h2 className="text-4xl font-semibold text-black dark:text-white">
            Cinematic storytelling
            <br />
            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
              Built for your brand
            </span>
          </h2>
        }
      >
        <img
          src="https://images.pexels.com/photos/8412361/pexels-photo-8412361.jpeg?auto=compress&cs=tinysrgb&w=1400"
          alt="Director reviewing footage on a film set"
          className="mx-auto rounded-2xl object-cover h-full object-center"
          draggable={false}
        />
      </ContainerScroll>

      <ContainerScroll
        titleComponent={
          <h2 className="text-4xl font-semibold text-black dark:text-white">
            Commercial & corporate films
            <br />
            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
            From concept to final cut
            </span>
          </h2>
        }
      >
        <img
          src="https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1400"
          alt="Professional cinema camera rig"
          className="mx-auto rounded-2xl object-cover h-full object-center"
          draggable={false}
        />
      </ContainerScroll>

      <ContainerScroll
        titleComponent={
          <h2 className="text-4xl font-semibold text-black dark:text-white">
            Event coverage & social reels
            <br />
            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
              Content that performs
            </span>
          </h2>
        }
      >
        <img
          src="https://images.pexels.com/photos/6883796/pexels-photo-6883796.jpeg?auto=compress&cs=tinysrgb&w=1400"
          alt="Video production studio lighting setup"
          className="mx-auto rounded-2xl object-cover h-full object-center"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
