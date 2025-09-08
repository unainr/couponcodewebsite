"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  ExternalLink,
  Loader2,
  Search,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from 'react-hot-toast';

interface Store {
  _id: string;
  name: string;
  description: string;
  homeurl: string;
  affiliate: string;
  slug: string;
  categoryName: string;
  countryName: string;
  imageUrl: string;
  couponCount: number;
}

export default function StoresPage() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [categories, setCategories] = useState<{_id: string, name: string}[]>([]);

  useEffect(() => {
    fetchStores();
    fetchCategories();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await fetch("/api/dashboard/stores/list");
      if (response.ok) {
        const data = await response.json();
        setStores(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching stores:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/dashboard/references/category");
      if (response.ok) {
        const data = await response.json();
        setCategories(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This will also delete all associated coupons. This action cannot be undone.`)) return;

    try {
      const response = await fetch(`/api/dashboard/stores/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const result = await response.json();
        setStores(stores.filter(store => store._id !== id));
        toast.success(`🗑️ ${result.message || 'Store deleted successfully!'}`, {
          duration: 4000,
          position: 'top-center',
        });
      } else {
        const error = await response.json();
        toast.error(`❌ Failed to delete store: ${error.error || 'Unknown error'}`, {
          duration: 4000,
          position: 'top-center',
        });
      }
    } catch (error) {
      console.error("Error deleting store:", error);
      toast.error("❌ Error deleting store. Please try again.", {
        duration: 4000,
        position: 'top-center',
      });
    }
  };

  const filteredStores = stores
    .filter(store => 
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(store => 
      filterCategory === "" || store.categoryName === filterCategory
    );

  if (loading) {
    return (
      <div>
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-64"></div>
            </div>
          </div>
          <div className="animate-pulse bg-gray-200 rounded h-10 w-28"></div>
        </div>

        {/* Filters Skeleton */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 animate-pulse bg-gray-200 rounded h-10"></div>
            <div className="md:w-48 animate-pulse bg-gray-200 rounded h-10"></div>
          </div>
        </div>

        {/* Stores List Skeleton */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border-b border-gray-200 last:border-b-0 p-6">
              <div className="flex items-center">
                <div className="animate-pulse bg-gray-200 rounded-lg h-16 w-16 mr-4"></div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="animate-pulse bg-gray-200 rounded h-6 w-48"></div>
                    <div className="animate-pulse bg-gray-200 rounded h-5 w-20"></div>
                  </div>
                  <div className="animate-pulse bg-gray-200 rounded h-4 w-full mb-2"></div>
                  <div className="animate-pulse bg-gray-200 rounded h-4 w-3/4 mb-3"></div>
                  <div className="flex items-center gap-4">
                    <div className="animate-pulse bg-gray-200 rounded h-4 w-24"></div>
                    <div className="animate-pulse bg-gray-200 rounded h-4 w-32"></div>
                    <div className="animate-pulse bg-gray-200 rounded h-4 w-20"></div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <div className="animate-pulse bg-gray-200 rounded h-8 w-8"></div>
                  <div className="animate-pulse bg-gray-200 rounded h-8 w-8"></div>
                  <div className="animate-pulse bg-gray-200 rounded h-8 w-8"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Skeleton */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="animate-pulse bg-gray-200 rounded h-8 w-16 mb-2"></div>
              <div className="animate-pulse bg-gray-200 rounded h-4 w-24"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Toaster />
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">All Stores</h2>
          <p className="text-gray-600 mt-1">
            Manage your stores and their information
          </p>
        </div>
        <Link href="/dashboard/stores/add">
          <Button className="bg-green-500 hover:bg-green-600">
            <Plus className="w-4 h-4 mr-2" />
            Add Store
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search stores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="md:w-48">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStores.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No stores found.</p>
            <Link href="/dashboard/stores/add" className="text-green-500 hover:text-green-600 mt-2 inline-block">
              Add your first store
            </Link>
          </div>
        ) : (
          filteredStores.map((store) => (
            <div key={store._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Store Image */}
              <div className="relative h-48 bg-gray-100">
                {store.imageUrl ? (
                  <Image
                    src={store.imageUrl}
                    alt={store.name}
                    fill
                    className="object-contain p-4"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🏪</span>
                      </div>
                      <p className="text-sm">No image</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Store Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {store.name}
                  </h3>
                  <div className="flex items-center gap-1 ml-2">
                    <Link
                      href={`/store/${store.slug}`}
                      target="_blank"
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      title="View on site"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    
                    <a
                      href={store.homeurl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                      title="Visit store website"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <Link
                      href={`/dashboard/stores/edit/${store._id}`}
                      className="p-1 text-gray-400 hover:text-orange-600 transition-colors"
                      title="Edit store"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => handleDelete(store._id, store.name)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete store"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>Category:</span>
                    <span className="font-medium">{store.categoryName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Country:</span>
                    <span className="font-medium">{store.countryName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Coupons:</span>
                    <span className="font-medium text-orange-600">{store.couponCount || 0}</span>
                  </div>
                </div>

                {store.description && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {store.description.replace(/<[^>]*>/g, '').substring(0, 100)}...
                    </p>
                  </div>
                )}

                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/stores/edit/${store._id}`}
                      className="flex-1 px-3 py-2 text-sm bg-orange-50 text-orange-700 rounded-md hover:bg-orange-100 transition-colors text-center"
                    >
                      Edit Store
                    </Link>
                    <Link
                      href={`/dashboard/coupons?store=${store._id}`}
                      className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors text-center"
                    >
                      View Coupons
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-900">{stores.length}</div>
          <div className="text-sm text-gray-600">Total Stores</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-green-600">
            {stores.filter(s => s.couponCount > 0).length}
          </div>
          <div className="text-sm text-gray-600">Stores with Coupons</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-blue-600">
            {stores.reduce((total, store) => total + (store.couponCount || 0), 0)}
          </div>
          <div className="text-sm text-gray-600">Total Coupons</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-purple-600">
            {new Set(stores.map(s => s.categoryName)).size}
          </div>
          <div className="text-sm text-gray-600">Categories</div>
        </div>
      </div>
    </div>
  );
}