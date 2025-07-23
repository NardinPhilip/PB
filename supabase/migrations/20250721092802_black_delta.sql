/*
  # Add Content Management System Tables

  1. New Tables
    - `pages`
      - `id` (uuid, primary key)
      - `slug` (text, unique) - page identifier (home, about, gallery, etc.)
      - `title_en` (text) - English page title
      - `title_ar` (text) - Arabic page title
      - `content_en` (jsonb) - English page content as JSON
      - `content_ar` (jsonb) - Arabic page content as JSON
      - `meta_description_en` (text) - SEO meta description
      - `meta_description_ar` (text) - SEO meta description
      - `is_published` (boolean) - whether page is live
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `gallery_settings`
      - `id` (uuid, primary key)
      - `name` (text) - setting name
      - `value_en` (text) - English value
      - `value_ar` (text) - Arabic value
      - `description` (text) - what this setting controls
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for authenticated users to manage content

  3. Sample Data
    - Insert default page content for all website pages
    - Insert default gallery settings
*/

-- Create pages table
CREATE TABLE IF NOT EXISTS pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title_en text NOT NULL,
  title_ar text,
  content_en jsonb NOT NULL DEFAULT '{}',
  content_ar jsonb DEFAULT '{}',
  meta_description_en text,
  meta_description_ar text,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create gallery_settings table
CREATE TABLE IF NOT EXISTS gallery_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  value_en text NOT NULL,
  value_ar text,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for pages
CREATE POLICY "Anyone can view published pages"
  ON pages
  FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Authenticated users can manage pages"
  ON pages
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for gallery_settings
CREATE POLICY "Anyone can view gallery settings"
  ON gallery_settings
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage gallery settings"
  ON gallery_settings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default page content
INSERT INTO pages (slug, title_en, title_ar, content_en, content_ar, meta_description_en, meta_description_ar) VALUES
('home', 'Philip Boles - Digital Exhibition Portfolio', 'فيليب بولز - محفظة المعرض الرقمي', 
 '{
   "hero_title": "Philip Boles",
   "hero_subtitle": "Exploring the phenomenology of light and shadow through expressive realism",
   "hero_cta_primary": "Explore Full Gallery",
   "hero_cta_secondary": "Virtual Studio Tour",
   "timeline_title": "Artistic Journey",
   "featured_title": "Signature Works",
   "review_link_text": "Read Critical Review"
 }',
 '{
   "hero_title": "فيليب بولز",
   "hero_subtitle": "استكشاف ظاهرة الضوء والظل من خلال الواقعية التعبيرية",
   "hero_cta_primary": "استكشف المعرض الكامل",
   "hero_cta_secondary": "جولة افتراضية في الاستوديو",
   "timeline_title": "الرحلة الفنية",
   "featured_title": "الأعمال المميزة",
   "review_link_text": "اقرأ المراجعة النقدية"
 }',
 'Established Egyptian painter exploring the phenomenology of light and shadow through expressive realism.',
 'رسام مصري راسخ يستكشف ظاهرة الضوء والظل من خلال الواقعية التعبيرية.'),

('about', 'About the Artist', 'عن الفنان',
 '{
   "page_title": "About the Artist",
   "page_subtitle": "Philip Boles, born in 1972, is an established Egyptian painter whose work explores the intersection of traditional realism with contemporary conceptual frameworks.",
   "age_info": "Age 52 • Fine Arts ''96",
   "statement_title": "Artist Statement",
   "timeline_title": "Career Milestones"
 }',
 '{
   "page_title": "عن الفنان",
   "page_subtitle": "فيليب بولز، مواليد 1972، رسام مصري راسخ يستكشف عمله تقاطع الواقعية التقليدية مع الأطر المفاهيمية المعاصرة.",
   "age_info": "العمر 52 • الفنون الجميلة ''96",
   "statement_title": "بيان الفنان",
   "timeline_title": "معالم المسيرة المهنية"
 }',
 'Learn about Philip Boles, established Egyptian painter and his artistic journey.',
 'تعرف على فيليب بولز، الرسام المصري الراسخ ورحلته الفنية.'),

('gallery', 'Gallery', 'المعرض',
 '{
   "page_title": "Gallery",
   "filter_all": "All Works",
   "discover_text": "Discover Work",
   "inquire_button": "Inquire About This Work"
 }',
 '{
   "page_title": "المعرض",
   "filter_all": "جميع الأعمال",
   "discover_text": "استكشف العمل",
   "inquire_button": "الاستفسار عن هذا العمل"
 }',
 'Explore Philip Boles'' complete collection of paintings and artworks.',
 'استكشف مجموعة فيليب بولز الكاملة من اللوحات والأعمال الفنية.'),

('review', 'Critical Review', 'المراجعة النقدية',
 '{
   "page_title": "Critical Review",
   "page_subtitle": "An in-depth analysis of Philip Boles'' artistic practice and conceptual framework",
   "interview_title": "Artist Interview",
   "interview_subtitle": "Philip Boles discusses his Al-Faw''aliya concept"
 }',
 '{
   "page_title": "المراجعة النقدية",
   "page_subtitle": "تحليل متعمق للممارسة الفنية والإطار المفاهيمي لفيليب بولز",
   "interview_title": "مقابلة مع الفنان",
   "interview_subtitle": "فيليب بولز يناقش مفهومه للفواليا"
 }',
 'In-depth critical analysis of Philip Boles'' artistic practice and conceptual framework.',
 'تحليل نقدي متعمق للممارسة الفنية والإطار المفاهيمي لفيليب بولز.'),

('exhibitions', 'Exhibitions & News', 'المعارض والأخبار',
 '{
   "page_title": "Exhibitions & News",
   "page_subtitle": "Stay updated with Philip Boles'' latest exhibitions and artistic developments",
   "next_exhibition": "Next Exhibition",
   "archive_title": "Exhibition Archive",
   "partners_title": "Partner Galleries"
 }',
 '{
   "page_title": "المعارض والأخبار",
   "page_subtitle": "ابق على اطلاع بآخر معارض فيليب بولز والتطورات الفنية",
   "next_exhibition": "المعرض القادم",
   "archive_title": "أرشيف المعارض",
   "partners_title": "الشركاء من المعارض"
 }',
 'Latest exhibitions, news and updates from Philip Boles'' artistic career.',
 'آخر المعارض والأخبار والتحديثات من المسيرة الفنية لفيليب بولز.'),

('contact', 'Get in Touch', 'تواصل معنا',
 '{
   "page_title": "Get in Touch",
   "page_subtitle": "Connect with Philip Boles for inquiries about artwork, exhibitions, and collaborations",
   "contact_info_title": "Contact Information",
   "send_message_title": "Send a Message",
   "studio_location_title": "Studio Location",
   "newsletter_title": "Newsletter Signup"
 }',
 '{
   "page_title": "تواصل معنا",
   "page_subtitle": "تواصل مع فيليب بولز للاستفسارات حول الأعمال الفنية والمعارض والتعاون",
   "contact_info_title": "معلومات الاتصال",
   "send_message_title": "أرسل رسالة",
   "studio_location_title": "موقع الاستوديو",
   "newsletter_title": "اشترك في النشرة"
 }',
 'Contact Philip Boles for artwork inquiries, exhibitions, and collaborations.',
 'تواصل مع فيليب بولز للاستفسارات حول الأعمال الفنية والمعارض والتعاون.');

-- Insert default gallery settings
INSERT INTO gallery_settings (name, value_en, value_ar, description) VALUES
('gallery_intro_text', 'Explore the complete collection of Philip Boles'' paintings, organized by artistic series and themes.', 'استكشف المجموعة الكاملة من لوحات فيليب بولز، منظمة حسب السلاسل والموضوعات الفنية.', 'Introduction text shown on gallery page'),
('featured_works_count', '6', '6', 'Number of featured works to display on homepage'),
('gallery_layout', 'grid', 'grid', 'Gallery display layout (grid, masonry, list)'),
('show_artwork_details', 'true', 'true', 'Whether to show detailed artwork information in modals'),
('enable_artwork_inquiry', 'true', 'true', 'Whether to show inquiry buttons on artworks'),
('gallery_sort_order', 'display_order', 'display_order', 'Default sort order for gallery (display_order, year, title)'),
('show_collection_filters', 'true', 'true', 'Whether to show collection filter buttons'),
('artwork_modal_style', 'detailed', 'detailed', 'Style of artwork detail modal (simple, detailed, fullscreen)');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS pages_slug_idx ON pages(slug);
CREATE INDEX IF NOT EXISTS pages_published_idx ON pages(is_published);
CREATE INDEX IF NOT EXISTS gallery_settings_name_idx ON gallery_settings(name);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_pages_updated_at') THEN
        CREATE TRIGGER update_pages_updated_at
            BEFORE UPDATE ON pages
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_gallery_settings_updated_at') THEN
        CREATE TRIGGER update_gallery_settings_updated_at
            BEFORE UPDATE ON gallery_settings
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;