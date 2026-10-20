import { defineField, defineType } from 'sanity';

export const conferenceEditionType = defineType({
  name: 'conferenceEdition',
  title: 'Conference Edition',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Edition Title',
      type: 'string',
      description: 'e.g. DIPLOVIA Edition I',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'editionNumber',
      title: 'Edition Number / Code',
      type: 'string',
      description: 'e.g. EDITION I',
      initialValue: 'EDITION I',
    }),
    defineField({
      name: 'statusTag',
      title: 'Live Status Tag',
      type: 'string',
      description: 'e.g. REGISTRATION ACTIVE, PROCEEDINGS IN PROGRESS, CONCLUDED',
      initialValue: 'REGISTRATION ACTIVE',
    }),
    defineField({
      name: 'startDate',
      title: 'Conference Start Date',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'Conference End Date',
      type: 'datetime',
    }),
    defineField({
      name: 'countdownTarget',
      title: 'Live Countdown Target Date',
      type: 'datetime',
      description: 'Target timestamp used by the Conference Status Bar countdown timer.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'venue',
      title: 'Conference Venue / Location',
      type: 'string',
      description: 'e.g. New Delhi, India',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active Conference Edition',
      type: 'boolean',
      description: 'Only one edition should be marked active at any time to drive website countdowns.',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'statusTag',
    },
  },
});
