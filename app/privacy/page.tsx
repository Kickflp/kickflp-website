export const metadata = {
  title: 'Privacy Policy — KICKFLP',
  description: 'Privacy Policy for KICKFLP, the action sports streaming platform.',
}

export default function PrivacyPage() {
  return (
    <main style={{
      backgroundColor: '#000000',
      minHeight: '100vh',
      padding: '60px 24px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: '#ffffff',
    }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>

        {/* Logo */}
        <a href="/" style={{ display: 'inline-block', marginBottom: '48px' }}>
          <img
            src="/kf_logo.png"
            alt="KICKFLP"
            width={160}
            height={64}
            style={{ objectFit: 'contain' }}
          />
        </a>

        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px', color: '#ffffff' }}>
          Privacy Policy
        </h1>
        <p style={{ color: '#888888', fontSize: '14px', marginBottom: '48px' }}>
          Last updated: April 17, 2026
        </p>

        <section style={{ marginBottom: '40px' }}>
          <p style={{ color: '#cccccc', lineHeight: 1.7, fontSize: '15px' }}>
            KICKFLP (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the KICKFLP mobile application, connected TV (CTV) applications, and the website located at kickflp.com (collectively, the &quot;Service&quot;). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service. Please read this policy carefully. If you disagree with its terms, please discontinue use of the Service.
          </p>
        </section>

        <Section title="1. Information We Collect">
          <p>We collect the following types of information:</p>
          <SubSection title="Information You Provide">
            <ul>
              <li><strong>Account registration:</strong> When you create an account on the mobile or CTV app, we collect your name and email address.</li>
              <li><strong>Sign-in with Apple / Google:</strong> If you sign in using Apple or Google, we receive your name and email address as permitted by those services.</li>
              <li><strong>Waitlist sign-up:</strong> If you join our waitlist at kickflp.com, we collect your name and email address.</li>
              <li><strong>Athlete applications:</strong> If you apply as an athlete, we collect your name, email, and social media handles (Instagram, TikTok, YouTube).</li>
              <li><strong>Sport preferences:</strong> We collect your selected action sports categories to personalize your content feed across mobile and CTV.</li>
            </ul>
          </SubSection>
          <SubSection title="Information Collected Automatically">
            <ul>
              <li><strong>Usage data:</strong> We collect information about how you interact with the Service, including videos watched, content bookmarked, and time spent in the app.</li>
              <li><strong>Device information:</strong> We may collect device type, operating system, app version, and CTV platform (e.g. Roku, Fire TV, Apple TV, Samsung TV).</li>
              <li><strong>Advertising data:</strong> Our advertising partners may collect data related to ad impressions, clicks, and interactions. See Section 5 for details.</li>
            </ul>
          </SubSection>
        </Section>

        <Section title="2. How We Use Your Information">
          <p>We use the information we collect to:</p>
          <ul>
            <li>Create and manage your account across mobile and CTV platforms</li>
            <li>Personalize your content feed based on your sport preferences</li>
            <li>Send transactional emails such as email verification, password reset, and account notifications</li>
            <li>Send waitlist confirmation and product update emails</li>
            <li>Process and respond to athlete applications</li>
            <li>Serve and measure advertising within the Service on mobile and CTV</li>
            <li>Monitor and analyze usage trends to improve the Service</li>
            <li>Detect and prevent fraudulent or unauthorized activity</li>
            <li>Comply with legal obligations</li>
          </ul>
        </Section>

        <Section title="3. How We Share Your Information">
          <p>We do not sell your personal information. We may share your information in the following circumstances:</p>
          <ul>
            <li><strong>Service providers:</strong> We share information with third-party vendors who help us operate the Service, including hosting, email delivery, video infrastructure, and analytics providers.</li>
            <li><strong>Advertising partners:</strong> We work with Google Ad Manager and streaming ad partners to serve ads within the mobile and CTV apps. These partners may use cookies and device identifiers to serve targeted advertising.</li>
            <li><strong>Legal requirements:</strong> We may disclose your information if required by law, regulation, or legal process.</li>
            <li><strong>Business transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
          </ul>
        </Section>

        <Section title="4. Third-Party Services">
          <p>The Service integrates with the following third-party services, each governed by their own privacy policies:</p>
          <ul>
            <li><strong>Vercel</strong> — website hosting (<a href="https://vercel.com/legal/privacy-policy" style={{ color: '#A8F0DD' }}>vercel.com/legal/privacy-policy</a>)</li>
            <li><strong>Heroku (Salesforce)</strong> — app backend infrastructure (<a href="https://www.salesforce.com/company/privacy/" style={{ color: '#A8F0DD' }}>salesforce.com/company/privacy</a>)</li>
            <li><strong>Cloudflare</strong> — video storage and delivery (<a href="https://www.cloudflare.com/privacypolicy/" style={{ color: '#A8F0DD' }}>cloudflare.com/privacypolicy</a>)</li>
            <li><strong>Resend</strong> — transactional email delivery (<a href="https://resend.com/legal/privacy-policy" style={{ color: '#A8F0DD' }}>resend.com/legal/privacy-policy</a>)</li>
            <li><strong>Google Ad Manager / Google Mobile Ads</strong> — advertising on mobile (<a href="https://policies.google.com/privacy" style={{ color: '#A8F0DD' }}>policies.google.com/privacy</a>)</li>
            <li><strong>Wurl / streaming ad partners</strong> — advertising on CTV platforms</li>
            <li><strong>Roku, Amazon Fire TV, Apple TV, Samsung TV and other CTV platforms</strong> — connected TV distribution, each subject to their own platform privacy policies</li>
            <li><strong>Sign in with Apple</strong> — authentication (<a href="https://www.apple.com/legal/privacy/" style={{ color: '#A8F0DD' }}>apple.com/legal/privacy</a>)</li>
            <li><strong>Sign in with Google</strong> — authentication (<a href="https://policies.google.com/privacy" style={{ color: '#A8F0DD' }}>policies.google.com/privacy</a>)</li>
          </ul>
        </Section>

        <Section title="5. Advertising">
          <p>
            KICKFLP displays ads within the mobile app served by Google Ad Manager and the Google Mobile Ads SDK. On CTV platforms, ads are served via streaming ad insertion partners. These services may use device identifiers (such as Apple&apos;s IDFA, Google&apos;s Advertising ID, or CTV device IDs) to serve advertisements based on your interests and prior activity.
          </p>
          <p style={{ marginTop: '16px' }}>
            You can limit ad tracking by adjusting the privacy settings on your device:
          </p>
          <ul>
            <li><strong>iOS:</strong> Settings → Privacy & Security → Tracking → turn off &quot;Allow Apps to Request to Track&quot;</li>
            <li><strong>Android:</strong> Settings → Privacy → Ads → opt out of ads personalization</li>
            <li><strong>Roku:</strong> Settings → Privacy → Advertising → Limit Ad Tracking</li>
            <li><strong>Amazon Fire TV:</strong> Settings → Preferences → Privacy Settings → Interest-Based Ads</li>
            <li><strong>Apple TV:</strong> Settings → Privacy → Advertising → turn off personalized ads</li>
            <li><strong>Samsung TV:</strong> Settings → Support → Terms & Privacy → Interest-Based Advertising</li>
          </ul>
        </Section>

        <Section title="6. Data Retention">
          <p>
            We retain your personal information for as long as your account is active or as needed to provide the Service. You may request deletion of your account at any time from within the mobile app (Profile → Delete Account). Upon deletion, your personal data is removed from our active systems. Some data may be retained in backups for a limited period as required by law or for legitimate business purposes.
          </p>
        </Section>

        <Section title="7. Children's Privacy">
          <p>
            The Service is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. Users are required to confirm they are 13 or older during account creation. If we become aware that we have collected personal information from a child under 13 without parental consent, we will delete that information promptly.
          </p>
        </Section>

        <Section title="8. Your Rights">
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your personal information</li>
            <li>Object to or restrict certain processing of your data</li>
            <li>Data portability</li>
          </ul>
          <p style={{ marginTop: '16px' }}>
            To exercise any of these rights, contact us at{' '}
            <a href="mailto:sendit@kickflp.com" style={{ color: '#A8F0DD' }}>
              sendit&#64;kickflp&#46;com
            </a>.
          </p>
        </Section>

        <Section title="9. Security">
          <p>
            We implement industry-standard security measures to protect your information, including encrypted data transmission (HTTPS/SSL), authentication tokens, and rate limiting on our API. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </Section>

        <Section title="10. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. When we do, we will update the &quot;Last updated&quot; date at the top of this page. We encourage you to review this policy periodically. Your continued use of the Service after any changes constitutes your acceptance of the updated policy.
          </p>
        </Section>

        <Section title="11. Contact Us">
          <p>
            If you have questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <div style={{
            marginTop: '16px',
            padding: '24px',
            backgroundColor: '#111111',
            borderRadius: '12px',
            border: '1px solid #222222',
          }}>
            <p style={{ margin: 0, lineHeight: 2 }}>
              <strong>KICKFLP</strong><br />
              Email: <a href="mailto:sendit@kickflp.com" style={{ color: '#A8F0DD' }}>sendit&#64;kickflp&#46;com</a><br />
              Website: <a href="https://kickflp.com" style={{ color: '#A8F0DD' }}>kickflp.com</a>
            </p>
          </div>
        </Section>

        <div style={{ marginTop: '64px', paddingTop: '24px', borderTop: '1px solid #222222' }}>
          <a href="/" style={{ color: '#A8F0DD', fontSize: '14px', textDecoration: 'none' }}>
            ← Back to KICKFLP
          </a>
        </div>

      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '40px' }}>
      <h2 style={{
        fontSize: '20px',
        fontWeight: 700,
        color: '#A8F0DD',
        marginBottom: '16px',
        paddingBottom: '8px',
        borderBottom: '1px solid #1a1a1a',
      }}>
        {title}
      </h2>
      <div style={{ color: '#cccccc', lineHeight: 1.7, fontSize: '15px' }}>
        {children}
      </div>
    </section>
  )
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: '20px' }}>
      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', marginBottom: '10px' }}>
        {title}
      </h3>
      {children}
    </div>
  )
}
