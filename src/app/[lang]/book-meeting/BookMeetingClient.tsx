"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  Star,
  Shield,
  Sparkles,
  Users,
  ArrowRight,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";

const copy = {
  en: {
    badge: "Free Consultation",
    title: "Book Your Free Strategy Call",
    subtitle: "Schedule a 15-minute call and discover how we can transform your online presence with premium web design.",
    whatTitle: "What to Expect",
    items: [
      { icon: Clock, title: "15-Minute Session", desc: "Quick, focused discussion about your needs" },
      { icon: Video, title: "Virtual Meeting", desc: "Join via Google Meet or Zoom" },
      { icon: CheckCircle2, title: "No Commitment", desc: "Free consultation with zero obligations" },
    ],
    discussTitle: "We'll Discuss",
    discuss: [
      "Your current website & design challenges",
      "How great design can elevate your brand",
      "Custom solutions tailored to your business",
      "Pricing & timeline options",
      "Next steps to get started",
    ],
    stats: [
      { value: "50+", label: "Clients" },
      { value: "250+", label: "Projects" },
      { value: "4.9/5", label: "Rating" },
    ],
    testimonials: [
      { name: "Sarah Johnson", role: "CEO, TechStart Inc", text: "don-webdesign transformed our website completely. The design work elevated our online presence.", rating: 5 },
      { name: "Michael Chen", role: "Founder, Digital Growth", text: "Best decision we made. Our brand visibility has grown significantly within weeks.", rating: 5 },
      { name: "Emma Davis", role: "Director, MarketPro", text: "Creative, professional, and detail-oriented. Couldn't ask for more from a design partner.", rating: 5 },
    ],
    testimonialsTitle: "What Our Clients Say",
    testimonialsSubtitle: "See why brands trust don-webdesign",
    secure: "100% Secure & Confidential",
  },
  de: {
    badge: "Kostenlose Beratung",
    title: "Kostenloses Strategiegespräch buchen",
    subtitle: "Vereinbaren Sie einen 15-minütigen Anruf und erfahren Sie, wie wir Ihre Online-Präsenz mit Premium-Webdesign transformieren können.",
    whatTitle: "Was Sie erwartet",
    items: [
      { icon: Clock, title: "15-Minuten-Session", desc: "Kurzes, fokussiertes Gespräch über Ihre Bedürfnisse" },
      { icon: Video, title: "Virtuelles Meeting", desc: "Per Google Meet oder Zoom" },
      { icon: CheckCircle2, title: "Keine Verpflichtung", desc: "Kostenlose Beratung ohne Verbindlichkeiten" },
    ],
    discussTitle: "Wir besprechen",
    discuss: [
      "Ihre aktuelle Website & Design-Herausforderungen",
      "Wie gutes Design Ihre Marke stärkt",
      "Individuelle Lösungen für Ihr Unternehmen",
      "Preis- & Zeitplanoptionen",
      "Nächste Schritte zum Start",
    ],
    stats: [
      { value: "50+", label: "Kunden" },
      { value: "250+", label: "Projekte" },
      { value: "4.9/5", label: "Bewertung" },
    ],
    testimonials: [
      { name: "Sarah Johnson", role: "CEO, TechStart Inc", text: "don-webdesign hat unsere Website komplett transformiert. Die Designarbeit hat unsere Online-Präsenz aufgewertet.", rating: 5 },
      { name: "Michael Chen", role: "Gründer, Digital Growth", text: "Beste Entscheidung, die wir getroffen haben. Unsere Markensichtbarkeit ist innerhalb von Wochen deutlich gestiegen.", rating: 5 },
      { name: "Emma Davis", role: "Direktorin, MarketPro", text: "Kreativ, professionell und detailorientiert. Mehr kann man von einem Designpartner nicht verlangen.", rating: 5 },
    ],
    testimonialsTitle: "Was unsere Kunden sagen",
    testimonialsSubtitle: "Erfahren Sie, warum Marken don-webdesign vertrauen",
    secure: "100% Sicher & Vertraulich",
  },
};

export default function BookMeetingClient() {
  const pathname = usePathname();
  const lang = pathname.startsWith("/ge") || pathname.startsWith("/de") ? "de" : "en";
  const c = copy[lang];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background relative overflow-hidden">
      {/* Background blobs — matches Hero/Contact gold glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[hsl(45,100%,50%)]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[hsl(45,100%,50%)]/4 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[hsl(45,100%,50%)]/[0.02] rounded-full blur-[200px] pointer-events-none" />

      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pt-28 pb-20">

        {/* Page Header */}
        <motion.div
          className="text-left mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[hsl(45,100%,50%)]/10 border border-[hsl(45,100%,50%)]/20 text-[hsl(45,100%,40%)] dark:text-[hsl(45,100%,60%)] text-xs font-semibold rounded-full mb-4 tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            {c.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            {c.title}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {c.subtitle}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">

          {/* Left — Info Panel */}
          <motion.div
            className="lg:col-span-2 lg:sticky lg:top-28 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {c.stats.map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  className="text-center p-4 bg-card border border-border/50 rounded-xl hover:border-[hsl(45,100%,50%)]/40 hover:shadow-lg transition-all duration-300 group cursor-default"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
                >
                  <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-[hsl(45,100%,50%)]/10 border border-[hsl(45,100%,50%)]/20 flex items-center justify-center group-hover:bg-[hsl(45,100%,50%)]/20 transition-colors">
                    <Users className="w-4 h-4 text-[hsl(45,100%,50%)]" />
                  </div>
                  <div className="text-xl font-bold text-foreground group-hover:text-[hsl(45,100%,40%)] dark:group-hover:text-[hsl(45,100%,60%)] transition-colors">{value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
                </motion.div>
              ))}
            </div>

            {/* What to Expect */}
            <div className="p-5 sm:p-6 bg-card border border-border/50 rounded-xl space-y-4 hover:border-[hsl(45,100%,50%)]/20 transition-colors duration-300">
              <h3 className="font-bold text-foreground text-base flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[hsl(45,100%,50%)]" />
                {c.whatTitle}
              </h3>
              <div className="space-y-4">
                {c.items.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[hsl(45,100%,50%)]/10 border border-[hsl(45,100%,50%)]/20 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[hsl(45,100%,50%)]" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-foreground">{title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* We'll Discuss */}
            <div className="p-5 sm:p-6 bg-[hsl(45,100%,50%)]/5 border border-[hsl(45,100%,50%)]/20 rounded-xl space-y-3">
              <h3 className="font-bold text-foreground text-base">{c.discussTitle}</h3>
              <ul className="space-y-2.5">
                {c.discuss.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[hsl(45,100%,50%)]/10 border border-[hsl(45,100%,50%)]/20 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-[hsl(45,100%,50%)]" />
                    </div>
                    <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Security note */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground p-3 bg-muted/30 rounded-lg">
              <Shield className="w-4 h-4 text-[hsl(45,100%,50%)] flex-shrink-0" />
              <span>{c.secure}</span>
            </div>
          </motion.div>

          {/* Right — Calendly Embed */}
          <motion.div
            className="lg:col-span-3 order-first lg:order-last"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="lg:sticky lg:top-28">
              {/* Embed card — gold border accent matching Hero image card */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-[hsl(45,100%,50%)]/30 shadow-[0_30px_80px_-20px_hsl(45,100%,50%/0.2)] bg-card">
                {/* Top shimmer bar */}
                <div className="h-1 w-full bg-gradient-to-r from-[hsl(45,100%,50%)] via-[hsl(30,100%,45%)] to-[hsl(45,100%,50%)]" />
                <div className="p-2">
                  <iframe
                    src="https://calendly.com/d/cyhx-wdw-b57?embed_domain=don-webdesign.com&embed_type=Inline"
                    className="rounded-xl w-full"
                    style={{ minWidth: "100%", height: "620px", border: "none" }}
                    title="Book a meeting"
                  />
                </div>
              </div>
              <div className="mt-4 p-4 bg-[hsl(45,100%,50%)]/5 border border-[hsl(45,100%,50%)]/20 rounded-xl text-center">
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4 text-[hsl(45,100%,50%)]" />
                  <span className="font-semibold text-foreground">{c.secure}</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Testimonials */}
        <motion.div
          className="mt-20 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="text-left mb-10">
            <span className="inline-block px-4 py-2 bg-[hsl(45,100%,50%)] text-[hsl(30,85%,10%)] text-sm font-bold rounded-full mb-4 shadow-md">
              {c.testimonialsTitle}
            </span>
            <p className="text-muted-foreground">{c.testimonialsSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.testimonials.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
                className="bg-card border border-border/50 rounded-xl p-6 hover:border-[hsl(45,100%,50%)]/40 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[hsl(45,100%,50%)] fill-[hsl(45,100%,50%)]" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(45,100%,50%)]/40 to-[hsl(45,100%,50%)]/10 border border-[hsl(45,100%,50%)]/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-[hsl(45,100%,40%)] dark:text-[hsl(45,100%,60%)] font-bold text-xs">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[hsl(45,100%,50%)]/50 ml-auto" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
