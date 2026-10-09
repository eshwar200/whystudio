"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

interface Props extends HTMLMotionProps<"div"> {
  delay?: number;
  y?: number;
}

/** Scroll-triggered reveal. Runs once. Respects reduced motion via MotionConfig. */
export function Reveal({ delay = 0, y = 28, children, ...rest }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * Headline that rises line by line. Pass lines as an array.
 * The observer sits on the heading itself (not the clipped inner spans,
 * which IntersectionObserver would report as never visible).
 */
const lineVariants = {
  hidden: { y: "105%" },
  show: (i: number) => ({ y: "0%", transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 } }),
};

export function RevealLines({ lines, className, as = "h2" }: { lines: string[]; className?: string; as?: "h1" | "h2" | "h3" | "p" }) {
  const Tag = motion[as];
  return (
    <Tag className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -8% 0px" }}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span className="block" variants={lineVariants} custom={i}>
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
