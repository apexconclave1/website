import type { Metadata } from 'next';
import HorizonDivider from '@/components/layout/HorizonDivider';
import ContactForm from '@/components/contact/ContactForm';
import ContactCards from '@/components/contact/ContactCards';

export const metadata: Metadata = {
  title: 'Contact | Apex Conclave',
  description:
    'Reach out to Apex Conclave about events, registration, partnerships and sponsorship.',
};

export default function ContactPage() {
  return (
    <>

      <main style={{ minHeight: '100vh', backgroundColor: 'transparent', paddingTop: '6.5rem' }}>
        {/* Page Header */}
        <section
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: '4rem 1.5rem 2rem',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '0.6875rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              color: '#C7A16A',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            Secretariat Communications
          </p>
          <h1
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: '#F4F1EA',
              lineHeight: 1.15,
              marginBottom: '1.5rem',
            }}
          >
            Contact Apex Conclave
          </h1>
          <p
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: '1.0625rem',
              color: '#CDC7C0',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.8,
            }}
          >
            Have a question about delegate registration, committee agendas, or institutional co-hosting? Send us a message or reach out to our Secretariat.
          </p>
        </section>

        <HorizonDivider />

        {/* Form and Info Cards */}
        <section style={{ maxWidth: '1160px', margin: '0 auto', padding: '2rem 1.5rem 6rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3.5rem',
              alignItems: 'start',
            }}
          >
            {/* Left Column: Direct Info Cards */}
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: '1.65rem',
                  fontWeight: 400,
                  color: '#F4F1EA',
                  marginBottom: '1.5rem',
                }}
              >
                Secretariat Channels
              </h2>
              <ContactCards />
            </div>

            {/* Right Column: Interactive Form */}
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: '1.65rem',
                  fontWeight: 400,
                  color: '#F4F1EA',
                  marginBottom: '1.5rem',
                }}
              >
                Send a Formal Inquiry
              </h2>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

    </>
  );
}
