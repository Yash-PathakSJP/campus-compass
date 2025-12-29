import { useState } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
  Heart,
  ArrowRight,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
}

const footerSections = {
  product: {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Security", href: "#security" },
      { label: "Changelog", href: "#changelog" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Blog", href: "#blog" },
      { label: "Careers", href: "#careers" },
      { label: "Press", href: "#press" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#docs" },
      { label: "Help Center", href: "#help" },
      { label: "Community", href: "#community" },
      { label: "API Reference", href: "#api" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "#" },
      { label: "GDPR", href: "#" },
    ],
  },
};

const socialLinks = [
  {
    icon: Facebook,
    href: "https://facebook.com",
    label: "Facebook",
    color: "hover:text-blue-600",
  },
  {
    icon: Twitter,
    href: "https://twitter.com",
    label: "Twitter",
    color: "hover:text-blue-400",
  },
  {
    icon: Instagram,
    href: "https://instagram.com",
    label: "Instagram",
    color: "hover:text-pink-600",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com",
    label: "LinkedIn",
    color: "hover:text-blue-700",
  },
  {
    icon: Github,
    href: "https://github.com",
    label: "GitHub",
    color: "hover:text-gray-800 dark:hover:text-gray-200",
  },
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "support@edumesh.com",
    href: "mailto:support@edumesh.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 (555) 123-4567",
    href: "tel:+915551234567",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "MIT Institute, Pune, India",
    href: "#",
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-card border-t border-border/40 mt-20">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary/10 via-info/10 to-primary/10 border-b border-border/40">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Stay Updated with EduMesh
            </h3>
            <p className="text-muted-foreground mb-6">
              Get the latest learning tips, feature updates, and community news delivered to your inbox.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex gap-2 max-w-md mx-auto"
            >
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 whitespace-nowrap"
              >
                <span className="hidden sm:inline">Subscribe</span>
                <Send className="w-4 h-4" />
              </button>
            </form>

            {subscribed && (
              <p className="text-sm text-success mt-3 animate-slide-up">
                ✓ Thanks for subscribing! Check your email for confirmation.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-info flex items-center justify-center shadow-lg">
                <span className="text-lg font-black text-primary-foreground">E</span>
              </div>
              <span className="font-bold text-lg gradient-text">EduMesh</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Empowering students with AI-driven learning, peer collaboration, and structured knowledge sharing.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={cn(
                      "p-2 rounded-lg bg-secondary/50 text-muted-foreground transition-all hover:bg-primary/20",
                      social.color
                    )}
                    title={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key} className="lg:col-span-1 md:col-span-1">
              <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="border-t border-border/40 pt-12">
          <h4 className="font-semibold text-foreground mb-6 text-sm uppercase tracking-wider">
            Get in Touch
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {contactInfo.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="group p-4 rounded-lg bg-secondary/30 hover:bg-secondary/60 border border-border/30 hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <Icon className="w-5 h-5 text-primary mt-1 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                        {item.label}
                      </p>
                      <p className="text-sm text-foreground group-hover:text-primary transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-border/40 bg-secondary/20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} EduMesh. All rights reserved. Made with{" "}
              <Heart className="w-4 h-4 inline text-destructive animate-pulse" /> for learning.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Status
              </a>
              <span className="text-border/40">•</span>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Sitemap
              </a>
              <span className="text-border/40">•</span>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </a>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
              All systems operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
