import { cn } from "@/lib/utils";

import Image from "next/image";

export function BrandMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex size-10 shrink-0 items-center justify-center",
        className,
      )}
    >
      <Image
        src="/assets/img/company_logo.png"
        alt="Company Logo"
        fill
        className="bg-transparent object-contain"
      />
    </div>
  );
}

export function BrandLogo({
  className,
  showSubtitle = true,
  inverted = false,
}: {
  className?: string;
  showSubtitle?: boolean;
  inverted?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <BrandMark
        className={cn(inverted && "bg-primary-foreground text-primary")}
      />
      <div className="flex flex-col leading-tight">
        <span
          className={cn(
            "text-base font-extrabold tracking-tight",
            inverted ? "text-primary-foreground" : "text-primary",
          )}
        >
          CAT SIM JF
        </span>
        {showSubtitle && (
          <span
            className={cn(
              "text-xs",
              inverted ? "text-primary-foreground/70" : "text-muted-foreground",
            )}
          >
            Computer Assisted Test Jabatan Fungsional
          </span>
        )}
      </div>
    </div>
  );
}
