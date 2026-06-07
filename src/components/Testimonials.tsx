"use client";

import { Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { fetchTestimonials } from "@/lib/api";
import { getCopy } from "@/lib/copy";
import { SPACING } from "@/lib/constants";
import { usePathname } from "next/navigation";

interface Testimonial {
  _id?: string;
  content: string;
  name: string;
  role: string;
  company: string;
  order?: number;
}

export const Testimonials = ({ initialTestimonials }: { initialTestimonials?: Testimonial[] }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials ?? []);
  const [loading, setLoading] = useState(!initialTestimonials);
  const [error, setError] = useState<string | null>(null);

  const pathname = usePathname();
  const currentLang = pathname.startsWith('/ge') || pathname.startsWith('/de') ? 'ge' : 'en';
  const copy = getCopy(currentLang, 'testimonials');

  useEffect(() => {
    if (initialTestimonials) return;
    const fetchTestimonialsData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchTestimonials(currentLang);
        if (!data) throw new Error('Failed to fetch testimonials');
        const fetched = Array.isArray(data.testimonials)
          ? [...data.testimonials].sort((a: any, b: any) => (a?.order ?? 0) - (b?.order ?? 0))
          : [];
        setTestimonials(fetched);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load testimonials');
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonialsData();
  }, [currentLang, initialTestimonials]);

  if (loading) {
    return (
      <motion.section id="testimonials" className={`relative ${SPACING.section} bg-background text-foreground z-40`} data-testid="testimonials-loading">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-4">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-gold" />
          </div>
        </div>
      </motion.section>
    );
  }

  if (error || testimonials.length === 0) {
    return (
      <motion.section id="testimonials" className="relative py-8 sm:py-10 md:py-12 lg:py-14 bg-background text-foreground z-40">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-4">
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">
              {error || (currentLang === 'ge'
                ? 'Keine Testimonials verfügbar.'
                : 'No testimonials available.')}
            </p>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      id="testimonials"
      className="relative py-4 sm:py-6 md:py-8 lg:py-10 bg-background text-foreground z-40"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
        <motion.div
          className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-16 text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-2"
            dangerouslySetInnerHTML={{ __html: copy.heading }}
            data-testid="testimonials-heading"
          />
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl px-2" data-testid="testimonials-subheading">
            {copy.subheading}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 max-w-6xl mx-auto mb-8 sm:mb-10 md:mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial._id || index}
              className="bg-card/50 backdrop-blur-sm border border-border rounded-lg sm:rounded-xl p-5 sm:p-6 md:p-8 hover:bg-card transition-all duration-300" data-testid="testimonial-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
            >
              <div className="flex gap-1 mb-3 sm:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-gold text-gold" />
                ))}
              </div>
              
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-5 md:mb-6 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              
              <div className="border-t border-border pt-3 sm:pt-4">
                <p className="text-sm sm:text-base font-bold text-foreground">{testimonial.name}</p>
                <p className="text-xs sm:text-sm text-gold">{testimonial.role}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="bg-card border border-gold/30 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 max-w-5xl mx-auto hover:border-gold/50 transition-all duration-300" data-testid="caseStudy-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <div className="text-left">
            <span className="inline-block px-3 py-1 bg-gold/10 text-gold text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">
              {copy.caseStudy?.badge}
            </span>
            <h3 
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4" data-testid="caseStudy-title"
              dangerouslySetInnerHTML={{ __html: copy.caseStudy?.title }}
            />
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-5 sm:mb-6 leading-relaxed max-w-3xl">
              {copy.caseStudy?.description}
            </p>
            <Button variant="gold" size="lg" className="w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4">
              {copy.caseStudy?.cta}
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
