import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Colloque collects, uses, and protects your personal data. Compliant with India's Digital Personal Data Protection Act, 2023.",
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

export default function PrivacyPage() {
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
          Privacy Policy
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
          <h2 style={headingStyle}>1. Who We Are</h2>
          <p style={bodyStyle}>
            Colloque (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is an independent digital platform
            operated from India, offering curated articles, book summaries, AI resources,
            and community features. Our website is accessible at{" "}
            <a href="https://colloque.in" style={{ color: "#C9A84C" }}>
              https://colloque.in
            </a>
            .
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>2. What Data We Collect</h2>
          <p style={bodyStyle}>We may collect the following categories of personal data:</p>
          <ul style={{ ...bodyStyle, paddingLeft: "1.5rem" }}>
            <li style={{ marginBottom: "0.5rem" }}>
              <strong>Account data:</strong> Email address when you sign in via magic link or join the waitlist.
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <strong>Usage data:</strong> Pages visited, time spent, and interaction events (collected anonymously via Vercel Analytics).
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <strong>User-generated content:</strong> Comments and community posts you submit.
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <strong>Local preferences:</strong> Bookmarks and reading history stored locally in your browser (not transmitted to our servers).
            </li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>3. How We Use Your Data</h2>
          <p style={bodyStyle}>We use your personal data to:</p>
          <ul style={{ ...bodyStyle, paddingLeft: "1.5rem" }}>
            <li style={{ marginBottom: "0.5rem" }}>Authenticate your account and manage your session.</li>
            <li style={{ marginBottom: "0.5rem" }}>Send you magic link emails for passwordless sign-in.</li>
            <li style={{ marginBottom: "0.5rem" }}>Notify waitlist members of community access.</li>
            <li style={{ marginBottom: "0.5rem" }}>Improve our platform based on aggregate usage patterns.</li>
            <li style={{ marginBottom: "0.5rem" }}>Respond to errors and monitor platform health via Sentry.</li>
          </ul>
          <p style={bodyStyle}>
            We do not sell, rent, or share your personal data with third parties for
            marketing purposes.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>4. Data Storage and Security</h2>
          <p style={bodyStyle}>
            User account data is stored securely in Supabase (hosted on AWS in the Asia
            Pacific region). We use SSL/TLS encryption for all data in transit. Supabase
            implements row-level security to ensure users can only access their own data.
          </p>
          <p style={bodyStyle}>
            We implement reasonable technical and organisational measures to protect your
            data against unauthorised access, loss, or disclosure.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>5. Your Rights Under DPDP Act, 2023</h2>
          <p style={bodyStyle}>
            As a Data Principal under India&apos;s Digital Personal Data Protection Act, 2023
            (DPDP Act), you have the following rights:
          </p>
          <ul style={{ ...bodyStyle, paddingLeft: "1.5rem" }}>
            <li style={{ marginBottom: "0.5rem" }}>
              <strong>Right to Access:</strong> Request a summary of your personal data we hold.
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <strong>Right to Correction:</strong> Request correction of inaccurate or incomplete data.
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <strong>Right to Erasure:</strong> Request deletion of your personal data, subject to legal retention requirements.
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <strong>Right to Grievance Redressal:</strong> File a complaint with our designated grievance officer.
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <strong>Right to Nominate:</strong> Nominate an individual to exercise your rights in the event of your death or incapacity.
            </li>
          </ul>
          <p style={bodyStyle}>
            To exercise any of these rights, contact us at{" "}
            <a href="mailto:privacy@colloque.in" style={{ color: "#C9A84C" }}>
              privacy@colloque.in
            </a>
            . We will respond within 30 days of your request.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>6. Cookies and Local Storage</h2>
          <p style={bodyStyle}>
            We use session cookies for authentication (via Supabase). No advertising or
            tracking cookies are used. Browser local storage is used to store your reading
            preferences and bookmarks — this data never leaves your device.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>7. Third-Party Services</h2>
          <p style={bodyStyle}>We use the following third-party services:</p>
          <ul style={{ ...bodyStyle, paddingLeft: "1.5rem" }}>
            <li style={{ marginBottom: "0.5rem" }}>
              <strong>Supabase</strong> — Authentication and database.
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <strong>Sanity</strong> — Content management (no personal data stored).
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <strong>Vercel</strong> — Hosting and edge delivery (anonymised analytics only).
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <strong>Sentry</strong> — Error monitoring (stack traces may include request context; no personal identifiers logged).
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <strong>Groq</strong> — AI inference for the ColloqueBot reading assistant (your queries are processed but not stored by us).
            </li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>8. Data Retention</h2>
          <p style={bodyStyle}>
            We retain account data for as long as your account is active. If you request
            deletion, we will erase your data within 30 days, except where required to
            retain it by applicable law.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>9. Children&apos;s Privacy</h2>
          <p style={bodyStyle}>
            Colloque is not directed at children under the age of 18. We do not knowingly
            collect personal data from minors. If you believe a minor has provided us with
            data, please contact us and we will delete it promptly.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>10. Changes to This Policy</h2>
          <p style={bodyStyle}>
            We may update this Privacy Policy from time to time. When we do, we will revise
            the &quot;Last Updated&quot; date above. Continued use of Colloque after changes
            constitutes acceptance of the revised policy.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>11. Contact Us</h2>
          <p style={bodyStyle}>
            For privacy-related queries or to exercise your DPDP rights, contact:
          </p>
          <p style={{ ...bodyStyle, fontWeight: 400 }}>
            Grievance Officer, Colloque
            <br />
            Email:{" "}
            <a href="mailto:privacy@colloque.in" style={{ color: "#C9A84C" }}>
              privacy@colloque.in
            </a>
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
  );
}
