"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import MarkdownEditor from "@/components/dashboard/MarkdownEditor";
import toast, { Toaster } from 'react-hot-toast';

interface ReferenceOption {
  _id: string;
  name: string;
  slug?: string;
}

interface Coupon {
  _id: string;
  coupontitle: string;
  description: string;
  couponurl: string;
  couponcode: string;
  coupontype: {
    _id: string;
    name: string;
  };
  store: {
    _id: string;
    name: string;
  };
  seasonal?: {
    _id: string;
    name: string;
  };
  featured?: {
    _id: string;
    name: string;
  };
  publishdate: string;
  expiredate: string;
  order: number;
}

export default function EditCouponPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [couponId, setCouponId] = useState<string>("");
  
  // Reference options
  const [stores, setStores] = useState<ReferenceOption[]>([]);
  const [couponTypes, setCouponTypes] = useState<ReferenceOption[]>([]);
  const [seasons, setSeasons] = useState<ReferenceOption[]>([]);
  const [featured, setFeatured] = useState<ReferenceOption[]>([]);

  // Form data
  const [formData, setFormData] = useState({
    coupontitle: "",
    description: "",
    couponurl: "",
    couponcode: "",
    coupontype: "",
    store: "",
    seasonal: "",
    publishdate: "",
    expiredate: "",
    featured: "",
    order: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const resolvedParams = await params;
      setCouponId(resolvedParams.id);
      await Promise.all([
        loadCouponData(resolvedParams.id),
        loadReferenceData()
      ]);
    };
    loadData();
  }, [params]);

  const loadCouponData = async (id: string) => {
    try {
      const response = await fetch(`/api/dashboard/coupons/${id}`);
      if (response.ok) {
        const data = await response.json();
        const coupon: Coupon = data.data;
        
        setFormData({
          coupontitle: coupon.coupontitle || "",
          description: coupon.description || "",
          couponurl: coupon.couponurl || "",
          couponcode: coupon.couponcode || "",
          coupontype: coupon.coupontype?._id || "",
          store: coupon.store?._id || "",
          seasonal: coupon.seasonal?._id || "",
          publishdate: coupon.publishdate ? new Date(coupon.publishdate).toISOString().slice(0, 16) : "",
          expiredate: coupon.expiredate ? new Date(coupon.expiredate).toISOString().slice(0, 16) : "",
          featured: coupon.featured?._id || "",
          order: coupon.order || 0,
        });
      } else {
        toast.error("❌ Failed to load coupon data");
        router.push("/dashboard/coupons");
      }
    } catch (error) {
      console.error("Error loading coupon:", error);
      toast.error("❌ Error loading coupon");
      router.push("/dashboard/coupons");
    }
  };

  const loadReferenceData = async () => {
    try {
      const [storesRes, typesRes, seasonsRes, featuredRes] = await Promise.all([
        fetch("/api/dashboard/references/storeAdd"),
        fetch("/api/dashboard/references/coupontype"),
        fetch("/api/dashboard/references/seasonal"),
        fetch("/api/dashboard/references/featured"),
      ]);

      if (storesRes.ok) {
        const storesData = await storesRes.json();
        setStores(storesData.data || []);
      }

      if (typesRes.ok) {
        const typesData = await typesRes.json();
        setCouponTypes(typesData.data || []);
      }

      if (seasonsRes.ok) {
        const seasonsData = await seasonsRes.json();
        setSeasons(seasonsData.data || []);
      }

      if (featuredRes.ok) {
        const featuredData = await featuredRes.json();
        setFeatured(featuredData.data || []);
      }
    } catch (error) {
      console.error("Error loading reference data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`/api/dashboard/coupons/${couponId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          coupontype: formData.coupontype ? { _type: "reference", _ref: formData.coupontype } : undefined,
          store: formData.store ? { _type: "reference", _ref: formData.store } : undefined,
          seasonal: formData.seasonal ? { _type: "reference", _ref: formData.seasonal } : undefined,
          featured: formData.featured ? { _type: "reference", _ref: formData.featured } : undefined,
          publishdate: formData.publishdate ? new Date(formData.publishdate).toISOString() : undefined,
          expiredate: formData.expiredate ? new Date(formData.expiredate).toISOString() : undefined,
          order: Number(formData.order),
        }),
      });

      if (response.ok) {
        toast.success("🎉 Coupon updated successfully!", {
          duration: 4000,
          position: 'top-center',
        });
        setTimeout(() => {
          router.push("/dashboard/coupons");
        }, 1000);
      } else {
        const error = await response.json();
        toast.error(`❌ Error: ${error.error || "Failed to update coupon"}`, {
          duration: 4000,
          position: 'top-center',
        });
      }
    } catch (error) {
      console.error("Error updating coupon:", error);
      toast.error("❌ Error updating coupon. Please try again.", {
        duration: 4000,
        position: 'top-center',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this coupon? This action cannot be undone.")) {
      return;
    }

    setDeleting(true);

    try {
      const response = await fetch(`/api/dashboard/coupons/${couponId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("🗑️ Coupon deleted successfully!", {
          duration: 4000,
          position: 'top-center',
        });
        setTimeout(() => {
          router.push("/dashboard/coupons");
        }, 1000);
      } else {
        const error = await response.json();
        toast.error(`❌ Error: ${error.error || "Failed to delete coupon"}`, {
          duration: 4000,
          position: 'top-center',
        });
      }
    } catch (error) {
      console.error("Error deleting coupon:", error);
      toast.error("❌ Error deleting coupon. Please try again.", {
        duration: 4000,
        position: 'top-center',
      });
    } finally {
      setDeleting(false);
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
            {/* Coupon Title */}
            <div className="md:col-span-2">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-48 bg-gray-200 rounded w-full"></div>
              </div>
            </div>

            {/* Form fields skeleton */}
            {[...Array(8)].map((_, i) => (
              <div key={i}>
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Form Actions Skeleton */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <div className="animate-pulse bg-gray-200 rounded h-10 w-32"></div>
            <div className="flex gap-4">
              <div className="animate-pulse bg-gray-200 rounded h-10 w-20"></div>
              <div className="animate-pulse bg-gray-200 rounded h-10 w-32"></div>
            </div>
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
          href="/dashboard/coupons"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Coupons
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Edit Coupon</h1>
        <p className="text-gray-600 mt-1">Update coupon information and settings</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Coupon Title */}
          <div className="md:col-span-2">
            <label htmlFor="coupontitle" className="block text-sm font-medium text-gray-700 mb-2">
              Coupon Title *
            </label>
            <input
              type="text"
              id="coupontitle"
              name="coupontitle"
              required
              value={formData.coupontitle}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter coupon title"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <MarkdownEditor
              label="Description"
              value={formData.description}
              onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
              placeholder="Enter coupon description with markdown support..."
              height="200px"
            />
          </div>

          {/* Coupon URL */}
          <div>
            <label htmlFor="couponurl" className="block text-sm font-medium text-gray-700 mb-2">
              Coupon URL *
            </label>
            <input
              type="url"
              id="couponurl"
              name="couponurl"
              required
              value={formData.couponurl}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/deal"
            />
          </div>

          {/* Coupon Code */}
          <div>
            <label htmlFor="couponcode" className="block text-sm font-medium text-gray-700 mb-2">
              Coupon Code
            </label>
            <input
              type="text"
              id="couponcode"
              name="couponcode"
              value={formData.couponcode}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter coupon code (leave empty for deals)"
            />
          </div>

          {/* Store */}
          <div>
            <label htmlFor="store" className="block text-sm font-medium text-gray-700 mb-2">
              Store *
            </label>
            <select
              id="store"
              name="store"
              required
              value={formData.store}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a store</option>
              {stores.map((store) => (
                <option key={store._id} value={store._id}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>

          {/* Coupon Type */}
          <div>
            <label htmlFor="coupontype" className="block text-sm font-medium text-gray-700 mb-2">
              Coupon Type *
            </label>
            <select
              id="coupontype"
              name="coupontype"
              required
              value={formData.coupontype}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select coupon type</option>
              {couponTypes.map((type) => (
                <option key={type._id} value={type._id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* Season */}
          <div>
            <label htmlFor="seasonal" className="block text-sm font-medium text-gray-700 mb-2">
              Season
            </label>
            <select
              id="seasonal"
              name="seasonal"
              value={formData.seasonal}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select season (optional)</option>
              {seasons.map((season) => (
                <option key={season._id} value={season._id}>
                  {season.name}
                </option>
              ))}
            </select>
          </div>

          {/* Featured */}
          <div>
            <label htmlFor="featured" className="block text-sm font-medium text-gray-700 mb-2">
              Featured
            </label>
            <select
              id="featured"
              name="featured"
              value={formData.featured}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Not featured</option>
              {featured.map((feat) => (
                <option key={feat._id} value={feat._id}>
                  {feat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Publish Date */}
          <div>
            <label htmlFor="publishdate" className="block text-sm font-medium text-gray-700 mb-2">
              Publish Date *
            </label>
            <input
              type="datetime-local"
              id="publishdate"
              name="publishdate"
              required
              value={formData.publishdate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Expire Date */}
          <div>
            <label htmlFor="expiredate" className="block text-sm font-medium text-gray-700 mb-2">
              Expire Date *
            </label>
            <input
              type="datetime-local"
              id="expiredate"
              name="expiredate"
              required
              value={formData.expiredate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Display Order */}
          <div>
            <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-2">
              Display Order
            </label>
            <input
              type="number"
              id="order"
              name="order"
              value={formData.order}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
              min="0"
            />
            <p className="text-sm text-gray-500 mt-1">
              Lower numbers appear first. You can also use drag-and-drop to reorder.
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          {/* Delete Button */}
          <Button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            variant="destructive"
            className="flex items-center"
          >
            {deleting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Coupon
              </>
            )}
          </Button>

          {/* Save/Cancel Buttons */}
          <div className="flex gap-4">
            <Link
              href="/dashboard/coupons"
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </Link>
            <Button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Update Coupon
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}