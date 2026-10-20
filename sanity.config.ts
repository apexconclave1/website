import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '55brkxf1';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'diplovia-studio',
  title: 'DIPLOVIA Secretariat CMS',

  projectId,
  dataset,

  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('DIPLOVIA Content')
          .items([
            S.listItem()
              .title('Conference Edition')
              .child(S.documentTypeList('conferenceEdition').title('Conference Editions')),
            S.divider(),
            S.listItem()
              .title('Committees & Chambers')
              .child(S.documentTypeList('committee').title('Committees')),
            S.listItem()
              .title('Country Portfolio Matrix')
              .child(S.documentTypeList('countryMatrix').title('Country Allocations')),
            S.divider(),
            S.listItem()
              .title('Executive Leadership')
              .child(S.documentTypeList('leadership').title('Leadership Profiles')),
            S.listItem()
              .title('Announcements & Circulars')
              .child(S.documentTypeList('announcement').title('Announcements')),
            S.listItem()
              .title('Diplomatic Gallery')
              .child(S.documentTypeList('galleryImage').title('Gallery Moments')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
