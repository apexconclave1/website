import { defineField, defineType } from 'sanity';

export const countryMatrixType = defineType({
  name: 'countryMatrix',
  title: 'Country Portfolio Allocation',
  type: 'document',
  fields: [
    defineField({
      name: 'countryName',
      title: 'Country / Character Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'committee',
      title: 'Assigned Committee',
      type: 'reference',
      to: [{ type: 'committee' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isoCode',
      title: 'ISO 2-Letter Code',
      type: 'string',
      description: 'e.g. US, GB, FR, CN, IN, JP',
      validation: (rule) => rule.max(3).uppercase(),
    }),
    defineField({
      name: 'continent',
      title: 'Regional Grouping / Continent',
      type: 'string',
      options: {
        list: [
          { title: 'Africa', value: 'Africa' },
          { title: 'Americas', value: 'Americas' },
          { title: 'Asia-Pacific', value: 'Asia-Pacific' },
          { title: 'Europe', value: 'Europe' },
          { title: 'Middle East', value: 'Middle East' },
          { title: 'International NGO / Observer', value: 'Observer' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Portfolio Allocation Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available (Open for Booking)', value: 'AVAILABLE' },
          { title: 'Reserved (Provisional Allocation)', value: 'RESERVED' },
          { title: 'Allocated (Confirmed Delegate)', value: 'ALLOCATED' },
        ],
      },
      initialValue: 'AVAILABLE',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'delegateName',
      title: 'Assigned Delegate Name',
      type: 'string',
      description: 'Leave blank if portfolio is AVAILABLE.',
    }),
    defineField({
      name: 'institution',
      title: 'Delegate Institution / School',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'countryName',
      subtitle: 'status',
      committeeCode: 'committee.code',
    },
    prepare({ title, subtitle, committeeCode }) {
      return {
        title: title || 'Unnamed Portfolio',
        subtitle: `${committeeCode ? `[${committeeCode}] ` : ''}${subtitle || 'AVAILABLE'}`,
      };
    },
  },
});
