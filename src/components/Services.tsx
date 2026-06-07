"use client";

import { Instagram, HeadphonesIcon, FolderKanban, TrendingUp, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import { fetchServices, Service } from "@/lib/api";
import { usePathname } from "next/navigation";

const iconMap: Record<string, any> = {
  Instagram,
  HeadphonesIcon,
  FolderKanban,
  TrendingUp,
};

const sectionCopy = {
  en: {
    badge: "Services",
    heading: "Our Services",
    description: "Comprehensive design solutions tailored to your business needs. From brand identity to digital experiences, we've got you covered.",
  },
  ge: {
    badge: "Dienstleistungen",
    heading: "Unsere Dienstleistungen",
    description: "Umfassende Design-Lösungen, die auf Ihre Geschäftsbedürfnisse zugeschnitten sind. Von der Markenidentität bis zu digitalen Erlebnissen.",
  },
};

export const Services = ({ initialServices }: { initialServices?: Service[] }) => {
  const [services, setServices] = useState<Service[]>(initialServices ?? []);
  const [loading, setLoading] = useState(!initialServices);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const currentLang = pathname.startsWith('/ge') || pathname.startsWith('/de') ? 'ge' : 'en';

  const copy = sectionCopy[currentLang as keyof typeof sectionCopy] || sectionCopy.en;

  useEffect(() => {
    if (initialServices) return;
    const fetchServicesData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchServices(currentLang);
        if (data && Array.isArray((data as any).services)) {
          const sortedServices = [...(data as any).services].sort((a: Service, b: Service) => a.order - b.order);
          setServices(sortedServices);
        } else {
          setServices([]);
        }
      } catch {
        setError("Failed to load services");
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchServicesData();
  }, [currentLang, initialServices]);

  if (loading) {
    return (
      <motion.section id="services" className="relative py-4 sm:py-6 md:py-8 lg:py-10 bg-background z-30 overflow-hidden" data-testid="services-loading">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-gold" />
          </div>
        </div>
      </motion.section>
    );
  }

  if (error || services.length === 0) {
    return (
      <motion.section id="services" className="relative py-4 sm:py-6 md:py-8 lg:py-10 bg-background z-30 overflow-hidden">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
          <div className="text-center py-20">
            <p className="text-muted-foreground">
              {error || (currentLang === "ge" ? "Keine Dienstleistungen verfügbar." : "No services available at the moment.")}
            </p>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      id="services"
      className="relative py-4 sm:py-6 md:py-8 lg:py-10 bg-background z-30 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
        <motion.div
          className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-16 relative z-10 text-left"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block px-2.5 sm:px-3 md:px-4 lg:px-5 py-1 sm:py-1.5 md:py-2 lg:py-2.5 bg-gold text-foreground text-xs sm:text-sm md:text-base font-semibold rounded-full mb-2 sm:mb-3 md:mb-4 shadow-lg" data-testid="services-badge">
            {copy.badge}
          </span>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-5 px-1 sm:px-2 text-foreground" data-testid="services-heading">
            {copy.heading}
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl leading-relaxed px-1 sm:px-2" data-testid="services-description">
            {copy.description}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 sm:gap-6 md:gap-7 lg:gap-8 max-w-6xl mx-auto relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || (LucideIcons as any)[service.icon] || Instagram;
            return (
              <motion.div
                key={service._id || service.order}
                className="relative bg-card border border-border p-5 sm:p-6 md:p-7 lg:p-9 xl:p-10 rounded-xl sm:rounded-2xl hover:border-gold/40 hover:shadow-[0_25px_80px_-20px_hsl(45_80%_55%/0.4)] transition-all duration-700 group overflow-hidden" data-testid="service-card"
                variants={{
                  hidden: { opacity: 0, y: 60, scale: 0.9 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] } },
                }}
                whileHover={{ y: -12, scale: 1.03, transition: { duration: 0.3 } }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start gap-4 sm:gap-5 md:gap-5 lg:gap-6 relative z-10">
                  <motion.div
                    className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl bg-gold text-foreground flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-[0_10px_30px_-10px_hsl(45_80%_55%/0.5)]"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                  >
                    <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 md:w-7 md:h-7 lg:w-8 lg:h-8" />
                  </motion.div>
                  <div className="flex-1 w-full">
                    <h3 className="text-xl sm:text-2xl md:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 md:mb-3 text-foreground group-hover:text-gold transition-colors duration-300" data-testid="service-title">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base md:text-sm lg:text-base text-muted-foreground mb-3 sm:mb-4 md:mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 md:px-3.5 md:py-1.5 lg:px-4 lg:py-2 bg-gold/10 border border-gold/30 rounded-full text-gold text-xs sm:text-sm md:text-xs lg:text-sm font-semibold group-hover:bg-gold group-hover:text-foreground group-hover:border-gold transition-all duration-500">
                      <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 mr-1.5 sm:mr-2 md:mr-1.5 lg:mr-2" />
                      <span className="leading-none">{service.benefit}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 md:w-16 md:h-16 lg:w-20 lg:h-20 border-t-2 border-r-2 border-gold/0 group-hover:border-gold/50 rounded-tr-xl sm:rounded-tr-2xl transition-all duration-700" />
                <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 md:w-16 md:h-16 lg:w-20 lg:h-20 border-b-2 border-l-2 border-gold/0 group-hover:border-gold/50 rounded-bl-xl sm:rounded-bl-2xl transition-all duration-700" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};


