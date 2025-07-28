import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Please check your .env file.');
}

if (supabaseUrl.includes('your-project-id') || supabaseAnonKey.includes('your-anon-key')) {
  console.warn('Please update your .env file with actual Supabase credentials.');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Painting {
  id: string;
  title: string;
  title_ar?: string;
  year: string;
  medium: string;
  medium_ar?: string;
  dimensions: string;
  collection: string;
  collection_ar?: string;
  theme: string;
  image_url: string;
  description: string;
  description_ar?: string;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface PaintingInsert {
  title: string;
  title_ar?: string;
  year: string;
  medium: string;
  medium_ar?: string;
  dimensions: string;
  collection: string;
  collection_ar?: string;
  theme: string;
  image_url: string;
  description: string;
  description_ar?: string;
  is_featured?: boolean;
  display_order?: number;
}

export interface PageContent {
  id: string;
  slug: string;
  title_en: string;
  title_ar?: string;
  content_en: Record<string, any>;
  content_ar?: Record<string, any>;
  meta_description_en?: string;
  meta_description_ar?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface GallerySetting {
  id: string;
  name: string;
  value_en: string;
  value_ar?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

// Painting Service
export const paintingService = {
  // Get all paintings
  async getAll(): Promise<Painting[]> {
    try {
      const { data, error } = await supabase
        .from('paintings')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching paintings:', error);
      throw error;
    }
  },

  // Get paintings by collection
  async getByCollection(collection: string): Promise<Painting[]> {
    try {
      const { data, error } = await supabase
        .from('paintings')
        .select('*')
        .eq('collection', collection)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching paintings by collection:', error);
      throw error;
    }
  },

  // Get featured paintings
  async getFeatured(): Promise<Painting[]> {
    try {
      const { data, error } = await supabase
        .from('paintings')
        .select('*')
        .eq('is_featured', true)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching featured paintings:', error);
      throw error;
    }
  },

  // Get single painting
  async getById(id: string): Promise<Painting | null> {
    try {
      const { data, error } = await supabase
        .from('paintings')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching painting by ID:', error);
      throw error;
    }
  },

  // Create painting
  async create(painting: PaintingInsert): Promise<Painting> {
    try {
      const { data, error } = await supabase
        .from('paintings')
        .insert(painting)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating painting:', error);
      throw error;
    }
  },

  // Update painting
  async update(id: string, painting: Partial<PaintingInsert>): Promise<Painting> {
    try {
      const { data, error } = await supabase
        .from('paintings')
        .update({ ...painting, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating painting:', error);
      throw error;
    }
  },

  // Delete painting
  async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('paintings')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting painting:', error);
      throw error;
    }
  }
};

// Page Content Service
export const pageService = {
  // Get page by slug
  async getBySlug(slug: string): Promise<PageContent | null> {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') return null; // Not found
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error fetching page:', error);
      return null;
    }
  },

  // Get all pages
  async getAll(): Promise<PageContent[]> {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('slug', { ascending: true });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching pages:', error);
      throw error;
    }
  }
};

// Gallery Settings Service
export const gallerySettingsService = {
  // Get setting by name
  async getByName(name: string): Promise<GallerySetting | null> {
    try {
      const { data, error } = await supabase
        .from('gallery_settings')
        .select('*')
        .eq('name', name)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') return null; // Not found
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error fetching gallery setting:', error);
      return null;
    }
  },

  // Get all settings
  async getAll(): Promise<GallerySetting[]> {
    try {
      const { data, error } = await supabase
        .from('gallery_settings')
        .select('*')
        .order('name', { ascending: true });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching gallery settings:', error);
      throw error;
    }
  }
};

// Utility function to check Supabase connection
export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    if (!supabaseUrl || !supabaseAnonKey || 
        supabaseUrl.includes('your-project-id') || 
        supabaseAnonKey.includes('your-anon-key')) {
      return false;
    }

    const { data, error } = await supabase
      .from('paintings')
      .select('count', { count: 'exact', head: true });

    return !error;
  } catch (error) {
    console.error('Supabase connection check failed:', error);
    return false;
  }
};