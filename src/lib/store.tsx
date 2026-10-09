"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { CapabilityId } from "@/content/types";

/**
 * Tiny shared state so the experience carries context forward:
 * what the visitor typed in the hero → which capability opens in the OS →
 * which stage and text pre-fill the application.
 */
interface Journey {
  buildingText: string;
  stageId: string | null;
  focusCapability: CapabilityId | null;
  setBuildingText: (t: string) => void;
  setStageId: (s: string | null) => void;
  setFocusCapability: (c: CapabilityId | null) => void;
  goTo: (hash: string) => void;
}

const Ctx = createContext<Journey | null>(null);

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [buildingText, setBuildingText] = useState("");
  const [stageId, setStageId] = useState<string | null>(null);
  const [focusCapability, setFocusCapability] = useState<CapabilityId | null>(null);

  const goTo = useCallback((hash: string) => {
    const el = document.querySelector(hash);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", hash);
  }, []);

  const value = useMemo(
    () => ({ buildingText, stageId, focusCapability, setBuildingText, setStageId, setFocusCapability, goTo }),
    [buildingText, stageId, focusCapability, goTo],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useJourney() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useJourney must be used inside JourneyProvider");
  return v;
}
