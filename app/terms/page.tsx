import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions governing your use of Colloque.",
};

const sectionStyle: React.CSSProperties = {
  marginBottom: "2.5rem",
};

const headingStyle: React.CSSProperties = {
  fontFamily: "var(--font-cormorant), Georgia, serif",
  fontSize: "clamp(20px, 2.5vw, 26px)",
  fontWeight: 600,
  color: "#2C2C2C",
  marginBottom: "1rem",
  marginTop: 0,
};

const bodyStyle: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans), sans-serif",
  fontSize: "15px",
  fontWeight: 300,
  color: "#4A4035",
  lineHeight: 1.8,
  marginBottom: "1rem",
  marginTop: 0,
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans), sans-serif",
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "#9A8E7A",
};

export default function TermsPage() {
  return (
    <div style={{ backgroundColor: "#F5EFE6", minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "clamp(4rem, 10vw, 8rem) 2rem 6rem",
        }}
      >
        <p style={{ ...labelStyle, marginBottom: "1.5rem" }}>Legal</p>

        <h1
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(40px, 6vw, 72px)",
            fontStyle: "italic",
            fontWeight: 700,
            color: "#2C2C2C",
            lineHeight: 1.1,
            marginBottom: "0.5rem",
            marginTop: 0,
          }}
        >
          Terms of Service
        </h1>

        <p style={{ ...bodyStyle, color: "#9A8E7A", marginBottom: "3rem" }}>
          Effective Date: June 2025 &nbsp;·&nbsp; Last Updated: June 2025
        </p>

        <div
          style={{
            height: "1px",
            backgroundColor: "rgba(44,44,44,0.1)",
            marginBottom: "3rem",
          }}
        />

        <div style={sectionStyle}>
          <h2 style={headingStyle}>1. Acceptance of Terms</h2>
          <p style={bodyStyle}>
            By accessing or using Colloque (&quot;the Platform&quot;), you agree to be bound by
            these Terms of Service (&quot;Terms&quot;). If you do not agree, please do not use
            the Platform. These Terms constitute a legally binding agreement between you
            and Colloque.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>2. Eligibility</h2>
          <p style={bodyStyle}>
            You must be at least 18 years of age to use Colloque. By using the Platform,
            you represent and warrant that you meet this age requirement. The Platform is
            operated from India and governed by Indian law.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>3. Use of the Platform</h2>
          <p style={bodyStyle}>You agree not to:</p>
          <ul style={{ ...bodyStyle, paddingLeft: "1.5rem" }}>
            <li style={{ marginBottom: "0.5rem" }}>
              Reproduce, redistribute, or repurpose any content without explicit written permission.
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Use the Platform for any unlawful purpose or in violation of Indian law.
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Attempt to gain unauthorised access to any part of the Platform or its systems.
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Submit content that is defamatory, abusive, harassing, or infringes upon third-party rights.
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Use automated tools, scrapers, or bots to access or extract content from the Platform.
            </li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>4. Intellectual Property</h2>
          <p style={bodyStyle}>
            All content on Colloque — including articles, book summaries, AI resources,
            design, and code — is the intellectual property of Colloque or its respective
            licensors, protected under Indian copyright law and applicable international
            treaties.
          </p>
          <p style={bodyStyle}>
            You may read and share individual links to content for personal, non-commercial
            purposes, with appropriate attribution. Reproduction or commercial use without
            written consent is prohibited.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>5. User-Generated Content</h2>
          <p style={bodyStyle}>
            By posting comments or community content, you grant Colloque a non-exclusive,
            royalty-free licence to display that content on the Platform. You retain
            ownership of your content. You are solely responsible for ensuring your
            content does not violate applicable laws or these Terms.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>6. Premium and Community Membership</h2>
          <p style={bodyStyle}>
            Access to certain features (Community, premium log entries) may require
            membership. Membership terms, pricing, and cancellation policies will be
            communicated separately. We reserve the right to modify membership benefits
            with reasonable notice.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>7. Disclaimers</h2>
          <p style={bodyStyle}>
            Colloque is provided &quot;as is&quot; without warranties of any kind. We do not
            guarantee uninterrupted access, accuracy of all content, or suitability for
            any particular purpose. Nothing on this Platform constitutes professional
            legal, medical, financial, or investment advice.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>8. Limitation of Liability</h2>
          <p style={bodyStyle}>
            To the fullest extent permitted by applicable law, Colloque shall not be
            liable for any indirect, incidental, special, or consequential damages arising
            from your use of the Platform. Our aggregate liability shall not exceed the
            amount you paid us in the 12 months preceding the claim, or ₹1,000 — whichever
            is greater.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>9. Governing Law and Dispute Resolution</h2>
          <p style={bodyStyle}>
            These Terms are governed by the laws of India. Any disputes arising under
            these Terms shall be subject to the exclusive jurisdiction of the courts
            in Mumbai, Maharashtra, India. We encourage good-faith resolution of disputes
            before formal legal proceedings.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>10. Modifications to Terms</h2>
          <p style={bodyStyle}>
            We may update these Terms at any time. Continued use of the Platform after
            any modification constitutes acceptance of the updated Terms. We will endeavour
            to notify registered users of material changes via email.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>11. Contact</h2>
          <p style={bodyStyle}>
            For questions about these Terms, contact us at{" "}
            <a href="mailto:legal@colloque.in" style={{ color: "#C9A84C" }}>
              legal@colloque.in
            </a>
            .
          </p>
        </div>

        <div
          style={{
            height: "1px",
            backgroundColor: "rgba(44,44,44,0.1)",
            marginTop: "3rem",
            marginBottom: "2rem",
          }}
        />

        <div style={{ display: "flex", gap: "2rem" }}>
          <Link
            href="/privacy"
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#2C2C2C",
              textDecoration: "none",
              borderBottom: "1px solid rgba(44,44,44,0.2)",
              paddingBottom: "2px",
            }}
          >
            Privacy Policy
          </Link>
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#2C2C2C",
              textDecoration: "none",
              borderBottom: "1px solid #C9A84C",
              paddingBottom: "2px",
            }}
          >
            ← Back to Colloque
          </Link>
        </div>
      </div>
    </div>
  );
}
