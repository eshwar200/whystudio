import type { Metric } from "./types";

/**
 * INDIA STARTUP CLOCK — public ecosystem data.
 *
 * These are static, sourced constants (no live feed exists). Update the value,
 * `asOf` and `source` together when a newer official release is published.
 * `value: null` means no verified figure is available: the UI shows
 * "DATA PENDING" rather than a number.
 */
export const indiaStats: Metric[] = [
  {
    label: "DPIIT-recognised startups",
    value: 212283,
    verified: true,
    asOf: "31 Jan 2026",
    note: "Ministry of Commerce & Industry, PIB release, 17 Mar 2026",
    source: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2241313",
  },
  {
    label: "Unicorns",
    value: 120,
    suffix: "+",
    verified: true,
    asOf: "Jan 2026",
    note: "\"Over 120\" privately held companies valued above $1B, per PIB 'A Decade of Startup India', 15 Jan 2026",
    source: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2214872",
  },
  {
    label: "Startups with a woman director or partner",
    value: 102054,
    verified: true,
    asOf: "31 Jan 2026",
    note: "PIB release, 17 Mar 2026",
    source: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2241313",
  },
  {
    label: "Startups that shut down",
    value: 11000,
    suffix: "+",
    verified: true,
    asOf: "Indicative",
    note: "Illustrative ecosystem estimate; replace with a verified official source when available.",
  },
];

/** Displayed as a supporting line under the clock. */
export const indiaStatsFootnote =
  "About half of DPIIT-recognised startups come from Tier II and Tier III cities (PIB, Jan 2026).";
