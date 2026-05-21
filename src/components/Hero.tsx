"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import { ArrowRight, Calendar, Sparkles, Search, TrendingUp, Award, Loader2, CheckCircle } from "lucide-react";
import { fetchHero, HeroData } from "@/lib/api";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { siteConfig, localizedPath, type SiteLocale } from "@/lib/site-config";

export const Hero = ({ initialData }: { initialData?: HeroData | null }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  const [currentLang, setCurrentLang] = useState<string>("en");

  const getLangFromPath = () => {
    if (typeof window === "undefined") return "en";
    const match = window.location.pathname.match(/^\/(en|ge|de)\b/i);
    const raw = match?.[1]?.toLowerCase() || "en";
    return raw === "de" ? "ge" : raw;
  };

  useEffect(() => {
    setCurrentLang(getLangFromPath());
  }, []);

  const isGe = currentLang === "ge";

  // Fallback — no hardcoded stats, only text content
  const fallbackData = useMemo(() => isGe
    ? {
        title: "don-webdesign: Websites that Convert",
        subtitle: "Moderne Webdesign- und Entwicklungslösungen mit Fokus auf Geschwindigkeit, UX und Conversions. Von der Strategie bis zum Launch – alles individuell auf Ihre Marke zugeschnitten.",
        tagline: "Vertraut von 500+ Unternehmen weltweit",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=900&fit=crop&q=80",
        ctaPrimary: "Kostenlose Beratung buchen",
        urgency: "Kostenloses umfassendes SEO-Audit inklusive",
      }
    : {
        title: "don-webdesign: Websites that Convert",
        subtitle: "Modern web design and development focused on speed, UX, and conversions. From strategy to launch — all tailored to your brand.",
        tagline: "Trusted by 500+ Businesses Worldwide",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=900&fit=crop&q=80",
        ctaPrimary: "Book Free Consult",
        urgency: "Free comprehensive SEO audit included",
      }, [isGe]);

  const [heroData, setHeroData] = useState<HeroData | null>(initialData ?? null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true);
        const data = await fetchHero(currentLang);
        if (data) setHeroData(data);
      } catch {
        // keep existing data
      } finally {
        setLoading(false);
      }
    };

    if (currentLang) {
      fetchHeroData();
    }
  }, [currentLang, fallbackData]);

  const title = heroData?.title || fallbackData.title;
  const subtitle = heroData?.subtitle || fallbackData.subtitle;
  const rawTagline = heroData?.tagline || fallbackData.tagline;
  const tagline = isGe && rawTagline === "Trusted by 500+ Businesses Worldwide"
    ? "Vertraut von 500+ Unternehmen weltweit"
    : rawTagline;
  const rawImage = heroData?.image || fallbackData.image;
  const heroImage = rawImage?.startsWith('/') && !rawImage.startsWith('http')
    ? `${process.env.NEXT_PUBLIC_API_BASE || 'https://api.don-va.com'}${rawImage}`
    : rawImage;
  const ctaPrimary = heroData?.ctaPrimary || fallbackData.ctaPrimary;
  const urgency = heroData?.urgency || fallbackData.urgency;

  // Build stats array from flat API fields — only include items that have a value
  const statsItems = [
    { icon: Search,    value: heroData?.statsClients,      label: heroData?.statsClientsLabel },
    { icon: TrendingUp, value: heroData?.statsProjects,    label: heroData?.statsProjectsLabel },
    { icon: Award,     value: heroData?.statsRating,       label: heroData?.statsRatingLabel },
    { icon: CheckCircle, value: heroData?.statsSatisfaction, label: heroData?.statsSatisfactionLabel },
  ].filter(s => !!s.value);

  const hasStats = statsItems.length > 0;
  return (
    <motion.section
      ref={ref}
      className="relative min-h-screen flex items-center bg-background text-foreground overflow-hidden pt-16 sm:pt-20 md:pt-0"
      style={{ opacity }}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[2px] text-foreground/70 z-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" aria-hidden />
        </div>
      )}

      {/* Background - uses CSS variables for light/dark mode */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background/80 z-0"
        style={{ y }}
      />

      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 md:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 100
            }}
          >
            {/* Trust Badge - Gold Style like Frontend */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                type: "spring",
                stiffness: 120,
                damping: 20
              }}
              className="inline-block mb-3 sm:mb-4 md:mb-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[hsl(45,100%,50%)]/10 border border-[hsl(45,100%,50%)]/30 rounded-full text-[hsl(45,100%,50%)] text-xs sm:text-sm font-semibold hover:bg-[hsl(45,100%,50%)]/20 hover:scale-105 transition-all duration-300 cursor-default"
            >
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="bg-gradient-to-r from-[hsl(45,100%,50%)] via-[hsl(30,100%,45%)] to-[hsl(45,100%,50%)] bg-[length:200%_100%] bg-clip-text text-transparent"
              >
                {tagline}
              </motion.span>
            </motion.div>

            {/* Title with Gold Gradient like Frontend */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-5 md:mb-6 leading-[1.15] sm:leading-[1.12] md:leading-[1.1]">
              {title?.includes(':') ? (
                <>
                  <span className="text-foreground">{title.split(':')[0]}:</span>
                  <span className="bg-gradient-to-r from-[hsl(45,100%,50%)] to-[hsl(30,100%,45%)] bg-clip-text text-transparent">{title.split(':')[1]}</span>
                </>
              ) : (
                <span className="bg-gradient-to-r from-[hsl(45,100%,50%)] to-[hsl(30,100%,45%)] bg-clip-text text-transparent">{title}</span>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed max-w-xl">
              {subtitle}
            </p>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-3"
            >
              <Button
                size="lg"
                onClick={() => router.push(localizedPath((currentLang === "ge" ? "ge" : "en") as SiteLocale, siteConfig.routes.bookMeeting))}
                className="group relative w-full sm:w-auto text-sm sm:text-base md:text-lg px-8 sm:px-10 md:px-12 py-5 sm:py-6 md:py-7 h-auto font-bold bg-[hsl(45,100%,50%)] text-[hsl(30,85%,10%)] hover:bg-[hsl(45,100%,45%)] transform hover:scale-[1.06] hover:-translate-y-2 transition-all duration-400 cursor-pointer overflow-hidden rounded-xl border-2 border-transparent hover:border-[hsl(45,100%,50%)]/50 shadow-lg shadow-[hsl(45,100%,50%)]/30"
              >
                {/* Gold shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{
                    x: ["-150%", "150%"]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 1.5
                  }}
                  aria-hidden="true"
                />

                <span className="relative z-10 flex items-center justify-center gap-2.5">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                  <span className="font-semibold group-hover:tracking-wide transition-all duration-300">{ctaPrimary}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" aria-hidden="true" />
                </span>
              </Button>

              {/* Urgency indicator */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-white/70"
              >
                <CheckCircle className="w-4 h-4 text-[hsl(45,100%,55%)]" aria-hidden="true" />
                <span className="font-medium">{urgency}</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="relative lg:ml-auto mt-8 sm:mt-10 lg:mt-0"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
            style={{ perspective: 1200 }}
          >
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 z-20"
            >
              <motion.div
                animate={{
                  y: [-5, 5, -5],
                  rotate: [-2, 2, -2]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="bg-[hsl(45,100%,55%)] text-[#3D2817] px-3 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-lg border-2 border-[#5C3D2A] flex items-center gap-1.5 sm:gap-2"
              >
                <Award className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                <span className="text-[10px] sm:text-xs font-bold whitespace-nowrap">{isGe ? "Top Bewertet" : "Top Rated"}</span>
              </motion.div>
            </motion.div>

            {/* 3D tilt container */}
            <motion.div
              className="relative rounded-xl md:rounded-2xl overflow-hidden border-2 border-[hsl(45,100%,55%)]/30 group shadow-[0_30px_120px_-30px_hsl(45,100%,55%/0.45)]"
              whileHover={{ rotateX: -6, rotateY: 10 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Image */}
              <motion.div style={{ transform: "translateZ(20px)" }}>
                <Image
                  src={heroImage}
                  alt={isGe ? "SEO Analytics Dashboard" : "SEO Analytics Dashboard"}
                  width={1200}
                  height={900}
                  className="w-full h-auto object-cover"
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </motion.div>

              {/* Gold gradient veil */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[hsl(45,100%,55%/0.15)] via-transparent to-[hsl(45,100%,55%/0.15)]"
                style={{ transform: "translateZ(30px)" }}
              />

              {/* Concentric rings for depth */}
              <motion.div
                className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-gradient-to-br from-[hsl(45,100%,55%/0.25)] to-[hsl(30,100%,45%/0.25)] blur-3xl"
                style={{ transform: "translateZ(60px)" }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-gradient-to-tr from-[hsl(30,100%,45%/0.2)] to-[hsl(45,100%,55%/0.2)] blur-3xl"
                style={{ transform: "translateZ(40px)" }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Stats Card — only rendered when API returns stat values */}
              {hasStats && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 md:bottom-6 md:left-6 md:right-6 backdrop-blur-xl bg-gradient-to-br from-[#2A1B0E] via-[#3D2817] to-[#4A3320] border border-[hsl(45,100%,55%)]/50 rounded-xl p-4 sm:p-5 shadow-2xl"
                  style={{ transform: "translateZ(80px)" }}
                >
                  <div className={`grid gap-3 sm:gap-4 md:gap-6`} style={{ gridTemplateColumns: `repeat(${statsItems.length}, 1fr)` }}>
                    {statsItems.map(({ icon: Icon, value, label }, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        className={`text-center${i > 0 ? " border-l border-white/20" : ""}`}
                      >
                        <motion.div
                          animate={{ y: [-3, 3, -3] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                        >
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-[hsl(45,100%,55%)]" aria-hidden="true" />
                          <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white">{value}</div>
                          <div className="text-[9px] sm:text-[10px] md:text-xs text-white/70 font-medium">{label}</div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Animated decorative elements */}
            <motion.div
              className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-[hsl(45,100%,55%)]/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              aria-hidden="true"
            />
            <motion.div
              className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-[hsl(45,100%,55%)]/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              aria-hidden="true"
            />
            <motion.div
              className="absolute top-1/2 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-[hsl(45,100%,55%)]/20 rounded-full blur-2xl"
              animate={{
                x: [-10, 10, -10],
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};


