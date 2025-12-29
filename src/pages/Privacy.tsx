import { Footer } from "@/components/layout/Footer";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/40 py-6 sticky top-0 z-50 bg-card/80 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to Home
          </button>
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground mt-2">Last updated: December 27, 2025</p>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              EduMesh ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your information when you visit our
              website and use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">We may collect information about you in a
              variety of ways. The information we may collect on the Site includes:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Personal Data: Name, email address, phone number, educational institution</li>
              <li>Academic Information: Course details, grades, learning preferences</li>
              <li>Technical Data: IP address, browser type, device information</li>
              <li>Usage Data: Pages visited, time spent, interactions with features</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Use of Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Having accurate information about you permits
              us to provide you with a smooth, efficient, and customized experience. Specifically, we may use
              information collected about you via the Site to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Create and manage your account</li>
              <li>Deliver personalized learning recommendations</li>
              <li>Process transactions and send related information</li>
              <li>Improve our website and services</li>
              <li>Contact you regarding your account or service</li>
              <li>Generate analytics and understand user behavior</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Disclosure of Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">We may share information we have collected about you
              in certain situations:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>With service providers who assist in our operations</li>
              <li>With educational institutions for verification purposes</li>
              <li>If required by law or to protect our legal rights</li>
              <li>With your consent for specific purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Security of Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use administrative, technical, and physical security measures to protect your personal information.
              However, perfect security does not exist on the Internet. Your use of our Site is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. COPPA Compliance</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our Site, products, and services are all directed to people who are at least 13 years old or older.
              If this Server receives actual knowledge that it has collected Personal Data from children under 13
              years of age, appropriate steps will be taken to delete such information and terminate the child's account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">If you have questions or comments about this
              Privacy Policy, please contact us at:</p>
            <div className="bg-secondary/30 p-6 rounded-lg border border-border/40">
              <p className="text-foreground"><strong>EduMesh Privacy Team</strong></p>
              <p className="text-muted-foreground">Email: privacy@edumesh.com</p>
              <p className="text-muted-foreground">Address: MIT Institute, Pune, India</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
