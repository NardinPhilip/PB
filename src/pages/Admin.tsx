import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  paintingService, 
  Painting, 
  PaintingInsert,
  pageService,
  PageContent,
  PageContentInsert,
  gallerySettingsService,
  GallerySetting,
  GallerySettingInsert
} from '../lib/supabase';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  PhotoIcon,
  XMarkIcon,
  CheckIcon,
  DocumentTextIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const Admin: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'paintings' | 'pages' | 'settings'>('paintings');
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [pages, setPages] = useState<PageContent[]>([]);
  const [settings, setSettings] = useState<GallerySetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPainting, setEditingPainting] = useState<Painting | null>(null);
  const [editingPage, setEditingPage] = useState<PageContent | null>(null);
  const [editingSetting, setEditingSetting] = useState<GallerySetting | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<PaintingInsert>({
    title: '',
    title_ar: '',
    year: '',
    medium: '',
    medium_ar: '',
    dimensions: '',
    collection: '',
    collection_ar: '',
    theme: '',
    image_url: '',
    description: '',
    description_ar: '',
    is_featured: false,
    display_order: 0
  });

  const [pageFormData, setPageFormData] = useState<PageContentInsert>({
    slug: '',
    title_en: '',
    title_ar: '',
    content_en: {},
    content_ar: {},
    meta_description_en: '',
    meta_description_ar: '',
    is_published: true
  });

  const [settingFormData, setSettingFormData] = useState<GallerySettingInsert>({
    name: '',
    value_en: '',
    value_ar: '',
    description: ''
  });

  const collections = [
    { en: 'Al-Faw\'aliya', ar: 'الفواليا' },
    { en: 'Phenomenology', ar: 'الظاهرة' },
    { en: 'Philological Layers', ar: 'الطبقات الفيلولوجية' }
  ];

  const themes = ['Urban', 'Landscape', 'Portrait', 'Abstract'];

  const tabs = [
    { key: 'paintings', label: 'Paintings', icon: PhotoIcon },
    { key: 'pages', label: 'Pages', icon: DocumentTextIcon },
    { key: 'settings', label: 'Settings', icon: CogIcon }
  ];

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'paintings') {
        await loadPaintings();
      } else if (activeTab === 'pages') {
        await loadPages();
      } else if (activeTab === 'settings') {
        await loadSettings();
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadPaintings = async () => {
    try {
      const data = await paintingService.getAll();
      setPaintings(data);
    } catch (error) {
      console.error('Error loading paintings:', error);
    }
  };

  const loadPages = async () => {
    try {
      const data = await pageService.getAll();
      setPages(data);
    } catch (error) {
      console.error('Error loading pages:', error);
    }
  };

  const loadSettings = async () => {
    try {
      const data = await gallerySettingsService.getAll();
      setSettings(data);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      if (editingPainting) {
        await paintingService.update(editingPainting.id, formData);
      } else {
        await paintingService.create(formData);
      }
      
      await loadPaintings();
      resetForm();
    } catch (error) {
      console.error('Error saving painting:', error);
      alert('Error saving painting. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handlePageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      if (editingPage) {
        await pageService.update(editingPage.id, pageFormData);
      } else {
        await pageService.create(pageFormData);
      }
      
      await loadPages();
      resetPageForm();
    } catch (error) {
      console.error('Error saving page:', error);
      alert('Error saving page. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSettingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      if (editingSetting) {
        await gallerySettingsService.update(editingSetting.id, settingFormData);
      } else {
        await gallerySettingsService.create(settingFormData);
      }
      
      await loadSettings();
      resetSettingForm();
    } catch (error) {
      console.error('Error saving setting:', error);
      alert('Error saving setting. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // For now, we'll use a placeholder URL since Supabase storage might not be configured
      // In production, you would implement proper image upload to Supabase Storage
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          // Create a temporary URL for the uploaded image
          const imageUrl = event.target.result as string;
          setFormData({ ...formData, image_url: imageUrl });
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (painting: Painting) => {
    setEditingPainting(painting);
    setFormData({
      title: painting.title,
      title_ar: painting.title_ar || '',
      year: painting.year,
      medium: painting.medium,
      medium_ar: painting.medium_ar || '',
      dimensions: painting.dimensions,
      collection: painting.collection,
      collection_ar: painting.collection_ar || '',
      theme: painting.theme,
      image_url: painting.image_url,
      description: painting.description,
      description_ar: painting.description_ar || '',
      is_featured: painting.is_featured,
      display_order: painting.display_order
    });
    setShowForm(true);
  };

  const handleEditPage = (page: PageContent) => {
    setEditingPage(page);
    setPageFormData({
      slug: page.slug,
      title_en: page.title_en,
      title_ar: page.title_ar || '',
      content_en: page.content_en,
      content_ar: page.content_ar || {},
      meta_description_en: page.meta_description_en || '',
      meta_description_ar: page.meta_description_ar || '',
      is_published: page.is_published
    });
    setShowForm(true);
  };

  const handleEditSetting = (setting: GallerySetting) => {
    setEditingSetting(setting);
    setSettingFormData({
      name: setting.name,
      value_en: setting.value_en,
      value_ar: setting.value_ar || '',
      description: setting.description || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this painting?')) return;

    try {
      await paintingService.delete(id);
      await loadPaintings();
    } catch (error) {
      console.error('Error deleting painting:', error);
      alert('Error deleting painting. Please try again.');
    }
  };

  const handleDeletePage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return;

    try {
      await pageService.delete(id);
      await loadPages();
    } catch (error) {
      console.error('Error deleting page:', error);
      alert('Error deleting page. Please try again.');
    }
  };

  const handleDeleteSetting = async (id: string) => {
    if (!confirm('Are you sure you want to delete this setting?')) return;

    try {
      await gallerySettingsService.delete(id);
      await loadSettings();
    } catch (error) {
      console.error('Error deleting setting:', error);
      alert('Error deleting setting. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      title_ar: '',
      year: '',
      medium: '',
      medium_ar: '',
      dimensions: '',
      collection: '',
      collection_ar: '',
      theme: '',
      image_url: '',
      description: '',
      description_ar: '',
      is_featured: false,
      display_order: 0
    });
    setEditingPainting(null);
    setShowForm(false);
  };

  const resetPageForm = () => {
    setPageFormData({
      slug: '',
      title_en: '',
      title_ar: '',
      content_en: {},
      content_ar: {},
      meta_description_en: '',
      meta_description_ar: '',
      is_published: true
    });
    setEditingPage(null);
    setShowForm(false);
  };

  const resetSettingForm = () => {
    setSettingFormData({
      name: '',
      value_en: '',
      value_ar: '',
      description: ''
    });
    setEditingSetting(null);
    setShowForm(false);
  };

  const resetAllForms = () => {
    resetForm();
    resetPageForm();
    resetSettingForm();
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-primary-900 flex items-center justify-center">
        <div className="text-neutral-100">Loading...</div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-primary-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif text-neutral-100 mb-8">
          {language === 'en' ? 'Admin Panel' : 'لوحة الإدارة'}
        </h1>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-primary-800 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key as any);
                resetAllForms();
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-accent-600 text-white'
                  : 'text-neutral-300 hover:text-neutral-100 hover:bg-primary-700'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Add Button */}
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setShowForm(true)}
            className="bg-accent-600 hover:bg-accent-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>
              {activeTab === 'paintings' && (language === 'en' ? 'Add Painting' : 'إضافة لوحة')}
              {activeTab === 'pages' && (language === 'en' ? 'Add Page' : 'إضافة صفحة')}
              {activeTab === 'settings' && (language === 'en' ? 'Add Setting' : 'إضافة إعداد')}
            </span>
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'paintings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paintings.map((painting) => (
              <motion.div
                key={painting.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-primary-800 rounded-lg overflow-hidden border border-primary-600"
              >
                <div className="aspect-[3/4] relative">
                  <img
                    src={painting.image_url}
                    alt={painting.title}
                    className="w-full h-full object-cover"
                  />
                  {painting.is_featured && (
                    <div className="absolute top-2 right-2 bg-accent-600 text-white px-2 py-1 rounded text-xs">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-serif text-neutral-100 mb-2">{painting.title}</h3>
                  <p className="text-sm text-neutral-400 mb-4">
                    {painting.year} • {painting.collection}
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(painting)}
                      className="bg-primary-600 hover:bg-primary-500 text-white px-3 py-2 rounded text-sm flex items-center space-x-1"
                    >
                      <PencilIcon className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(painting.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm flex items-center space-x-1"
                    >
                      <TrashIcon className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'pages' && (
          <div className="space-y-4">
            {pages.map((page) => (
              <motion.div
                key={page.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-primary-800 rounded-lg p-6 border border-primary-600"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-serif text-neutral-100">{page.title_en}</h3>
                      <span className="text-xs bg-primary-600 text-white px-2 py-1 rounded">
                        /{page.slug}
                      </span>
                      {!page.is_published && (
                        <span className="text-xs bg-red-600 text-white px-2 py-1 rounded">
                          Draft
                        </span>
                      )}
                    </div>
                    {page.title_ar && (
                      <p className="text-neutral-400 mb-2">{page.title_ar}</p>
                    )}
                    <p className="text-sm text-neutral-500">
                      Last updated: {new Date(page.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditPage(page)}
                      className="bg-primary-600 hover:bg-primary-500 text-white px-3 py-2 rounded text-sm flex items-center space-x-1"
                    >
                      <PencilIcon className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeletePage(page.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm flex items-center space-x-1"
                    >
                      <TrashIcon className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-4">
            {settings.map((setting) => (
              <motion.div
                key={setting.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-primary-800 rounded-lg p-6 border border-primary-600"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-neutral-100 mb-2">{setting.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                      <div>
                        <span className="text-xs text-neutral-500">English:</span>
                        <p className="text-neutral-300">{setting.value_en}</p>
                      </div>
                      {setting.value_ar && (
                        <div>
                          <span className="text-xs text-neutral-500">Arabic:</span>
                          <p className="text-neutral-300">{setting.value_ar}</p>
                        </div>
                      )}
                    </div>
                    {setting.description && (
                      <p className="text-sm text-neutral-500">{setting.description}</p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditSetting(setting)}
                      className="bg-primary-600 hover:bg-primary-500 text-white px-3 py-2 rounded text-sm flex items-center space-x-1"
                    >
                      <PencilIcon className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteSetting(setting.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm flex items-center space-x-1"
                    >
                      <TrashIcon className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Form Modals */}
        {showForm && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-primary-900 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-neutral-100">
                  {activeTab === 'paintings' && (editingPainting ? 'Edit Painting' : 'Add New Painting')}
                  {activeTab === 'pages' && (editingPage ? 'Edit Page' : 'Add New Page')}
                  {activeTab === 'settings' && (editingSetting ? 'Edit Setting' : 'Add New Setting')}
                </h2>
                <button
                  onClick={resetAllForms}
                  className="text-neutral-400 hover:text-neutral-200"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Painting Form */}
              {activeTab === 'paintings' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Title (English)
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Title (Arabic)
                    </label>
                    <input
                      type="text"
                      value={formData.title_ar}
                      onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
                      className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Year
                    </label>
                    <input
                      type="text"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      required
                      className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Dimensions
                    </label>
                    <input
                      type="text"
                      value={formData.dimensions}
                      onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                      required
                      className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Medium (English)
                    </label>
                    <input
                      type="text"
                      value={formData.medium}
                      onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
                      required
                      className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Medium (Arabic)
                    </label>
                    <input
                      type="text"
                      value={formData.medium_ar}
                      onChange={(e) => setFormData({ ...formData, medium_ar: e.target.value })}
                      className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Collection
                    </label>
                    <select
                      value={formData.collection}
                      onChange={(e) => setFormData({ ...formData, collection: e.target.value })}
                      required
                      className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400"
                    >
                      <option value="">Select Collection</option>
                      {collections.map((collection) => (
                        <option key={collection.en} value={collection.en}>
                          {collection.en}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Theme
                    </label>
                    <select
                      value={formData.theme}
                      onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                      required
                      className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400"
                    >
                      <option value="">Select Theme</option>
                      {themes.map((theme) => (
                        <option key={theme} value={theme}>
                          {theme}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Image Upload
                  </label>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="bg-primary-600 hover:bg-primary-500 disabled:bg-primary-700 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center space-x-2 transition-colors"
                    >
                      <PhotoIcon className="w-5 h-5" />
                      <span>{uploading ? 'Uploading...' : 'Choose Image'}</span>
                    </label>
                    {formData.image_url && (
                      <div className="flex items-center space-x-2 text-green-400">
                        <CheckIcon className="w-5 h-5" />
                        <span>Image uploaded</span>
                      </div>
                    )}
                    </div>
                    {formData.image_url && (
                      <div className="mt-4">
                        <img 
                          src={formData.image_url} 
                          alt="Preview" 
                          className="w-32 h-40 object-cover rounded-lg border border-primary-600"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Description (English)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={3}
                    className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Description (Arabic)
                  </label>
                  <textarea
                    value={formData.description_ar}
                    onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                    rows={3}
                    className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.is_featured}
                        onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                        className="rounded"
                      />
                      <span className="text-sm text-neutral-300">Featured Painting</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={formData.display_order}
                      onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                      className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400"
                    />
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    disabled={uploading}
                    className="flex-1 bg-accent-600 hover:bg-accent-700 disabled:bg-accent-800 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    {uploading ? 'Saving...' : editingPainting ? 'Update Painting' : 'Add Painting'}
                  </button>
                  <button
                    type="button"
                    onClick={resetAllForms}
                    className="px-6 py-3 border border-primary-600 text-neutral-300 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
              )}

              {/* Page Form */}
              {activeTab === 'pages' && (
                <form onSubmit={handlePageSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">
                        Page Slug
                      </label>
                      <input
                        type="text"
                        value={pageFormData.slug}
                        onChange={(e) => setPageFormData({ ...pageFormData, slug: e.target.value })}
                        required
                        className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400"
                        placeholder="e.g., home, about, gallery"
                      />
                    </div>
                    <div>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={pageFormData.is_published}
                          onChange={(e) => setPageFormData({ ...pageFormData, is_published: e.target.checked })}
                          className="rounded"
                        />
                        <span className="text-sm text-neutral-300">Published</span>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">
                        Title (English)
                      </label>
                      <input
                        type="text"
                        value={pageFormData.title_en}
                        onChange={(e) => setPageFormData({ ...pageFormData, title_en: e.target.value })}
                        required
                        className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">
                        Title (Arabic)
                      </label>
                      <input
                        type="text"
                        value={pageFormData.title_ar}
                        onChange={(e) => setPageFormData({ ...pageFormData, title_ar: e.target.value })}
                        className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Content (English) - JSON Format
                    </label>
                    <textarea
                      value={JSON.stringify(pageFormData.content_en, null, 2)}
                      onChange={(e) => {
                        try {
                          const parsed = JSON.parse(e.target.value);
                          setPageFormData({ ...pageFormData, content_en: parsed });
                        } catch (error) {
                          // Invalid JSON, don't update
                        }
                      }}
                      required
                      rows={8}
                      className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400 resize-none font-mono text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Content (Arabic) - JSON Format
                    </label>
                    <textarea
                      value={JSON.stringify(pageFormData.content_ar, null, 2)}
                      onChange={(e) => {
                        try {
                          const parsed = JSON.parse(e.target.value);
                          setPageFormData({ ...pageFormData, content_ar: parsed });
                        } catch (error) {
                          // Invalid JSON, don't update
                        }
                      }}
                      rows={8}
                      className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400 resize-none font-mono text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">
                        Meta Description (English)
                      </label>
                      <textarea
                        value={pageFormData.meta_description_en}
                        onChange={(e) => setPageFormData({ ...pageFormData, meta_description_en: e.target.value })}
                        rows={3}
                        className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400 resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">
                        Meta Description (Arabic)
                      </label>
                      <textarea
                        value={pageFormData.meta_description_ar}
                        onChange={(e) => setPageFormData({ ...pageFormData, meta_description_ar: e.target.value })}
                        rows={3}
                        className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400 resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      type="submit"
                      disabled={uploading}
                      className="flex-1 bg-accent-600 hover:bg-accent-700 disabled:bg-accent-800 text-white py-3 rounded-lg font-medium transition-colors"
                    >
                      {uploading ? 'Saving...' : editingPage ? 'Update Page' : 'Add Page'}
                    </button>
                    <button
                      type="button"
                      onClick={resetAllForms}
                      className="px-6 py-3 border border-primary-600 text-neutral-300 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Setting Form */}
              {activeTab === 'settings' && (
                <form onSubmit={handleSettingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Setting Name
                    </label>
                    <input
                      type="text"
                      value={settingFormData.name}
                      onChange={(e) => setSettingFormData({ ...settingFormData, name: e.target.value })}
                      required
                      className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400"
                      placeholder="e.g., gallery_intro_text"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">
                        Value (English)
                      </label>
                      <textarea
                        value={settingFormData.value_en}
                        onChange={(e) => setSettingFormData({ ...settingFormData, value_en: e.target.value })}
                        required
                        rows={4}
                        className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400 resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">
                        Value (Arabic)
                      </label>
                      <textarea
                        value={settingFormData.value_ar}
                        onChange={(e) => setSettingFormData({ ...settingFormData, value_ar: e.target.value })}
                        rows={4}
                        className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400 resize-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      value={settingFormData.description}
                      onChange={(e) => setSettingFormData({ ...settingFormData, description: e.target.value })}
                      className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:border-accent-400"
                      placeholder="What this setting controls"
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      type="submit"
                      disabled={uploading}
                      className="flex-1 bg-accent-600 hover:bg-accent-700 disabled:bg-accent-800 text-white py-3 rounded-lg font-medium transition-colors"
                    >
                      {uploading ? 'Saving...' : editingSetting ? 'Update Setting' : 'Add Setting'}
                    </button>
                    <button
                      type="button"
                      onClick={resetAllForms}
                      className="px-6 py-3 border border-primary-600 text-neutral-300 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;