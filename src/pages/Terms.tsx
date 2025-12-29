import { Footer } from "@/components/layout/Footer";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Terms() {
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
          <h1 className="text-3xl font-bold">Terms of Service</h1>
          <p className="text-muted-foreground mt-2">Last updated: December 27, 2025</p>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using EduMesh, you accept and agree to be bound by the terms and provision of this
              agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Permission is granted to temporarily download one
              copy of the materials (information or software) on EduMesh for personal, non-commercial transitory
              viewing only. This is the grant of a license, not a transfer of title, and under this license you may
              not:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on EduMesh</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              <li>Violate any applicable laws or regulations in your use</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              The materials on EduMesh are provided on an 'as is' basis. EduMesh makes no warranties, expressed or
              implied, and hereby disclaims and negates all other warranties including, without limitation, implied
              warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
              intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Limitations</h2>
            <p className="text-muted-foreground leading-relaxed">
              In no event shall EduMesh or its suppliers be liable for any damages (including, without limitation,
              damages for loss of data or profit, or due to business interruption) arising out of the use or
              inability to use the materials on EduMesh, even if EduMesh or an authorized representative has been
              notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Accuracy of Materials</h2>
            <p className="text-muted-foreground leading-relaxed">
              The materials appearing on EduMesh could include technical, typographical, or photographic errors.
              EduMesh does not warrant that any of the materials on its website are accurate, complete, or current.
              EduMesh may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              EduMesh has not reviewed all of the sites linked to its website and is not responsible for the contents
              of any such linked site. The inclusion of any link does not imply endorsement by EduMesh of the site.
              Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Modifications</h2>
            <p className="text-muted-foreground leading-relaxed">
              EduMesh may revise these Terms and Conditions for its website at any time without notice. By using this
              website, you are agreeing to be bound by the then current version of these Terms and Conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms and Conditions and any separate agreements we may have with you relating to EduMesh are
              governed by and construed in accordance with the laws of India, and you irrevocably submit to the
              exclusive jurisdiction of the courts located in Pune, India.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">If you have any questions about these Terms of
              Service, please contact us:</p>
            <div className="bg-secondary/30 p-6 rounded-lg border border-border/40">
              <p className="text-foreground"><strong>EduMesh Legal Team</strong></p>
              <p className="text-muted-foreground">Email: legal@edumesh.com</p>
              <p className="text-muted-foreground">Address: MIT Institute, Pune, India</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
