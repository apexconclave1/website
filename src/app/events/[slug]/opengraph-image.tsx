import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { eventsData, formatEventDates } from '@/lib/data/events';

// Link-preview image for each event, built from its data, so it updates when dates are set.
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Event by Apex Conclave';

export function generateStaticParams() {
  return eventsData.map((event) => ({ slug: event.slug }));
}

export default async function Image({ params }: { params: { slug: string } }) {
  const event = eventsData.find((e) => e.slug === params.slug) ?? eventsData[0];
  const dataUrl = async (file: string) =>
    `data:image/png;base64,${(await readFile(path.join(process.cwd(), 'public', file))).toString('base64')}`;
  const logo = event.logo ? await dataUrl(event.logo) : null;
  const apexLogo = await dataUrl('/brand/apex-conclave-logo-light.png');
  const subtitle = event.searchTitle?.split(': ')[1] ?? event.category;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 96px',
          background: '#0C0C0D',
          color: '#EAE6DF',
        }}
      >
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} width={640} height={184} alt="" />
        ) : (
          <div style={{ fontSize: 96, fontWeight: 700 }}>{event.title}</div>
        )}
        <div style={{ marginTop: 40, fontSize: 40, fontWeight: 600 }}>{subtitle}</div>
        <div style={{ marginTop: 12, fontSize: 30, color: 'rgba(234, 230, 223, 0.7)' }}>
          {`${formatEventDates(event)} · ${event.location.isVirtual ? 'Online' : event.location.city}`}
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={apexLogo} width={130} height={44} alt="" style={{ position: 'absolute', bottom: 56, left: 96 }} />
      </div>
    ),
    size,
  );
}
