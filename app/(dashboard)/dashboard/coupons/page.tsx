"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  ExternalLink,
  Loader2,
  Search,
  Filter,
  ArrowUpDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from 'react-hot-toast';

interface Coupon {
  _id: string;
  coupontitle: string;
  description: string;
  couponurl: string;
  couponcode: string;
  coupontype: string;
  publishdate: string;
  expiredate: string;
  featured: string;
  order: number;
  storeName: string;
  storeSlug: string;
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStore, setFilterStore] = useState("");
  const [stores, setStores] = useState<{_id: string, name: string}[]>([]);

  useEffect(() => {
    fetchCoupons();
    fetchStores();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await fetch("/api/dashboard/coupons/list");
      if (response.ok) {
        const data = await response.json();
        setCoupons(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching coupons:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStores = async () => {
    try {
      const response = await fetch("/api/dashboard/references/storeAdd");
      if (response.ok) {
        const data = await response.json();
        setStores(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) return;

    try {
      const response = await fetch(`/api/dashboard/coupons/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCoupons(coupons.filter(coupon => coupon._id !== id));
        toast.success("🗑️ Coupon deleted successfully!", {
          duration: 4000,
          position: 'top-center',
        });
      } else {
        const error = await response.json();
        toast.error(`❌ Failed to delete coupon: ${error.error || 'Unknown error'}`, {
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
    }
  };

  
  const filteredCoupons = coupons
    .filter(coupon => 
      coupon.coupontitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.storeName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(coupon => 
      filterStore === "" || coupon.storeName === filterStore
    )
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const isExpired = (expireDate: string) => {
    return new Date(expireDate) < new Date();
  };

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
          <div className="flex gap-3">
            <div className="animate-pulse bg-gray-200 rounded h-10 w-32"></div>
            <div className="animate-pulse bg-gray-200 rounded h-10 w-28"></div>
          </div>
        </div>

        {/* Filters Skeleton */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 animate-pulse bg-gray-200 rounded h-10"></div>
            <div className="md:w-48 animate-pulse bg-gray-200 rounded h-10"></div>
          </div>
        </div>

        {/* Coupons List Skeleton */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-b border-gray-200 last:border-b-0 p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="animate-pulse bg-gray-200 rounded h-6 w-16"></div>
                    <div className="animate-pulse bg-gray-200 rounded h-6 w-64"></div>
                    <div className="animate-pulse bg-gray-200 rounded h-5 w-16"></div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="animate-pulse bg-gray-200 rounded h-4 w-32"></div>
                    <div className="animate-pulse bg-gray-200 rounded h-4 w-24"></div>
                    <div className="animate-pulse bg-gray-200 rounded h-4 w-20"></div>
                    <div className="animate-pulse bg-gray-200 rounded h-6 w-20"></div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <div className="animate-pulse bg-gray-200 rounded h-8 w-8"></div>
                  <div className="animate-pulse bg-gray-200 rounded h-8 w-8"></div>
                  <div className="animate-pulse bg-gray-200 rounded h-8 w-8"></div>
                  <div className="animate-pulse bg-gray-200 rounded h-8 w-8"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Skeleton */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
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
          <h2 className="text-2xl font-bold text-gray-900">All Coupons</h2>
          <p className="text-gray-600 mt-1">
            Manage your coupon codes and deals
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/reorder">
            <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Reorder Coupons
            </Button>
          </Link>
          <Link href="/dashboard/coupons/add">
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Coupon
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search coupons or stores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="md:w-48">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={filterStore}
                onChange={(e) => setFilterStore(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
              >
                <option value="">All Stores</option>
                {stores.map(store => (
                  <option key={store._id} value={store.name}>
                    {store.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Coupons List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {filteredCoupons.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No coupons found.</p>
            <Link href="/dashboard/coupons/add" className="text-orange-500 hover:text-orange-600 mt-2 inline-block">
              Add your first coupon
            </Link>
          </div>
        ) : (
          <div>
            {filteredCoupons.map((coupon, index) => (
              <div key={coupon._id} className="border-b border-gray-200 last:border-b-0">
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {coupon.coupontitle}
                        </h3>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Order: {coupon.order || index}
                        </span>
                        {isExpired(coupon.expiredate) && (
                          <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                            Expired
                          </span>
                        )}
                        {coupon.featured && (
                          <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Expires: {new Date(coupon.expiredate).toLocaleDateString()}
                        </span>
                        <span>Store: {coupon.storeName}</span>
                        <span>Type: {coupon.coupontype}</span>
                        {coupon.couponcode && (
                          <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                            {coupon.couponcode}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 ml-4">
                    <Link
                      href={`/store/${coupon.storeSlug}`}
                      target="_blank"
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="View on site"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    
                    <a
                      href={coupon.couponurl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                      title="Visit coupon URL"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <Link
                      href={`/dashboard/coupons/edit/${coupon._id}`}
                      className="p-2 text-gray-400 hover:text-orange-600 transition-colors"
                      title="Edit coupon"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => handleDelete(coupon._id, coupon.coupontitle)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete coupon"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-900">{coupons.length}</div>
          <div className="text-sm text-gray-600">Total Coupons</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-green-600">
            {coupons.filter(c => !isExpired(c.expiredate)).length}
          </div>
          <div className="text-sm text-gray-600">Active Coupons</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-red-600">
            {coupons.filter(c => isExpired(c.expiredate)).length}
          </div>
          <div className="text-sm text-gray-600">Expired Coupons</div>
        </div>
      </div>
    </div>
  );
}