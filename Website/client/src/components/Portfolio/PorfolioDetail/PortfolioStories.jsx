"use client";
import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Story,
    StoryProgress,
    StoryControls,
    StorySlide,
    StoryOverlay,
} from "@/components/ui/story";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";

const STORIES_DATA = [
    {
        id: "fabrizio",
        username: "Fabrizio",
        handle: "@FabrizioRomano",
        avatarSrc: "https://scontent.forn3-5.fna.fbcdn.net/v/t39.30808-1/347110386_993663875383747_583934797072922306_n.jpg?stp=c0.124.1179.1179a_cp0_dst-jpg_s80x80_tt6&_nc_cat=1&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=sznTMSftQGgQ7kNvwFnYrhK&_nc_oc=Adl88GWERQJFnS-FhRo3kmyRvwQeqel4uE97CRcHAX2hgEouXRhN98vLowFYZewYbKE&_nc_zt=24&_nc_ht=scontent.forn3-5.fna&_nc_gid=zgCgewXONoFNXl_Ycl7B9Q&oh=00_AfP29XsY8aMHX1lZasw43qaYzda8eY9esKHCjO-ZARUk5A&oe=684D1280",
        gradient: "from-yellow-400 via-red-500 to-purple-500 hover:from-yellow-500 hover:via-red-600 hover:to-purple-600",
        stories: [
            {
                title: 'Champions league will begin soon',
                caption: 'whos you are running for ?',
                storyImage: 'https://images.unsplash.com/photo-1569617234470-9e9813ee1dae?q=80&w=2235&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            {
                title: "who's your favourite player ?",
                caption: 'who you think will win the champions league ?',
                storyImage: 'https://images.unsplash.com/photo-1570498839593-e565b39455fc?q=80&w=2235&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
        ]
    },
    {
        id: "shadcn",
        username: "shadcn",
        handle: "@shadcn",
        avatarSrc: "https://pbs.twimg.com/profile_images/1593304942210478080/TUYae5z7_400x400.jpg",
        gradient: "from-pink-500 via-red-500 to-yellow-500 hover:from-pink-600 hover:via-red-600 hover:to-yellow-600",
        stories: [
            {
                title: 'Easy vibes',
                caption: 'In the System Prompts.',
                storyImage: 'https://pbs.twimg.com/media/Gr5BeX6WwAAgGH_?format=jpg&name=large',
            },
            {
                title: 'The new calendar.tsx is here',
                caption: `
        → Latest react-daypicker
        → Tailwind v3 and v4
        → Date, range & time pickers
        → Persian, Hijri & timezone support
        → 30+ examples to copy, paste, and build.
        `,
                storyImage: 'https://pbs.twimg.com/media/GsxdzRfb0AIUBSs?format=jpg&name=large',
            },
            {
                title: '🤣🤣🤣🤣🤣',
                caption: 'Me walking away after adding min-w-0 and it works.',
                storyImage: 'https://pbs.twimg.com/media/Gsh-UBoasAM_Uin?format=jpg&name=medium',
            },
        ]
    },
    {
        id: "nba",
        username: "NBA",
        handle: "@nba",
        avatarSrc: "https://pbs.twimg.com/profile_images/1931904469446377472/mjaR8LDc_400x400.jpg",
        gradient: "from-blue-500 via-indigo-500 to-cyan-500 hover:from-blue-600 hover:via-indigo-600 hover:to-cyan-600",
        stories: [
            {
                title: 'Shai follows 38 in Game 1 with 34 tonight 🔥🔥🔥',
                caption: 'MOST POINTS EVER by a player in his first 2 career Finals games 🚨🚨',
                storyImage: 'https://pbs.twimg.com/media/Gs-BiiMbsAAIK9p?format=jpg&name=large',
            },
        ]
    }
];

const PortfolioStories = () => {
    return (
        <section className="w-full py-12 md:py-16 bg-white dark:bg-black overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">

                    {/* Left: Text Section */}
                    <div className="text-center lg:text-left shrink-0 lg:w-[25%]">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-gray-900 dark:text-white">
                            our recent <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                                best work
                            </span>
                        </h2>
                    </div>

                    {/* Center: Stories Carousel */}
                    <div className="flex-1 w-full flex justify-center overflow-visible lg:px-4">
                        <div className="flex items-center gap-4 md:gap-6 overflow-x-auto py-3 px-6 md:px-8 scrollbar-hide snap-x bg-gray-50/80 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 rounded-full shadow-sm">
                            {STORIES_DATA.map((user) => (
                                <StoryDialog key={user.id} user={user} />
                            ))}
                        </div>
                    </div>

                    {/* Right: CTA Section */}
                    <div className="text-center lg:text-right shrink-0 lg:w-[25%] flex flex-col items-center lg:items-end gap-3">
                        <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200">
                            You can be next
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 max-w-[200px] lg:max-w-none">
                            Join our success stories today.
                        </p>
                        <Link href="/appointment">
                            <Button className="rounded-full px-8 py-6 text-base font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-none">
                                Start Project <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

const StoryDialog = ({ user }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="snap-center flex flex-col items-center gap-3 group cursor-pointer transition-transform hover:scale-105 duration-300 shrink-0">
                    <div className={`p-[4px] rounded-full bg-gradient-to-tr ${user.gradient} transition-all duration-500 shadow-xl group-hover:shadow-2xl`}>
                        <Avatar className="size-15 md:size-18 lg:size-20 border-[4px] border-white dark:border-black shadow-inner">
                            <AvatarImage
                                src={user.avatarSrc}
                                alt={user.handle}
                                className="object-cover"
                            />
                            <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </div>
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors">
                        {user.username}
                    </span>
                </div>
            </DialogTrigger>

            <DialogContent className="aspect-[9/16] w-full max-w-[420px] h-[90vh] overflow-hidden p-0 rounded-3xl border-none outline-none">
                <DialogTitle className="sr-only">{user.username}'s Story</DialogTitle>

                <Story
                    className="relative size-full bg-black"
                    duration={5000}
                    mediaLength={user.stories.length}
                >
                    {/* Header */}
                    <DialogHeader className="absolute top-0 w-full z-20 px-4 py-6 bg-gradient-to-b from-black/60 to-transparent">
                        <div className="relative flex items-center gap-3">
                            <Avatar className="size-10 border border-white/20">
                                <AvatarImage src={user.avatarSrc} alt={user.handle} />
                                <AvatarFallback>{user.username[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-white font-semibold text-sm drop-shadow-md">
                                {user.username}
                            </span>

                            <StoryProgress
                                className="flex-1 ml-3"
                                progressWrapClass="h-0.5 bg-white/30"
                                progressActiveClass="bg-white"
                            />

                            <StoryControls
                                variant="ghost"
                                size="icon"
                                className="text-white/80 hover:text-white hover:bg-white/10 rounded-full ml-1 w-9 h-9"
                            />
                        </div>
                    </DialogHeader>

                    {/* Slides */}
                    {user.stories.map((story, idx) => (
                        <StorySlide
                            key={idx}
                            index={idx}
                            className="absolute inset-0 size-full"
                        >
                            <div className="relative w-full h-full flex items-center justify-center bg-zinc-950">
                                <img
                                    src={story.storyImage}
                                    className="w-full h-full object-cover"
                                    alt={story.title}
                                />

                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 w-full z-10 p-8 pt-32 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent">
                                    <div className="space-y-3 transform translate-y-0 transition-transform">
                                        <a
                                            className="inline-flex items-center text-white/90 text-[13px] font-medium hover:text-white hover:underline transition-colors px-2 py-1 bg-white/10 rounded-full backdrop-blur-sm"
                                            href={`https://x.com/${user.handle.replace('@', '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {user.handle}
                                        </a>
                                        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight drop-shadow-lg">
                                            {story.title}
                                        </h3>
                                        {story.caption && (
                                            <p className="text-base text-gray-200/90 leading-relaxed line-clamp-3 font-normal drop-shadow-md">
                                                {story.caption}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </StorySlide>
                    ))}

                    <StoryOverlay />
                </Story>
            </DialogContent>
        </Dialog>
    );
};

export default PortfolioStories;
