import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkillBarProps {
  name: string;
  level: number;
  className?: string;
}

export function SkillBar({ name, level, className }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    if (isInView && !animated) {
      setAnimated(true);
    }
  }, [isInView, animated]);
  
  return (
    <div className={cn("mb-4", className)} ref={ref}>
      <div className="flex justify-between mb-1">
        <span className="font-medium">{name}</span>
        <span>{level}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-secondary rounded-full transition-all duration-1000 ease-out origin-left"
          style={{ 
            width: `${level}%`,
            transform: animated ? 'scaleX(1)' : 'scaleX(0)'
          }}
        />
      </div>
    </div>
  );
}
