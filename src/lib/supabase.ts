import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

if (supabaseUrl.includes('your-project-id') || supabaseAnonKey.includes('your-anon-key')) {
  throw new Error('Please update your .env file with actual Supabase credentials.');
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase };

// Page content interface
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

export interface PageContentInsert {
  slug: string;
  title_en: string;
  title_ar?: string;
  content_en: Record<string, any>;
  content_ar?: Record<string, any>;
  meta_description_en?: string;
  meta_description_ar?: string;
  is_published?: boolean;
}

// Gallery settings interface
export interface GallerySetting {
  id: string;
  name: string;
  value_en: string;
  value_ar?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface GallerySettingInsert {
  name: string;
  value_en: string;
  value_ar?: string;
  description?: string;
}

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

// Painting CRUD operations
export const paintingService = {
  // Get all paintings
  async getAll(): Promise<Painting[]> {
    const { data, error } = await supabase
      .from('paintings')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  // Get paintings by collection
  async getByCollection(collection: string): Promise<Painting[]> {
    const { data, error } = await supabase
      .from('paintings')
      .select('*')
      .eq('collection', collection)
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  // Get featured paintings
  async getFeatured(): Promise<Painting[]> {
    const { data, error } = await supabase
      .from('paintings')
      .select('*')
      .eq('is_featured', true)
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  // Get single painting
  async getById(id: string): Promise<Painting | null> {
    const { data, error } = await supabase
      .from('paintings')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Create painting
  async create(painting: PaintingInsert): Promise<Painting> {
    const { data, error } = await supabase
      .from('paintings')
      .insert(painting)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update painting
  async update(id: string, painting: Partial<PaintingInsert>): Promise<Painting> {
    const { data, error } = await supabase
      .from('paintings')
      .update({ ...painting, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Delete painting
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('paintings')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Page content CRUD operations
export const pageService = {
  // Get all pages
  async getAll(): Promise<PageContent[]> {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .order('slug', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  // Get page by slug
  async getBySlug(slug: string): Promise<PageContent | null> {
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
  },

  // Create page
  async create(page: PageContentInsert): Promise<PageContent> {
    const { data, error } = await supabase
      .from('pages')
      .insert(page)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update page
  async update(id: string, page: Partial<PageContentInsert>): Promise<PageContent> {
    const { data, error } = await supabase
      .from('pages')
      .update({ ...page, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Delete page
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('pages')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Gallery settings CRUD operations
export const gallerySettingsService = {
  // Get all settings
  async getAll(): Promise<GallerySetting[]> {
    const { data, error } = await supabase
      .from('gallery_settings')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  // Get setting by name
  async getByName(name: string): Promise<GallerySetting | null> {
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
  },

  // Create setting
  async create(setting: GallerySettingInsert): Promise<GallerySetting> {
    const { data, error } = await supabase
      .from('gallery_settings')
      .insert(setting)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update setting
  async update(id: string, setting: Partial<GallerySettingInsert>): Promise<GallerySetting> {
    const { data, error } = await supabase
      .from('gallery_settings')
      .update({ ...setting, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Delete setting
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('gallery_settings')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};