"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { navItems } from "@/content/config";
import { cn } from "@/lib/cn";
import { useJourney } from "@/lib/store";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { goTo } = useJourney();
  const pathname = usePathname();
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const nav = (href: string) => {
    setOpen(false);
    goTo(href);
  };

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled ? "border-b border-ink/10 bg-paper/95 backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <div className="frame flex h-16 items-center justify-between gap-6">
        <a href={onHome ? "#top" : "/"} onClick={(e) => {
          if (onHome) {
            e.preventDefault();
            nav("#top");
          }
        }} className="group flex items-baseline gap-2" aria-label="WHY Venture Studio, back to top">
          <Image src="/why-logo.png" alt="WHY Venture Studio" width={92} height={66} className="h-9 w-24 object-contain object-left" priority />
          <span className="kicker hidden whitespace-nowrap text-ink/75 transition-opacity group-hover:text-ink sm:inline lg:hidden min-[1400px]:inline">Venture Studio</span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item, i) => (
              <li key={item.href}>
                <a
                  href={onHome ? item.href : `/${item.href}`}
                  onClick={(e) => {
                    if (onHome) {
                      e.preventDefault();
                      nav(item.href);
                    }
                  }}
                  className="kicker group relative flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-2 transition-colors hover:bg-ink hover:text-paper min-[1400px]:px-3"
                >
                  <span className="hidden opacity-40 group-hover:opacity-60 min-[1400px]:inline">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href="/partner" className="btn hidden whitespace-nowrap !bg-volt !text-paper !py-2.5 sm:inline-flex">
            Partner with us <ArrowUpRight size={14} aria-hidden />
          </a>
          <a href={onHome ? "#apply" : "/#apply"} onClick={(e) => {
            if (onHome) {
              e.preventDefault();
              nav("#apply");
            }
          }} className="btn-lime hidden whitespace-nowrap !py-2.5 sm:inline-flex">
            Start a conversation <ArrowUpRight size={14} aria-hidden />
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full bg-ink text-paper lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="on-ink fixed inset-0 top-16 z-40 flex flex-col justify-between bg-ink px-[var(--gutter)] pb-10 pt-8 text-paper lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav aria-label="Mobile">
              <ul className="space-y-1">
                {navItems.map((item, i) => (
                  <motion.li key={item.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.04 }}>
                    <a href={onHome ? item.href : `/${item.href}`} onClick={(e) => {
                      if (onHome) {
                        e.preventDefault();
                        nav(item.href);
                      }
                    }} className="display-narrow flex items-baseline gap-3 text-[13vw] leading-[0.95] sm:text-7xl">
                      <span className="kicker text-lime">{String(i + 1).padStart(2, "0")}</span>
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="grid gap-3">
              <a href="/partner" className="btn w-full !bg-volt !text-paper">Partner with us <ArrowUpRight size={14} aria-hidden /></a>
              <a href={onHome ? "#apply" : "/#apply"} onClick={(e) => {
                if (onHome) {
                  e.preventDefault();
                  nav("#apply");
                }
              }} className="btn-lime w-full">
                Start a conversation <ArrowUpRight size={14} aria-hidden />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
