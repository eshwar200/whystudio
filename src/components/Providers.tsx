"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { JourneyProvider } from "@/lib/store";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <JourneyProvider>{children}</JourneyProvider>
    </MotionConfig>
  );
}
