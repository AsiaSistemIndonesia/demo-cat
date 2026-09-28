import Link from "next/link";
import { LogOut, Menu } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { LiveClock } from "@/components/live-clock";
import { Button, buttonVariants } from "@/components/ui/button";
import { participant } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function initials(name: string) {
  return name
    .split(" ")
    .filter((part) => /^[A-Za-z]{2,}/.test(part))
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 border-b bg-card">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon-lg" aria-label="Buka menu">
            <Menu className="size-5" />
          </Button>
          <Link href="/dashboard" aria-label="CAT SIM JF — Dashboard">
            <BrandLogo showSubtitle={false} />
          </Link>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:block">
            <LiveClock />
          </div>
          <div className="hidden h-8 w-px bg-border md:block" />
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
              {initials(participant.name)}
            </span>
            <div className="hidden flex-col leading-tight lg:flex">
              <span className="max-w-56 truncate text-sm font-semibold">
                {participant.name}
              </span>
              {/* <span className="text-xs text-muted-foreground">
                {participant.username}
              </span> */}
            </div>
          </div>
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "px-3",
            )}
          >
            <LogOut />
            <span className="hidden sm:inline">Logout</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
