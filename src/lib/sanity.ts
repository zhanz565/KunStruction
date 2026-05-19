import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: 's5f34u5f', 
  dataset: 'production',
  apiVersion: '2024-05-10', 
  useCdn: false, 
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}