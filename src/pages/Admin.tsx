import React, { useState, useEffect } from 'react';
import { paintingService, Painting, PaintingInsert, checkSupabaseConnection } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import SupabaseSetup from '../components/SupabaseSetup';

const Admin: React.FC = () => {
  const { language } = useLanguage();
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [supabaseReady, setSupabaseReady] = useState(false);
  const [formData, setFormData] = useState<PaintingInsert>({
    title: '',
    year: new Date().getFullYear().toString(),
    medium: '',
    dimensions: '',
    collection: 'Al-Faw\'aliya',
    theme: 'Abstract',
    description: '',
    image_url: '',
    is_featured: false,
    display_order: 0
  });

  useEffect(() => {
    checkConnection();
  }, []);

  useEffect(() => {
    if (supabaseReady) {
      loadPaintings();
    }
  }, [supabaseReady]);

  const checkConnection = async () => {
    try {
      const isConnected = await checkSupabaseConnection();
      if (isConnected) {
        setSupabaseReady(true);
      } else {
        setSupabaseReady(false);
      }
    } catch (error) {
      console.log('Supabase not ready:', error);
      setSupabaseReady(false);
    }
  };

  const loadPaintings = async () => {
    try {
      const data = await paintingService.getAll();
      setPaintings(data || []);
    } catch (error) {
      console.error('Error loading paintings:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await paintingService.update(editingId, formData);
        alert(language === 'ar' ? 'تم تحديث اللوحة بنجاح' : 'Painting updated successfully');
      } else {
        await paintingService.create(formData);
        alert(language === 'ar' ? 'تم إضافة اللوحة بنجاح' : 'Painting added successfully');
      }
      
      resetForm();
      loadPaintings();
    } catch (error) {
      console.error('Error saving painting:', error);
      alert(language === 'ar' ? 'حدث خطأ في الحفظ' : 'Error saving painting');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (painting: Painting) => {
    setFormData({
      title: painting.title,
      title_ar: painting.title_ar,
      year: painting.year,
      medium: painting.medium,
      medium_ar: painting.medium_ar,
      dimensions: painting.dimensions,
      collection: painting.collection,
      collection_ar: painting.collection_ar,
      theme: painting.theme,
      description: painting.description,
      description_ar: painting.description_ar,
      image_url: painting.image_url,
      is_featured: painting.is_featured,
      display_order: painting.display_order
    });
    setEditingId(painting.id);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذه اللوحة؟' : 'Are you sure you want to delete this painting?')) {
      try {
        await paintingService.delete(id);
        alert(language === 'ar' ? 'تم حذف اللوحة بنجاح' : 'Painting deleted successfully');
        loadPaintings();
      } catch (error) {
        console.error('Error deleting painting:', error);
        alert(language === 'ar' ? 'حدث خطأ في الحذف' : 'Error deleting painting');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      year: new Date().getFullYear().toString(),
      medium: '',
      dimensions: '',
      collection: 'Al-Faw\'aliya',
      theme: 'Abstract',
      description: '',
      image_url: '',
      is_featured: false,
      display_order: 0
    });
    setEditingId(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              name === 'display_order' ? Number(value) : 
              value
    }));
  };

  if (!supabaseReady) {
    return (
      <div className="pt-16 min-h-screen bg-primary-900">
        <div className="container mx-auto px-4 py-8">
          <SupabaseSetup onComplete={() => setSupabaseReady(true)} />
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-primary-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-neutral-100 mb-8">
          {language === 'ar' ? 'لوحة التحكم' : 'Admin Panel'}
        </h1>

        {/* Add/Edit Form */}
        <div className="bg-primary-800 rounded-lg border border-primary-600 p-6 mb-8">
          <h2 className="text-xl font-semibold text-neutral-100 mb-4 flex items-center">
            <PlusIcon className="w-5 h-5 mr-2" />
            {editingId ? 
              (language === 'ar' ? 'تعديل اللوحة' : 'Edit Painting') : 
              (language === 'ar' ? 'إضافة لوحة جديدة' : 'Add New Painting')
            }
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                {language === 'ar' ? 'العنوان' : 'Title'}
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-primary-700 border border-primary-600 rounded-md text-neutral-100 focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                {language === 'ar' ? 'العنوان بالعربية' : 'Title (Arabic)'}
              </label>
              <input
                type="text"
                name="title_ar"
                value={formData.title_ar || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-primary-700 border border-primary-600 rounded-md text-neutral-100 focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                {language === 'ar' ? 'السنة' : 'Year'}
              </label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-primary-700 border border-primary-600 rounded-md text-neutral-100 focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                {language === 'ar' ? 'الوسط' : 'Medium'}
              </label>
              <input
                type="text"
                name="medium"
                value={formData.medium}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-primary-700 border border-primary-600 rounded-md text-neutral-100 focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                {language === 'ar' ? 'الأبعاد' : 'Dimensions'}
              </label>
              <input
                type="text"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-primary-700 border border-primary-600 rounded-md text-neutral-100 focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                {language === 'ar' ? 'المجموعة' : 'Collection'}
              </label>
              <select
                name="collection"
                value={formData.collection}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-primary-700 border border-primary-600 rounded-md text-neutral-100 focus:outline-none focus:ring-2 focus:ring-accent-500"
              >
                <option value="Al-Faw'aliya">Al-Faw'aliya</option>
                <option value="Phenomenology">Phenomenology</option>
                <option value="Philological Layers">Philological Layers</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                {language === 'ar' ? 'الموضوع' : 'Theme'}
              </label>
              <select
                name="theme"
                value={formData.theme}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-primary-700 border border-primary-600 rounded-md text-neutral-100 focus:outline-none focus:ring-2 focus:ring-accent-500"
              >
                <option value="Abstract">Abstract</option>
                <option value="Portrait">Portrait</option>
                <option value="Landscape">Landscape</option>
                <option value="Urban">Urban</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                {language === 'ar' ? 'رابط الصورة' : 'Image URL'}
              </label>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                required
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 bg-primary-700 border border-primary-600 rounded-md text-neutral-100 focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                {language === 'ar' ? 'ترتيب العرض' : 'Display Order'}
              </label>
              <input
                type="number"
                name="display_order"
                value={formData.display_order}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-primary-700 border border-primary-600 rounded-md text-neutral-100 focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                {language === 'ar' ? 'الوصف' : 'Description'}
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 bg-primary-700 border border-primary-600 rounded-md text-neutral-100 focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleInputChange}
                  className="rounded border-primary-600 text-accent-600 focus:ring-accent-500"
                />
                <span className="text-sm font-medium text-neutral-300">
                  {language === 'ar' ? 'عمل مميز' : 'Featured Work'}
                </span>
              </label>
            </div>

            <div className="md:col-span-2 flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center px-4 py-2 bg-accent-600 text-white rounded-md hover:bg-accent-700 disabled:opacity-50"
              >
                {loading ? 
                  (language === 'ar' ? 'جاري الحفظ...' : 'Saving...') : 
                  (editingId ? 
                    (language === 'ar' ? 'تحديث' : 'Update') : 
                    (language === 'ar' ? 'حفظ' : 'Save')
                  )
                }
              </button>
              
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex items-center px-4 py-2 bg-neutral-600 text-white rounded-md hover:bg-neutral-700"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Paintings List */}
        <div className="bg-primary-800 rounded-lg border border-primary-600 p-6">
          <h2 className="text-xl font-semibold text-neutral-100 mb-4">
            {language === 'ar' ? 'اللوحات المحفوظة' : 'Saved Paintings'}
          </h2>

          {paintings.length === 0 ? (
            <p className="text-neutral-400 text-center py-8">
              {language === 'ar' ? 'لا توجد لوحات محفوظة' : 'No paintings saved yet'}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paintings.map((painting) => (
                <div key={painting.id} className="bg-primary-700 border border-primary-600 rounded-lg p-4">
                  <img
                    src={painting.image_url}
                    alt={painting.title}
                    className="w-full h-48 object-cover rounded-md mb-3"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=400';
                    }}
                  />
                  <h3 className="font-semibold text-lg text-neutral-100">{painting.title}</h3>
                  <p className="text-neutral-300">{painting.collection}</p>
                  <p className="text-sm text-neutral-400">{painting.year}</p>
                  {painting.is_featured && (
                    <span className="inline-block bg-accent-600 text-white text-xs px-2 py-1 rounded mt-1">
                      {language === 'ar' ? 'مميز' : 'Featured'}
                    </span>
                  )}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleEdit(painting)}
                      className="flex items-center px-3 py-1 bg-accent-600 text-white rounded text-sm hover:bg-accent-700"
                    >
                      <PencilIcon className="w-3 h-3 mr-1" />
                      {language === 'ar' ? 'تعديل' : 'Edit'}
                    </button>
                    <button
                      onClick={() => handleDelete(painting.id)}
                      className="flex items-center px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                    >
                      <TrashIcon className="w-3 h-3 mr-1" />
                      {language === 'ar' ? 'حذف' : 'Delete'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;