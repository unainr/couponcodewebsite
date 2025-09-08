"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Loader2, Upload, X } from "lucide-react";
import Link from "next/link";
import slugify from "slugify";
import MarkdownEditor from "@/components/dashboard/MarkdownEditor";
import toast, { Toaster } from 'react-hot-toast';

interface ReferenceOption {
  _id: string;
  name: string;
  slug?: string;
}

export default function AddStorePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  
  // Reference options
  const [categories, setCategories] = useState<ReferenceOption[]>([]);
  const [countries, setCountries] = useState<ReferenceOption[]>([]);

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    homeurl: "",
    affiliate: "",
    metatitle: "",
    metadescription: "",
    metakeywords: "",
    country: "",
    category: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  // Load reference data
  useEffect(() => {
    const loadReferenceData = async () => {
      setLoading(true);
      try {
        const [categoriesRes, countriesRes] = await Promise.all([
          fetch("/api/dashboard/references/category"),
          fetch("/api/dashboard/references/country"),
        ]);

        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          setCategories(categoriesData.data || []);
        }

        if (countriesRes.ok) {
          const countriesData = await countriesRes.json();
          setCountries(countriesData.data || []);
        }
      } catch (error) {
        console.error("Error loading reference data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadReferenceData();
  }, []);

  // Auto-generate slug from name using slugify
  useEffect(() => {
    if (formData.name) {
      const slug = slugify(formData.name, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g
      });
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.name]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages(prev => [...prev, ...newImages]);
      
      // Create preview URLs
      newImages.forEach(file => {
        const url = URL.createObjectURL(file);
        setImageUrls(prev => [...prev, url]);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImageUrls(prev => {
      URL.revokeObjectURL(prev[index]); // Clean up memory
      return prev.filter((_, i) => i !== index);
    });
  };

  const uploadImages = async () => {
    if (images.length === 0) return [];
    
    setUploadingImages(true);
    const uploadedImages = [];

    try {
      for (const image of images) {
        const formData = new FormData();
        formData.append("file", image);

        const response = await fetch("/api/dashboard/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          uploadedImages.push({
            _type: "image",
            asset: {
              _type: "reference",
              _ref: result.data._id,
            },
          });
        }
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setUploadingImages(false);
    }

    return uploadedImages;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Upload images first
      const uploadedImages = await uploadImages();

      const response = await fetch("/api/dashboard/stores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _type: "storeAdd",
          ...formData,
          slug: { _type: "slug", current: formData.slug },
          category: formData.category ? { _type: "reference", _ref: formData.category } : undefined,
          country: formData.country ? { _type: "reference", _ref: formData.country } : undefined,
          images: uploadedImages,
        }),
      });

      if (response.ok) {
        toast.success("🎉 Store added successfully!", {
          duration: 4000,
          position: 'top-center',
        });
        setTimeout(() => {
          router.push("/dashboard/stores");
        }, 1000);
      } else {
        const error = await response.json();
        toast.error(`❌ Error: ${error.error || "Failed to create store"}`, {
          duration: 4000,
          position: 'top-center',
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <Toaster />
        {/* Header Skeleton */}
        <div className="mb-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-64"></div>
          </div>
        </div>

        {/* Form Skeleton */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Store Name & Slug */}
            <div>
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
            <div>
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-48 mt-1"></div>
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-48 bg-gray-200 rounded w-full"></div>
              </div>
            </div>

            {/* URLs */}
            <div>
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
            <div>
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            </div>

            {/* Category & Country */}
            <div>
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
            <div>
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            </div>

            {/* Meta Title */}
            <div className="md:col-span-2">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            </div>

            {/* Meta Description */}
            <div className="md:col-span-2">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-28 mb-2"></div>
                <div className="h-32 bg-gray-200 rounded w-full"></div>
              </div>
            </div>

            {/* Meta Keywords */}
            <div className="md:col-span-2">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            </div>

            {/* Images */}
            <div className="md:col-span-2">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-32 bg-gray-200 rounded w-full border-2 border-dashed border-gray-300"></div>
              </div>
            </div>
          </div>

          {/* Form Actions Skeleton */}
          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
            <div className="animate-pulse bg-gray-200 rounded h-10 w-20"></div>
            <div className="animate-pulse bg-gray-200 rounded h-10 w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Toaster />
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Add New Store</h1>
        <p className="text-gray-600 mt-1">Create a new store for your coupon site</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Store Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Store Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter store name"
            />
          </div>

          {/* Auto-generated Slug Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL Slug (Auto-generated)
            </label>
            <div className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-600">
              {formData.slug || "store-slug-will-appear-here"}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              This will be automatically generated from the store name
            </p>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <MarkdownEditor
              label="Description"
              value={formData.description}
              onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
              placeholder="Enter store description with markdown support..."
              height="200px"
            />
          </div>

          {/* Home URL */}
          <div>
            <label htmlFor="homeurl" className="block text-sm font-medium text-gray-700 mb-2">
              Home URL *
            </label>
            <input
              type="url"
              id="homeurl"
              name="homeurl"
              required
              value={formData.homeurl}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com"
            />
          </div>

          {/* Affiliate URL */}
          <div>
            <label htmlFor="affiliate" className="block text-sm font-medium text-gray-700 mb-2">
              Affiliate URL
            </label>
            <input
              type="url"
              id="affiliate"
              name="affiliate"
              value={formData.affiliate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://affiliate-link.com"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Country */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
              Country *
            </label>
            <select
              id="country"
              name="country"
              required
              value={formData.country}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country._id} value={country._id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          {/* Meta Title */}
          <div className="md:col-span-2">
            <label htmlFor="metatitle" className="block text-sm font-medium text-gray-700 mb-2">
              Meta Title
            </label>
            <input
              type="text"
              id="metatitle"
              name="metatitle"
              value={formData.metatitle}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="SEO meta title"
            />
          </div>

          {/* Meta Description */}
          <div className="md:col-span-2">
            <MarkdownEditor
              label="Meta Description"
              value={formData.metadescription}
              onChange={(value) => setFormData(prev => ({ ...prev, metadescription: value }))}
              placeholder="Enter SEO meta description with markdown support..."
              height="150px"
            />
          </div>

          {/* Meta Keywords */}
          <div className="md:col-span-2">
            <label htmlFor="metakeywords" className="block text-sm font-medium text-gray-700 mb-2">
              Meta Keywords
            </label>
            <input
              type="text"
              id="metakeywords"
              name="metakeywords"
              value={formData.metakeywords}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>

          {/* Images */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Store Images
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label htmlFor="images" className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-gray-900">
                      Upload store images
                    </span>
                    <input
                      id="images"
                      name="images"
                      type="file"
                      multiple
                      accept="image/*"
                      className="sr-only"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  PNG, JPG, GIF up to 10MB each
                </p>
              </div>
            </div>

            {/* Image Previews */}
            {imageUrls.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {imageUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
          <Link
            href="/dashboard"
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Cancel
          </Link>
          <Button
            type="submit"
            disabled={submitting || uploadingImages}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {submitting || uploadingImages ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {uploadingImages ? "Uploading..." : "Creating..."}
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Create Store
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}