"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig, normalizeLocale, localizedPath, localeUrlPrefix } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const siteLocale = normalizeLocale(pathname);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (!hash) return;
    const tryScroll = (attempts = 0) => {
      const el = document.getElementById(hash.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (attempts < 10) {
        setTimeout(() => tryScroll(attempts + 1), 100);
      }
    };
    tryScroll();
  }, [pathname]);

  const getCurrentLang = () => {
    const match = pathname.match(/^\/(en|de|ge)\b/i);
    const raw = match?.[1]?.toLowerCase() || "en";
    return raw === "ge" ? "de" : raw;
  };
  const currentLang = getCurrentLang();

  const navItems = [
    { name: currentLang === "de" ? "Dienstleistungen" : "Services", href: "#services" },
    { name: currentLang === "de" ? "So funktioniert es" : "How It Works", href: "#how-it-works" },
    { name: currentLang === "de" ? "Preise" : "Pricing", href: "#pricing" },
    { name: currentLang === "de" ? "Kundenstimmen" : "Testimonials", href: "#testimonials" },
    { name: currentLang === "de" ? "Häufige Fragen" : "FAQ", href: "#faq" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };

  const switchLanguage = (lang: "en" | "de") => {
    const targetSeg = lang === "de" ? "de" : "en";
    const hasLangPrefix = /^\/(en|de|ge)(\/|$)/i.test(pathname);
    const finalPath = hasLangPrefix
      ? pathname.replace(/^\/(en|de|ge)(?=\/|$)/i, `/${targetSeg}`)
      : pathname === "/"
        ? `/${targetSeg}`
        : `/${targetSeg}${pathname}`;

    router.push(finalPath);
  };

  const isHomePage =
    pathname === "/en" || pathname === "/ge" || pathname === "/de" || pathname === "/";

  const handleNavClick = (hash: string) => {
    const id = hash.replace("#", "");
    if (isHomePage) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      router.push(`${currentLang === "de" ? "/de" : "/en"}${hash}`);
    }
    setIsOpen(false);
  };

  const ThemeIcon = () => {
    if (!mounted) return <div className="w-5 h-5" />;
    const current = theme === "system" || !theme ? "light" : theme;
    return current === "light" ? (
      <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
    ) : (
      <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
    );
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-xl shadow-lg border-b border-border/50"
          : "bg-background"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-6 lg:px-10 xl:px-12">
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-[72px] lg:h-20">
          <button
            type="button"
            onClick={() => router.push(`/${localeUrlPrefix(siteLocale)}`)}
            className="flex items-center space-x-2 sm:space-x-3 hover:bg-white/10 rounded-lg px-2 py-1 transition-all duration-300"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-9 md:h-9 lg:w-10 lg:h-10 bg-primary rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110">
              <span className="text-primary-foreground font-bold text-base sm:text-lg md:text-lg lg:text-xl">
                {siteConfig.brandMarkText}
              </span>
            </div>
            <span className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-foreground hover:text-primary transition-colors duration-300 whitespace-nowrap">
              {siteConfig.brandName}
            </span>
          </button>

          <div className="hidden md:flex items-center space-x-1 lg:space-x-2 xl:space-x-4">
            {navItems.map((item) => (
              <button
                type="button"
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="relative text-foreground/90 hover:text-foreground transition-colors duration-300 font-medium text-sm lg:text-base px-2 lg:px-3 py-2 rounded-lg hover:bg-accent group whitespace-nowrap"
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-4/5 transition-all duration-300" />
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => switchLanguage(currentLang === "en" ? "de" : "en")}
              className="px-2 py-1 text-xs md:text-xs lg:text-sm text-foreground/90 hover:bg-accent hover:text-foreground transition-colors duration-300"
              aria-label="Change language"
            >
              {currentLang.toUpperCase()}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="relative text-foreground/90 hover:bg-accent hover:text-foreground w-9 h-9 transition-all duration-300"
              aria-label="Toggle theme"
            >
              <ThemeIcon />
            </Button>

            <Link
              href={localizedPath(siteLocale, siteConfig.routes.contact)}
              className="text-sm px-3 lg:px-4 py-2 border border-primary/50 rounded-full hover:bg-primary/10 hover:border-primary transition-all duration-300 font-semibold whitespace-nowrap text-foreground"
            >
              {currentLang === "de" ? "Kontakt" : "Contact"}
            </Link>

            <Link
              href={localizedPath(siteLocale, siteConfig.routes.bookMeeting)}
              className="text-sm px-3 lg:px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/30 font-semibold whitespace-nowrap"
            >
              {currentLang === "de" ? "Starten" : "Get Started"}
            </Link>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => switchLanguage(currentLang === "en" ? "de" : "en")}
                className="text-foreground/90 hover:bg-accent hover:text-foreground w-9 h-9 transition-all duration-300"
                aria-label="Change language"
              >
                <span className="text-sm font-medium">{currentLang.toUpperCase()}</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-foreground/90 hover:bg-accent hover:text-foreground w-9 h-9 transition-all duration-300"
                aria-label="Toggle theme"
              >
                <ThemeIcon />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground/90 hover:bg-accent hover:text-foreground w-9 h-9 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-background/98 backdrop-blur-xl border-t border-border/50 shadow-lg"
            >
              <div className="py-3 space-y-1">
                {navItems.map((item) => (
                  <button
                    type="button"
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className="block w-full text-left text-muted-foreground hover:text-foreground hover:bg-accent active:bg-accent/80 transition-all duration-200 font-medium py-3 px-4 rounded-lg mx-2"
                  >
                    {item.name}
                  </button>
                ))}
                <div className="pt-3 px-3 border-t border-border/50">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        router.push(currentLang === "de" ? "/de/contact" : "/en/contact");
                        setIsOpen(false);
                      }}
                      className="w-full text-center text-base py-3 border border-primary/50 text-foreground rounded-lg font-semibold hover:bg-primary/10 hover:border-primary transition-all duration-300"
                    >
                      {currentLang === "de" ? "Kontakt" : "Contact"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        router.push(currentLang === "de" ? "/de/book-meeting" : "/en/book-meeting");
                        setIsOpen(false);
                      }}
                      className="w-full text-center text-base py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                    >
                      {currentLang === "de" ? "Jetzt starten" : "Get Started"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};


