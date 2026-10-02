import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border border-transparent bg-zinc-800 text-zinc-100 hover:bg-zinc-700",
        success:
          "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono",
        danger:
          "border border-rose-500/30 bg-rose-500/10 text-rose-400 font-mono",
        cyan:
          "border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono",
        warning:
          "border border-amber-500/30 bg-amber-500/10 text-amber-400 font-mono",
        outline:
          "border border-zinc-700/80 bg-zinc-900/40 text-zinc-300",
        purple:
          "border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 font-mono",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
