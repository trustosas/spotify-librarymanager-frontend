"use client";

import Link from "next/link";
import { Button } from "@/registry/new-york-v4/ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun, Music } from "lucide-react";

const MlaNav = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-8 items-center justify-center rounded-md bg-brand text-black font-bold"><Music className="size-4" /></span>
          <Link href="/" className="text-sm font-semibold tracking-tight">
            Music Library Assistant
          </Link>
          <span className="hidden text-muted-foreground/80 sm:inline">— Manage and move your playlists</span>
        </div>
        <nav className="flex items-center gap-2 sm:gap-3">
          <Link href="#features" className="hidden text-sm hover:underline underline-offset-4 sm:inline">
            Features
          </Link>
          <Link href="#pricing" className="hidden text-sm hover:underline underline-offset-4 sm:inline">
            Free
          </Link>
          <Link href="#faq" className="hidden text-sm hover:underline underline-offset-4 sm:inline">
            FAQ
          </Link>
          <Button asChild
            variant="outline"
            className="hidden sm:inline-flex border-brand text-brand hover:bg-brand/10">
            <a href="#demo">Live Demo</a>
          </Button>
          <Button className="bg-brand text-black hover:bg-brand/90">Start free</Button>
          <button
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="inline-flex size-9 items-center justify-center rounded-md border hover:bg-accent">
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default MlaNav;
