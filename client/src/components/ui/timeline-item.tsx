import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  company: string;
  position: string;
  period: string;
  description: string;
  roles?: string[];
  className?: string;
}

export function TimelineItem({ 
  company, 
  position, 
  period, 
  description, 
  roles,
  className 
}: TimelineItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <div 
      ref={ref}
      className={cn("relative pl-8 ml-2 mb-12 timeline-item", className)}
    >
      <div className="timeline-dot"></div>
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-md"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-wrap justify-between items-start mb-2">
          <h3 className="font-semibold text-xl text-primary">{company}</h3>
          <span className="text-sm text-secondary font-medium">{period}</span>
        </div>
        <h4 className="font-medium text-lg mb-3 text-gray-700">{position}</h4>
        <p className="text-gray-600">{description}</p>
        
        {roles && roles.length > 0 && (
          <ul className="list-disc ml-6 text-gray-600 space-y-2 mt-4">
            {roles.map((role, index) => (
              <li key={index}>{role}</li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
}
