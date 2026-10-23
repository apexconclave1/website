# Apex Conclave — Product Vision & Strategy

> This document defines the product vision, event verticals and growth roadmap for Apex Conclave. Rewritten on 2026-10-23 to match the owner's redesign brief; the roadmap and metrics are for the owner to confirm.

---

## What is Apex Conclave?

**Apex Conclave** creates platforms for students to compete, collaborate and showcase their abilities through experiences spanning business, technology, diplomacy, debate and more.

It is a multi-format student events and competitions brand, not a single-event website. Each event belongs to one of six verticals; **Diplovia** is the first event, not the identity of the whole brand.

---

## Core Value Proposition

1. **One brand, many kinds of competition**: diplomacy, business cases, hackathons, debate, startup pitching and esports under one name and one standard.
2. **Experience, competition, community, opportunity**: learn by doing, test ideas under pressure, meet students, colleges, judges and industry, and gain exposure through events and partnerships.
3. **Direct registration**: participants apply on the site themselves, without agents. For Diplovia, delegates list committee and country preferences and the team assigns seats after payment is verified.
4. **Credible by design**: no invented numbers, sponsors, testimonials or events. Planned verticals are labelled as planned.

---

## Event Verticals

Source: `src/lib/data/verticals.ts`.

| Vertical | Status | Example formats |
|---|---|---|
| Diplomacy & MUNs | Active | Diplovia 2026 (virtual Model UN), policy simulations |
| Business & Case Competitions | Planned | Strategy and consulting cases, analytics challenges |
| Technology & Hackathons | Planned | Coding competitions, hackathons, buildathons |
| Debates & Discourse | Planned | Debating, public speaking |
| Startup Pitching & Entrepreneurship | Planned | Pitches, entrepreneurial challenges |
| Gaming & Esports | Planned | Tournaments, inter-college leagues |

---

## First Event: Diplovia 2026

A virtual Model United Nations conference over two days on Zoom or Google Meet, dates to be announced. Five committees (UNSC, WHO, UNHRC, UNGA and a Historical Crisis Committee), preference-based country allotment, manual UPI payment, a certificate for every delegate. Copy comes from the delegate booklet (`docs/`).

---

## Target Audience

- **Participants**: high school and college students, roughly ages 15 to 23.
- **Judges, mentors and dais**: people who judge rounds, mentor teams or chair committees.
- **Volunteers and campus ambassadors**: students who help run events or bring them to their campus.
- **Partners**: sponsors, colleges that co-host, organisations that set a challenge, and student communities.

---

## Growth Roadmap

### Now: Foundation
- Umbrella website with six verticals and Diplovia as the first event.
- Static content in `src/lib/data/`, Supabase for registrations and contact messages.
- Brand identity and design system (`DESIGN.md`).

### Next: First events
- Open Diplovia registration once dates are set; run the event.
- Launch the next vertical when its first event is confirmed, with its own event page.
- Partner logos once real partners are confirmed.

### Later: Operations and community
- Admin view for registrations, payments and seat allotment (today done by hand in Supabase).
- Event archives with photos, results and awards.
- Alumni and past-participant updates.

---

## Key Metrics to Track

| Metric | Description |
|---|---|
| Events hosted | Events run under Apex Conclave, per vertical |
| Participants reached | Participants across all events |
| Partner institutions | Schools, colleges and organisations partnered |
| Registration conversion | Visitors to completed registrations (`registration_funnel` view, Vercel Analytics events) |
| Interest per vertical | 'Register Interest' messages for planned verticals |
