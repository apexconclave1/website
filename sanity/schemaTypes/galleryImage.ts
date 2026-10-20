import { defineField, defineType } from 'sanity';

export const galleryImageType = defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Image Title / Moment',
      type: 'string',
      description: 'e.g. General Assembly Hall, Security Council Deliberations',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photo Asset',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Target Link / Route',
      type: 'string',
      description: 'e.g. /committees, /about, /contact',
      initialValue: '/committees',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
});
