import {
  buildEmailField,
  buildEmailFooter,
  buildEmailHeader,
  buildEmailLongField,
  buildEmailSection,
  buildEmailShell
} from "@/lib/email-template";

const logoUrl = "https://startflowhq.com/logo.png";

function EmailPreviewCard({ title, html }: { title: string; html: string }) {
  return (
    <section className="rounded-[1.75rem] border border-[#eadfce] bg-white p-4 shadow-[0_18px_40px_rgba(33,22,12,0.06)] sm:p-6">
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6b5b4a]">
        {title}
      </p>
      <div
        className="overflow-hidden rounded-[1.25rem] border border-[#eadfce] bg-white"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}

export default function EmailPreviewPage() {
  const contactPreview = buildEmailShell(`
    ${buildEmailHeader("New Contact Inquiry", logoUrl)}
    ${buildEmailSection(
      "CLIENT DETAILS",
      [
        buildEmailField("Name", "Sarah K."),
        buildEmailField("Email", "sarah@example.com"),
        buildEmailField("Phone", "(555) 123-4567")
      ].join("")
    )}
    ${buildEmailSection(
      "BUSINESS OVERVIEW",
      [
        buildEmailField("Business Name", "Coastal Creative Studio"),
        buildEmailField("Business Type", "Design Services"),
        buildEmailField("Current Stage", "Early planning")
      ].join("")
    )}
    ${buildEmailSection(
      "GOALS & NEEDS",
      buildEmailLongField(
        "Goals / What They Need Help With",
        "I need help getting my business set up properly and understanding the right next steps so I can start working with clients confidently."
      )
    )}
    ${buildEmailSection(
      "ACTION",
      [
        buildEmailField("Submitted By", "Sarah K."),
        buildEmailField("Reply To", "contact@startflowhq.com")
      ].join("")
    )}
    ${buildEmailFooter()}
  `);

  const onboardingPreview = buildEmailShell(`
    ${buildEmailHeader("New Onboarding Submission", logoUrl)}
    ${buildEmailSection(
      "CLIENT DETAILS",
      [
        buildEmailField("Package", "Launch"),
        buildEmailField("Full Name", "Javier S."),
        buildEmailField("Email", "javier@example.com"),
        buildEmailField("Phone", "(555) 987-6543")
      ].join("")
    )}
    ${buildEmailSection(
      "BUSINESS OVERVIEW",
      [
        buildEmailField("Business Name", "Northside Mobile Detailing"),
        buildEmailField("Business Type", "Service Business"),
        buildEmailField("Website or Social Link", "@northsidemobile"),
        buildEmailLongField(
          "What Are They Building?",
          "A mobile detailing business focused on busy professionals who want convenient at-home service."
        ),
        buildEmailLongField(
          "Current Stage",
          "The idea is clear, but I have not fully set up the business structure or branding yet."
        )
      ].join("")
    )}
    ${buildEmailSection(
      "GOALS & NEEDS",
      [
        buildEmailLongField(
          "What Do They Need the Most Help With Right Now?",
          "I need clarity on setup, branding direction, and the right order to get everything launched cleanly."
        ),
        buildEmailLongField(
          "Main Goal for the Next 30-60 Days",
          "Launch professionally and start booking my first paying customers."
        ),
        buildEmailLongField(
          "Anything Else We Should Know?",
          "I want the process to feel simple and guided because this is my first business."
        )
      ].join("")
    )}
    ${buildEmailSection(
      "ACTION",
      [
        buildEmailField("Preferred Communication Method", "Email"),
        buildEmailField("Reply To", "contact@startflowhq.com")
      ].join("")
    )}
    ${buildEmailFooter()}
  `);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#faf6ee_100%)] px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6b5b4a]">
            Email Preview
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#1f1a17] sm:text-4xl">
            Current StartFlow email layout
          </h1>
          <p className="mt-4 text-base leading-8 text-[#5f564a]">
            This is a browser preview of the same structure used by the contact and onboarding emails.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <EmailPreviewCard title="Contact Email" html={contactPreview} />
          <EmailPreviewCard title="Onboarding Email" html={onboardingPreview} />
        </div>
      </div>
    </main>
  );
}
