import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = { title: "Privacy policy" };

export default function PrivacyPage() {
  return (
    <div className="bg-paper text-ink">
      <Header />
      <main id="main" className="min-h-screen px-6 pb-24 pt-36 md:px-12">
        <article className="mx-auto max-w-3xl">
        <p className="kicker text-volt">WHY Venture Studio</p>
        <h1 className="display mt-6 text-6xl md:text-8xl">Privacy policy</h1>
        <p className="mt-6 text-sm text-ink/70">Last updated: 9 October 2026</p>
        <div className="prose prose-lg mt-12 max-w-none prose-headings:font-semibold prose-p:text-ink/80">
          <p>We collect information you choose to share through our contact and application forms, such as your name, email address, company details and description of your work.</p>
          <h2>How we use information</h2>
          <p>We use submitted information to respond to enquiries, evaluate applications, provide studio support and improve this website. We do not sell personal information.</p>
          <h2>Sharing and retention</h2>
          <p>We may share information with service providers who help operate the website or communicate with you. We keep information only as long as reasonably required for these purposes or by law.</p>
          <h2>Your choices</h2>
          <p>To request access, correction or deletion of your information, contact us at 7780754541. This policy is a plain-language starting point and should be reviewed with qualified counsel for your specific operations.</p>
        </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
