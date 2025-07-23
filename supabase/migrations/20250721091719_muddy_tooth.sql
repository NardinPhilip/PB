/*
  # Create paintings table

  1. New Tables
    - `paintings`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `title_ar` (text, optional - Arabic title)
      - `year` (text, required)
      - `medium` (text, required)
      - `medium_ar` (text, optional - Arabic medium)
      - `dimensions` (text, required)
      - `collection` (text, required)
      - `collection_ar` (text, optional - Arabic collection)
      - `theme` (text, required)
      - `image_url` (text, required)
      - `description` (text, required)
      - `description_ar` (text, optional - Arabic description)
      - `is_featured` (boolean, default false)
      - `display_order` (integer, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `paintings` table
    - Add policy for public read access
    - Add policy for authenticated admin users to manage paintings
*/

CREATE TABLE IF NOT EXISTS paintings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  title_ar text,
  year text NOT NULL,
  medium text NOT NULL,
  medium_ar text,
  dimensions text NOT NULL,
  collection text NOT NULL,
  collection_ar text,
  theme text NOT NULL,
  image_url text NOT NULL,
  description text NOT NULL,
  description_ar text,
  is_featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE paintings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to paintings
CREATE POLICY "Anyone can view paintings"
  ON paintings
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to manage paintings (admin functionality)
CREATE POLICY "Authenticated users can manage paintings"
  ON paintings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create an index for better performance
CREATE INDEX IF NOT EXISTS paintings_collection_idx ON paintings(collection);
CREATE INDEX IF NOT EXISTS paintings_theme_idx ON paintings(theme);
CREATE INDEX IF NOT EXISTS paintings_featured_idx ON paintings(is_featured);
CREATE INDEX IF NOT EXISTS paintings_display_order_idx ON paintings(display_order);

-- Insert sample data
INSERT INTO paintings (title, title_ar, year, medium, medium_ar, dimensions, collection, collection_ar, theme, image_url, description, description_ar, is_featured, display_order) VALUES
('The Chair', 'الكرسي', 'Apr 2023', 'Acrylic on canvas', 'أكريليك على قماش', '130 × 100 cm', 'Al-Faw''aliya', 'الفواليا', 'Urban', '/images/1.jpg', 'An exploration of urban consciousness through the interplay of light and architectural forms.', 'استكشاف للوعي الحضري من خلال تفاعل الضوء والأشكال المعمارية.', true, 1),
('Desert Contemplation', 'تأمل الصحراء', '2018', 'Acrylic on Canvas', 'أكريليك على قماش', '100 x 80 cm', 'Phenomenology', 'الظاهرة', 'Landscape', '/images/2.jpg', 'A meditation on solitude and the vastness of the Egyptian landscape.', 'تأمل في العزلة وشساعة المناظر الطبيعية المصرية.', true, 2),
('Urban Phenomenology', 'الظاهرة الحضرية', '2021', 'Mixed Media', 'وسائط مختلطة', '150 x 100 cm', 'Al-Faw''aliya', 'الفواليا', 'Urban', '/images/3.jpg', 'Contemporary urban life filtered through the lens of phenomenological investigation.', 'الحياة الحضرية المعاصرة مُرشحة من خلال عدسة التحقيق الظاهري.', true, 3),
('Memory Palace', 'قصر الذاكرة', '2019', 'Oil on Canvas', 'زيت على قماش', '110 x 85 cm', 'Philological Layers', 'الطبقات الفيلولوجية', 'Abstract', '/images/4.jpg', 'An archaeological excavation of personal and collective memory through visual metaphor.', 'حفريات أثرية للذاكرة الشخصية والجماعية من خلال الاستعارة البصرية.', false, 4),
('Light Studies III', 'دراسات الضوء الثالثة', '2022', 'Watercolor', 'ألوان مائية', '70 x 50 cm', 'Phenomenology', 'الظاهرة', 'Portrait', '/images/5.jpg', 'A study in the phenomenology of light as it reveals and conceals human emotion.', 'دراسة في ظاهرة الضوء وهو يكشف ويخفي المشاعر الإنسانية.', false, 5),
('Cultural Sediments', 'الرواسب الثقافية', '2017', 'Mixed Media', 'وسائط مختلطة', '130 x 95 cm', 'Philological Layers', 'الطبقات الفيلولوجية', 'Abstract', '/images/6.jpg', 'Layers of cultural meaning embedded in the visual substrate of contemporary experience.', 'طبقات من المعنى الثقافي مدمجة في الركيزة البصرية للتجربة المعاصرة.', false, 6),
('Shadows of Time', 'ظلال الزمن', '2020', 'Oil on Canvas', 'زيت على قماش', '120 x 90 cm', 'Phenomenology', 'الظاهرة', 'Abstract', '/images/7.jpg', 'Temporal layers intersecting with consciousness in the phenomenological present.', 'طبقات زمنية تتقاطع مع الوعي في الحاضر الظاهري.', false, 7),
('Urban Meditation', 'التأمل الحضري', '2023', 'Acrylic on Canvas', 'أكريليك على قماش', '140 x 110 cm', 'Al-Faw''aliya', 'الفواليا', 'Urban', '/images/8.jpg', 'The intersection of contemplative practice with urban architectural consciousness.', 'تقاطع الممارسة التأملية مع الوعي المعماري الحضري.', false, 8);