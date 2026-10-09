import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of service" };

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-paper px-6 py-24 text-ink md:px-12">
      <article className="mx-auto max-w-3xl">
        <p className="kicker text-volt">WHY Venture Studio</p>
        <h1 className="display mt-6 text-6xl md:text-8xl">Terms of service</h1>
        <p className="mt-6 text-sm text-ink/70">Last updated: 9 October 2026</p>
        <div className="prose prose-lg mt-12 max-w-none prose-headings:font-semibold prose-p:text-ink/80">
          <h2>Using this website</h2>
          <p>This website provides general information about WHY Venture Studio. You agree to use it lawfully, respectfully and without attempting to interfere with its operation or security.</p>
          <h2>Applications and introductions</h2>
          <p>Submitting an application does not create a funding, advisory, employment or partnership agreement. Any engagement is subject to a separate written agreement.</p>
          <h2>Content and availability</h2>
          <p>Content may be illustrative, change without notice and is not investment, legal, tax or financial advice. The website is provided on an availability basis to the extent permitted by applicable law.</p>
          <h2>Contact</h2>
          <p>Questions about these terms can be sent to 7780754541. Have qualified counsel adapt these terms before accepting applications or processing sensitive information at scale.</p>
        </div>
      </article>
    </main>
  );
}
