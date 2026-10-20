import { defineField, defineType } from 'sanity';

export const committeeType = defineType({
  name: 'committee',
  title: 'Committee & Chamber',
  type: 'document',
  fields: [
    defineField({
      name: 'code',
      title: 'Committee Code / Acronym',
      type: 'string',
      description: 'e.g. UNSC, WHO, UNHRC, UNGA',
      validation: (rule) => rule.required().uppercase(),
    }),
    defineField({
      name: 'name',
      title: 'Full Committee Name',
      type: 'string',
      description: 'e.g. United Nations Security Council',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'topic',
      title: 'Agenda Topic Description',
      type: 'text',
      rows: 3,
      description: 'Comprehensive title and overview of the chamber debate topic.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'executiveBoard',
      title: 'Executive Board / Dais Title',
      type: 'string',
      description: 'e.g. Executive Board Dais, President & Co-Chair',
      initialValue: 'Executive Board Dais',
    }),
    defineField({
      name: 'seats',
      title: 'Total Country Portfolios / Seats',
      type: 'number',
      description: 'Total number of seats available in this committee.',
      validation: (rule) => rule.required().positive().integer(),
    }),
    defineField({
      name: 'bannerImage',
      title: 'Chamber Banner Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for accessibility and SEO.',
        },
      ],
    }),
    defineField({
      name: 'studyGuide',
      title: 'Background Dossier / Study Guide (PDF)',
      type: 'file',
      options: {
        accept: '.pdf',
      },
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
      subtitle: 'code',
      media: 'bannerImage',
    },
  },
});
