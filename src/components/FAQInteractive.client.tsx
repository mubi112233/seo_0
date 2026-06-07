"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Zap, Loader2 } from "lucide-react";
import { getCopy } from "@/lib/copy";
import { fetchFAQ, type FAQItem } from "@/lib/api";

export function FAQInteractive({ lang }: { lang: string }) {
  const copy = getCopy(lang, "faq");
  const [openItem, setOpenItem] = useState<string>("");
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFAQ(lang)
      .then((data) => setFaqs(data?.faqs?.slice(0, 10) ?? []))
      .catch(() => setFaqs([]))
      .finally(() => setLoading(false));
  }, [lang]);

  if (loading) {
    return (
      <section id="faq" className="relative py-4 sm:py-6 md:py-8 lg:py-10 bg-background">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="faq"
      className="relative py-4 sm:py-6 md:py-8 lg:py-10 z-40 overflow-hidden bg-background text-foreground"
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.span
              className="inline-block px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-primary text-primary-foreground text-xs sm:text-sm font-bold rounded-full mb-3 sm:mb-4 shadow-lg"
              whileHover={{ scale: 1.05 }}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
            >
              Got Questions?
            </motion.span>

            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-foreground leading-tight">
              {copy.title || "Frequently Asked Questions"}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              {copy.description || "Everything you need to know about our services. Can't find the answer you're looking for? Reach out to our team."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <Accordion
              type="single"
              collapsible
              value={openItem}
              onValueChange={setOpenItem}
              className="space-y-3 sm:space-y-4"
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq._id || String(faq.order)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="bg-card border border-border rounded-lg sm:rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left text-base sm:text-lg md:text-xl font-semibold text-foreground hover:text-primary py-5 sm:py-6 hover:no-underline transition-colors [&[data-state=open]>span>span:first-child]:bg-primary [&[data-state=open]>span>span:first-child]:text-primary-foreground">
                      <span className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold mt-0.5 transition-colors">
                          {index + 1}
                        </span>
                        <span className="flex-1">{faq.question}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          <motion.div
            className="mt-10 sm:mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <div className="p-5 sm:p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent backdrop-blur-sm border-2 border-primary/20 rounded-xl sm:rounded-2xl group hover:border-primary/40 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 bg-primary/20 rounded-xl group-hover:bg-primary/30 transition-colors">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground mb-1.5">
                    {copy.qualityCardTitle}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{copy.qualityCardText}</p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent backdrop-blur-sm border-2 border-primary/20 rounded-xl sm:rounded-2xl group hover:border-primary/40 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 bg-primary/20 rounded-xl group-hover:bg-primary/30 transition-colors">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground mb-1.5">
                    {copy.toolsCardTitle}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{copy.toolsCardText}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mt-8 sm:mt-10 md:mt-12 p-6 sm:p-8 bg-card border-2 border-primary/20 rounded-xl sm:rounded-2xl text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          >
            <p className="text-sm sm:text-base md:text-lg font-semibold text-foreground pr-4">
              {copy.stillHaveQuestionsTitle}
            </p>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-5">
              {copy.stillHaveQuestionsText}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 hover:scale-105"
              >
                {copy.contactSupport}
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-primary/30 text-foreground font-semibold rounded-xl hover:border-primary hover:bg-primary/10 transition-all duration-300"
              >
                {copy.viewPricing}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


