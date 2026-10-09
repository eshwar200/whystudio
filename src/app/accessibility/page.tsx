import type { Metadata } from "next";

export const metadata: Metadata = { title: "Accessibility" };

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-paper px-6 py-24 text-ink md:px-12">
      <article className="mx-auto max-w-3xl">
        <p className="kicker text-volt">WHY Venture Studio</p>
        <h1 className="display mt-6 text-6xl md:text-8xl">Accessibility</h1>
        <div className="prose prose-lg mt-12 max-w-none prose-p:text-ink/80">
          <p>We aim to make this website usable with keyboards, screen readers, reduced-motion preferences and different screen sizes. Images include alternative text, controls have labels and the hero video includes native playback controls.</p>
          <p>If you encounter an accessibility barrier, contact us at 7780754541 with the page and issue so we can investigate.</p>
        </div>
      </article>
    </main>
  );
}
