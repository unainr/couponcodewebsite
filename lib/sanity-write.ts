import { createClient } from '@sanity/client';

// Create a write client for dashboard operations
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false, // Don't use CDN for write operations
  token: process.env.SANITY_API_WRITE_TOKEN, // You'll need to add this to your .env.local
  apiVersion: '2024-01-01',
});

// Helper functions for common operations
export const sanityOperations = {
  // Create a new document
  create: async (document: any) => {
    try {
      const result = await writeClient.create(document);
      return { success: true, data: result };
    } catch (error) {
      console.error('Error creating document:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  // Update a document
  update: async (id: string, updates: any) => {
    try {
      const result = await writeClient.patch(id).set(updates).commit();
      return { success: true, data: result };
    } catch (error) {
      console.error('Error updating document:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  // Delete a document
  delete: async (id: string) => {
    try {
      const result = await writeClient.delete(id);
      return { success: true, data: result };
    } catch (error) {
      console.error('Error deleting document:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  // Upload an image
  uploadImage: async (file: File) => {
    try {
      const asset = await writeClient.assets.upload('image', file);
      return { success: true, data: asset };
    } catch (error) {
      console.error('Error uploading image:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  // Fetch reference options (for dropdowns)
  fetchReferenceOptions: async (type: string) => {
    try {
      const query = `*[_type == "${type}"] | order(name asc) { _id, name, "slug": slug.current }`;
      const result = await writeClient.fetch(query);
      return { success: true, data: result };
    } catch (error) {
      console.error('Error fetching reference options:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },
};