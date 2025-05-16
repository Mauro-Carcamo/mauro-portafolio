import { cn } from "@/lib/utils";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <h2 className={cn(
      "font-bold text-3xl mb-8 text-primary text-center data-accent inline-block mx-auto",
      className
    )}>
      {children}
    </h2>
  );
}
