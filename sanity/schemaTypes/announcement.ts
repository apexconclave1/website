import { defineField, defineType } from 'sanity';

export const announcementType = defineType({
  name: 'announcement',
  title: 'Announcement & Circular',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Announcement Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Notice / Circular', value: 'Notice' },
          { title: 'Study Guide Release', value: 'StudyGuide' },
          { title: 'Allotment Matrix', value: 'Allotment' },
          { title: 'Speaker / Dais Spotlight', value: 'Spotlight' },
        ],
      },
      initialValue: 'Notice',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Brief Summary',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'attachment',
      title: 'Downloadable File / Circular PDF',
      type: 'file',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
    },
  },
});
