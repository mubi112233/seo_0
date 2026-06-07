/**
 * Next-safe copy/translation constants (no react-i18next runtime)
 * Mirrors frontend/src/lib/client-i18n.ts for badge/heading/subheading text.
 * Use URL-based language detection (en/ge) to select strings.
 */

export const copy = {
  en: {
    // How It Works
    howItWorks: {
      badge: "How It Works",
      heading: "Get started in <span class=\"text-gold\">4 simple steps</span>",
      description: "From audit to measurable rankings — our process is designed to deliver SEO results fast.",
      steps: {
        step1: {
          step: "Step 1",
          title: "Initial Consultation",
          description: "We analyze your website and competitors to create a customized SEO strategy."
        },
        step2: {
          step: "Step 2",
          title: "SEO Strategy & Planning",
          description: "We develop a tailored SEO roadmap with technical fixes, content, and link building."
        },
        step3: {
          step: "Step 3",
          title: "Implementation & Optimization",
          description: "We execute the SEO plan with technical improvements, content optimization, and link acquisition."
        },
        step4: {
          step: "Step 4",
          title: "Monitoring & Growth",
          description: "Continuous tracking, reporting, and optimization to improve rankings and organic traffic."
        }
      }
    },

    // Why Choose Us (fallback, API may provide its own)
    whyChooseUs: {
      badge: "Why Choose Us",
      heading: "What makes us <span class=\"text-gold\">different</span>",
      description: "Data-driven strategies, technical excellence, transparent reporting, and measurable ROI.",
    },

    // Testimonials
    testimonials: {
      heading: "Trusted by <span class=\"text-gold\">Growing Businesses</span>",
      subheading: "Real results from real companies growing with DON SEO.",
      caseStudy: {
        badge: "Success Story",
        title: "Case Study: <span class=\"text-gold\">70% Cost Reduction</span>",
        description: "See how a mid-sized e-commerce company increased organic traffic by 340% and reduced their cost per acquisition by 60%.",
        cta: "View Full Case Study",
      },
    },

    // Blog
    blog: {
      badge: "Insights",
      heading: "Latest <span class=\"text-gold\">Insights</span>",
      description: "Practical guides and strategies for improving your search rankings and organic traffic.",
      by: "By",
      readMore: "Read more",
      read: "Read",
    },

    // Case Studies
    caseStudies: {
      badge: "Success Stories",
      heading: "Real <span class=\"text-gold\">Success Stories</span>",
      description: "Proven results from companies growing their organic presence with DON SEO.",
      labels: {
        saved: "Saved",
        teamSize: "Team Size",
        timeline: "Timeline",
        viewFull: "View Full Case Study",
        viewStudy: "View Study",
      },
    },

    // FAQ
    faq: {
      badge: "FAQ",
      title: "Frequently Asked Questions",
      description: "Answers to the most common questions about our service, quality control, and security.",
      qualityCardTitle: "Native Quality Control",
      qualityCardText: "Dedicated supervisors review outputs and coach continuously to maintain standards.",
      toolsCardTitle: "Works with Your Tools",
      toolsCardText: "We plug into your existing workflows and platforms without disrupting your operations.",
      stillHaveQuestionsTitle: "Still have questions?",
      stillHaveQuestionsText: "We're here to help you choose the right setup for your needs.",
      contactSupport: "Contact Support",
      viewPricing: "View Pricing",
    },

    // Pricing
    pricing: {
      sectionBadge: "Pricing",
      sectionTitle: "Simple, transparent pricing",
      sectionDescription: "Choose a plan that fits your needs. Scale up or down anytime.",
      vaCountLabel: "Select your SEO plan",
      vaCountHelper: "Choose the right SEO package for your business",
      startingFrom: "Starting from €{price}/mo · ~€{hourly}/hr",
      bulkDiscount: "{percent}% bulk discount applied!",
      bulkSavings: "You save €{amount} total",
      bulkHint: "Add {count} more plan{suffix} to unlock {percent}% bulk discount",
      bannerBadge: "Limited Time",
      bannerTitle: "Book a Free Meeting",
      bannerSubtitle: "Schedule your free consultation and get started today",
      bannerPoints: {
        noCommitment: "No commitment",
        cancelAnytime: "Cancel anytime",
        fullAccess: "Full access"
      },
      plans: {
        starter: {
          name: "Starter",
          hours: "10h / week",
          features: [
            "Dedicated SEO Specialist",
            "Native Quality Control",
            "24h Replacement Guarantee",
            "Slack/Email Support",
            "14 Days Money-Back Warranty"
          ]
        },
        professional: {
          name: "Professional",
          hours: "20h / week",
          features: [
            "Everything in Starter",
            "No Setup Fee",
            "Priority Support",
            "Bi-weekly Progress Reports",
            "Flexible Hour Rollover"
          ]
        },
        enterprise: {
          name: "Enterprise",
          hours: "40h / week",
          badge: "Best Value",
          features: [
            "Everything in Professional",
            "No Setup Fee",
            "Dedicated Account Manager",
            "Weekly Strategy Calls",
            "Custom Workflow Integration"
          ]
        }
      },
      button: "Get Started",
      perMonth: "/mo",
      hoursUnit: "hours",
      planSetupFee: "+€{fee} setup fee",
      planNoSetupFee: "No setup fee",
      disclaimer: "All prices are per plan. Bulk discounts apply automatically. Setup fees are one-time charges."
    },

    // Final CTA
    finalCTA: {
      badge: "Ready to Scale?",
      title: "Start with <span class=\"text-gold\">DON SEO</span> Today",
      description: "Book a free consultation and see how we can improve your rankings in 30 days.",
    },

    // Value Proposition (if used)
    valueProposition: {
      heading: "Why <span class=\"text-gold\">Choose Us</span>",
    },
  },

  ge: {
    // How It Works
    howItWorks: {
      badge: "Wie es funktioniert",
      heading: "Starten Sie in <span class=\"text-gold\">4 einfachen Schritten</span>",
      description: "Vom Audit bis zu messbaren Rankings – unser Prozess liefert schnelle SEO-Ergebnisse.",
      steps: {
        step1: {
          step: "Schritt 1",
          title: "Erstberatung",
          description: "Wir analysieren Ihre Website und Konkurrenz, um eine maßgeschneiderte SEO-Strategie zu entwickeln."
        },
        step2: {
          step: "Schritt 2",
          title: "SEO-Strategie & Planung",
          description: "Wir entwickeln eine maßgeschneiderte SEO-Roadmap mit technischen Fixes, Content und Link-Building."
        },
        step3: {
          step: "Schritt 3",
          title: "Implementierung & Optimierung",
          description: "Wir führen den SEO-Plan mit technischen Verbesserungen, Content-Optimierung und Link-Aufbau aus."
        },
        step4: {
          step: "Schritt 4",
          title: "Monitoring & Wachstum",
          description: "Kontinuierliches Tracking, Reporting und Optimierung zur Verbesserung der Rankings und organischen Sichtbarkeit."
        }
      }
    },

    // Why Choose Us (fallback, API may provide its own)
    whyChooseUs: {
      badge: "Warum wir",
      heading: "Was uns <span class=\"text-gold\">auszeichnet</span>",
      description: "Datengesteuerte Strategien, technische Exzellenz, transparentes Reporting und messbarer ROI.",
    },

    // Testimonials
    testimonials: {
      heading: "Vertrauen von <span class=\"text-gold\">wachsenden Unternehmen</span>",
      subheading: "Echte Ergebnisse von Unternehmen, die mit DON SEO wachsen.",
      caseStudy: {
        badge: "Erfolgsgeschichte",
        title: "Fallstudie: <span class=\"text-gold\">70% Kostensenkung</span>",
        description: "Erfahren Sie, wie ein mittelständisches E-Commerce-Unternehmen den organischen Traffic um 340% steigerte und die Akquisitionskosten um 60% senkte.",
        cta: "Vollständige Fallstudie ansehen",
      },
    },

    // Blog
    blog: {
      badge: "Einblicke",
      heading: "Aktuelle <span class=\"text-gold\">Einblicke</span>",
      description: "Praktische Leitfäden und Strategien zur Verbesserung Ihrer Suchrankings und organischen Sichtbarkeit.",
      by: "Von",
      readMore: "Weiterlesen",
      read: "Lesen",
    },

    // Case Studies
    caseStudies: {
      badge: "Erfolgsgeschichten",
      heading: "Echte <span class=\"text-gold\">Erfolgsgeschichten</span>",
      description: "Bewährte Ergebnisse von Unternehmen, die ihre organische Präsenz mit DON SEO ausbauen.",
      labels: {
        saved: "Gespart",
        teamSize: "Teamgröße",
        timeline: "Zeitrahmen",
        viewFull: "Vollständige Fallstudie ansehen",
        viewStudy: "Studie ansehen",
      },
    },

    // FAQ
    faq: {
      badge: "FAQ",
      title: "Häufig gestellte Fragen",
      description: "Antworten auf die häufigsten Fragen zu unserem Service, Qualitätskontrolle und Sicherheit.",
      qualityCardTitle: "Native Qualitätskontrolle",
      qualityCardText: "Dedizierte Supervisoren prüfen Ergebnisse und coachen kontinuierlich, um Standards zu halten.",
      toolsCardTitle: "Funktioniert mit Ihren Tools",
      toolsCardText: "Wir integrieren uns in Ihre bestehenden Workflows und Plattformen ohne Unterbrechung.",
      stillHaveQuestionsTitle: "Noch Fragen?",
      stillHaveQuestionsText: "Wir helfen Ihnen gern, das passende Setup zu wählen.",
      contactSupport: "Support kontaktieren",
      viewPricing: "Preise ansehen",
    },

    // Pricing
    pricing: {
      sectionBadge: "Pricing",
      sectionTitle: "Simple, Transparent Pricing",
      sectionDescription: "Choose the perfect plan for your business. Scale up or down anytime.",
      vaCountLabel: "Wählen Sie Ihr SEO-Paket",
      vaCountHelper: "Wählen Sie das richtige SEO-Paket für Ihr Unternehmen",
      startingFrom: "Starting from €{price}/hour",
      bulkDiscount: "{percent}% discount - {suffix} more!",
      bulkSavings: "Save €{amount} total",
      bulkHint: "Add {count} more {suffix} to get {percent}% discount",
      bannerBadge: "Limited Time",
      bannerTitle: "Book a Meeting",
      bannerSubtitle: "Schedule your free consultation and get started today",
      bannerPoints: {
        noCommitment: "No commitment",
        cancelAnytime: "Cancel anytime",
        fullAccess: "Full access"
      },
      plans: {
        starter: {
          name: "Starter",
          hours: "10h / week",
          features: [
            "Dedicated SEO Specialist",
            "Native Quality Control",
            "24h Replacement Guarantee",
            "Slack/Email Support",
            "14 Days Money-Back Warranty"
          ]
        },
        professional: {
          name: "Professional",
          hours: "20h / week",
          features: [
            "Everything in Starter",
            "No Setup Fee",
            "Priority Support",
            "Bi-weekly Progress Reports",
            "Flexible Hour Rollover"
          ]
        },
        enterprise: {
          name: "Enterprise",
          hours: "40h / week",
          badge: "Best Value",
          features: [
            "Everything in Professional",
            "No Setup Fee",
            "Dedicated Account Manager",
            "Weekly Strategy Calls",
            "Custom Workflow Integration"
          ]
        }
      },
      button: "Get Started",
      perMonth: "/mo",
      hoursUnit: "hours",
      planSetupFee: "+€{fee} setup fee",
      planNoSetupFee: "No setup fee",
      disclaimer: "All prices are per plan. Bulk discounts apply automatically. Setup fees are one-time charges."
    },

    // Final CTA
    finalCTA: {
      badge: "Bereit zu skalieren?",
      title: "Starten Sie noch heute mit <span class=\"text-gold\">DON SEO</span>",
      description: "Buchen Sie eine kostenlose Beratung und erleben Sie, wie wir Ihre Rankings in 30 Tagen verbessern können."
    },

    // Value Proposition (if used)
    valueProposition: {
      heading: "Warum <span class=\"text-gold\">wir</span>?",
    },
  },
} as const;

/**
 * Helper to get copy for a language (en/ge)
 */
export const getCopy = <K extends keyof typeof copy.en>(lang: string, key: K) => {
  const normalizedLang = lang.toLowerCase().startsWith('ge') || lang.toLowerCase().startsWith('de') ? 'ge' : 'en';
  return copy[normalizedLang as 'en' | 'ge'][key];
};
