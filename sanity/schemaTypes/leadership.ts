import { defineField, defineType } from 'sanity';

export const leadershipType = defineType({
  name: 'leadership',
  title: 'Executive Leadership & Secretariat',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Foundational Role',
      type: 'string',
      description: 'e.g. Founder, Co-Founder, Under-Secretary-General',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Official Executive Title',
      type: 'string',
      description: 'e.g. Secretary-General, Chief Technology Officer (CTO)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Executive Portrait',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Featured Leadership Quote',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'bio',
      title: 'Executive Bio',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'expertise',
      title: 'Domain Focus / Expertise Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn Profile URL',
      type: 'url',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'image',
    },
  },
});
