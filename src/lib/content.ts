import { SHOW_PLACEHOLDER_SLOTS } from "@/content/config";
import type { Verifiable } from "@/content/types";

/**
 * Returns the records a section should render.
 * Verified records always render. Unverified records render as labelled slots
 * only while SHOW_PLACEHOLDER_SLOTS is on.
 */
export function visible<T extends Verifiable>(items: T[]): T[] {
  return SHOW_PLACEHOLDER_SLOTS ? items : items.filter((i) => i.verified);
}

export function hasContent<T extends Verifiable>(items: T[]): boolean {
  return visible(items).length > 0;
}

/** Indian digit grouping: 212283 → "2,12,283". */
export function formatIN(n: number): string {
  return new Intl.NumberFormat("en-IN").format(n);
}
