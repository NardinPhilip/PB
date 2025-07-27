import React, { useState, useEffect } from 'react';
import { supabase, paintingService } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import SupabaseSetup from '../components/SupabaseSetup';

interface Painting {
  id?: number;
  title: string;
  artist: string;
  year: number;
  medium: string;
  dimensions: string;
  description: string;
  image_url: string;
  price?: number;
  category: string;
  created_at?: string;
}

const Admin: React.FC = () => {
  const { language } = useLanguage();
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [supabaseReady, setSupabaseReady] = useState(false);
  const [formData, setFormData] = useState<Painting>({
    title: '',
    artist: '',
    year: new Date().getFullYear(),
    medium: '',
    dimensions: '',
    description: '',
    image_url: '',
    price: 0,
    category: 'painting'
  });

  useEffect(() => {
    checkSupabaseConnection();
  }, []);

  useEffect(() => {
    if (supabaseReady) {
      loadPaintings();
    }
  }, [supabaseReady]);

  const checkSupabaseConnection = async () => {
    try {
      const { data, error } = await supabase.from('paintings').select('count').limit(1);
      if (!error) {
        setSupabaseReady(true);
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
    setFormData(painting);
    setEditingId(painting.id || null);
  };

  const handleDelete = async (id: number) => {
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
      artist: '',
      year: new Date().getFullYear(),
      medium: '',
      dimensions: '',
      description: '',
      image_url: '',
      price: 0,
      category: 'painting'
    });
    setEditingId(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'price' ? Number(value) : value
    }));
  };

  if (!supabaseReady) {
    return <SupabaseSetup onReady={() => setSupabaseReady(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {language === 'ar' ? 'لوحة التحكم' : 'Admin Panel'}
        </h1>

        {/* Add/Edit Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            {editingId ? 
              (language === 'ar' ? 'تعديل اللوحة' : 'Edit Painting') : 
              (language === 'ar' ? 'إضافة لوحة جديدة' : 'Add New Painting')
            }
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'ar' ? 'العنوان' : 'Title'}
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'ar' ? 'الفنان' : 'Artist'}
              </label>
              <input
                type="text"
                name="artist"
                value={formData.artist}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'ar' ? 'السنة' : 'Year'}
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'ar' ? 'الوسط' : 'Medium'}
              </label>
              <input
                type="text"
                name="medium"
                value={formData.medium}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'ar' ? 'الأبعاد' : 'Dimensions'}
              </label>
              <input
                type="text"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'ar' ? 'السعر' : 'Price'}
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'ar' ? 'الفئة' : 'Category'}
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="painting">Painting</option>
                <option value="sculpture">Sculpture</option>
                <option value="photography">Photography</option>
                <option value="digital">Digital Art</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'ar' ? 'رابط الصورة' : 'Image URL'}
              </label>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                required
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'ar' ? 'الوصف' : 'Description'}
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2 flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                <Save className="w-4 h-4 mr-2" />
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
                  className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  <X className="w-4 h-4 mr-2" />
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Paintings List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            {language === 'ar' ? 'اللوحات المحفوظة' : 'Saved Paintings'}
          </h2>

          {paintings.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              {language === 'ar' ? 'لا توجد لوحات محفوظة' : 'No paintings saved yet'}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paintings.map((painting) => (
                <div key={painting.id} className="border rounded-lg p-4">
                  <img
                    src={painting.image_url}
                    alt={painting.title}
                    className="w-full h-48 object-cover rounded-md mb-3"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=400';
                    }}
                  />
                  <h3 className="font-semibold text-lg">{painting.title}</h3>
                  <p className="text-gray-600">{painting.artist}</p>
                  <p className="text-sm text-gray-500">{painting.year}</p>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleEdit(painting)}
                      className="flex items-center px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      {language === 'ar' ? 'تعديل' : 'Edit'}
                    </button>
                    <button
                      onClick={() => painting.id && handleDelete(painting.id)}
                      className="flex items-center px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
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