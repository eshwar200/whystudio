import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = { title: "Cookie notice" };

export default function CookiesPage() {
  return (
    <div className="bg-paper text-ink">
      <Header />
      <main id="main" className="min-h-screen px-6 pb-24 pt-36 md:px-12">
        <article className="mx-auto max-w-3xl">
        <p className="kicker text-volt">WHY Venture Studio</p>
        <h1 className="display mt-6 text-6xl md:text-8xl">Cookie notice</h1>
        <div className="prose prose-lg mt-12 max-w-none prose-p:text-ink/80">
          <p>This website may use essential browser storage required for navigation, form functionality and basic preferences. We do not intentionally use advertising cookies.</p>
          <p>Third-party media, such as stock images or embedded services, may process technical information under their own policies. Browser settings can be used to restrict cookies, although some features may stop working.</p>
        </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
