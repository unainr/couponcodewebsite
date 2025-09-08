"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Tag, 
  Store, 
  Plus, 
  TrendingUp, 
  Calendar,
  ArrowUpDown,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Users
} from "lucide-react";
import { DashboardStatsSkeleton } from "@/components/dashboard/SkeletonLoaders";
import toast, { Toaster } from 'react-hot-toast';

interface DashboardStats {
  totalCoupons: number;
  totalStores: number;
  activeCoupons: number;
  expiredCoupons: number;
  thisMonthCoupons: number;
  recentCoupons: Array<{
    _id: string;
    coupontitle: string;
    storeName: string;
    publishdate: string;
    expiredate: string;
  }>;
  recentStores: Array<{
    _id: string;
    name: string;
    category: string;
    createdAt: string;
  }>;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
    
    // Check for success messages from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    
    if (success === 'coupon-added') {
      toast.success('🎉 Coupon added successfully!', {
        duration: 4000,
        position: 'top-center',
      });
      // Clean URL
      window.history.replaceState({}, '', '/dashboard');
    } else if (success === 'store-added') {
      toast.success('🎉 Store added successfully!', {
        duration: 4000,
        position: 'top-center',
      });
      // Clean URL
      window.history.replaceState({}, '', '/dashboard');
    }
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const [couponsRes, storesRes] = await Promise.all([
        fetch('/api/dashboard/coupons/list'),
        fetch('/api/dashboard/references/storeAdd')
      ]);

      const couponsData = await couponsRes.json();
      const storesData = await storesRes.json();

      const coupons = couponsData.data || [];
      const stores = storesData.data || [];

      const now = new Date();
      const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      const activeCoupons = coupons.filter((c: any) => new Date(c.expiredate) > now);
      const expiredCoupons = coupons.filter((c: any) => new Date(c.expiredate) <= now);
      const thisMonthCoupons = coupons.filter((c: any) => new Date(c.publishdate) >= thisMonth);

      setStats({
        totalCoupons: coupons.length,
        totalStores: stores.length,
        activeCoupons: activeCoupons.length,
        expiredCoupons: expiredCoupons.length,
        thisMonthCoupons: thisMonthCoupons.length,
        recentCoupons: coupons.slice(0, 5),
        recentStores: stores.slice(0, 3)
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-96"></div>
          </div>
        </div>
        <DashboardStatsSkeleton />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="animate-pulse bg-gray-200 rounded-lg h-32"></div>
          <div className="animate-pulse bg-gray-200 rounded-lg h-32"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Toaster />
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your coupon platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-sm border border-blue-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 mb-1">Total Coupons</p>
              <p className="text-3xl font-bold text-blue-900">{stats?.totalCoupons || 0}</p>
              <p className="text-xs text-blue-600 mt-1">All time</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-500 text-white">
              <Tag className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm border border-green-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 mb-1">Total Stores</p>
              <p className="text-3xl font-bold text-green-900">{stats?.totalStores || 0}</p>
              <p className="text-xs text-green-600 mt-1">Active stores</p>
            </div>
            <div className="p-3 rounded-lg bg-green-500 text-white">
              <Store className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-sm border border-orange-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600 mb-1">Active Deals</p>
              <p className="text-3xl font-bold text-orange-900">{stats?.activeCoupons || 0}</p>
              <p className="text-xs text-orange-600 mt-1">Not expired</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-500 text-white">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-sm border border-purple-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600 mb-1">This Month</p>
              <p className="text-3xl font-bold text-purple-900">{stats?.thisMonthCoupons || 0}</p>
              <p className="text-xs text-purple-600 mt-1">New coupons</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-500 text-white">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link
          href="/dashboard/coupons/add"
          className="group block p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-orange-300 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center mb-3">
            <div className="p-3 rounded-lg bg-orange-500 text-white group-hover:scale-110 transition-transform duration-200">
              <Plus className="w-5 h-5" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                Add Coupon
              </h3>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Create new coupon codes and deals
          </p>
        </Link>

        <Link
          href="/dashboard/stores/add"
          className="group block p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-green-300 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center mb-3">
            <div className="p-3 rounded-lg bg-green-500 text-white group-hover:scale-110 transition-transform duration-200">
              <Plus className="w-5 h-5" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                Add Store
              </h3>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Add new stores to your platform
          </p>
        </Link>

        <Link
          href="/dashboard/reorder"
          className="group block p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center mb-3">
            <div className="p-3 rounded-lg bg-blue-500 text-white group-hover:scale-110 transition-transform duration-200">
              <ArrowUpDown className="w-5 h-5" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                Reorder
              </h3>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Drag & drop to reorder coupons
          </p>
        </Link>

        <Link
          href="/dashboard/coupons"
          className="group block p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-purple-300 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center mb-3">
            <div className="p-3 rounded-lg bg-purple-500 text-white group-hover:scale-110 transition-transform duration-200">
              <Eye className="w-5 h-5" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                View All
              </h3>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Manage all coupons & stores
          </p>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Coupons */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Tag className="w-5 h-5 mr-2 text-blue-500" />
              Recent Coupons
            </h3>
            <Link 
              href="/dashboard/coupons"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              View All →
            </Link>
          </div>
          
          {stats?.recentCoupons && stats.recentCoupons.length > 0 ? (
            <div className="space-y-4">
              {stats.recentCoupons.map((coupon) => (
                <div key={coupon._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">{coupon.coupontitle}</h4>
                    <p className="text-xs text-gray-600 mt-1">Store: {coupon.storeName}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-xs text-gray-500">
                      {new Date(coupon.expiredate) > new Date() ? (
                        <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                      ) : (
                        <AlertCircle className="w-3 h-3 text-red-500 mr-1" />
                      )}
                      {new Date(coupon.expiredate) > new Date() ? 'Active' : 'Expired'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Tag className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No coupons yet</p>
              <p className="text-sm mt-1">Add your first coupon to get started</p>
            </div>
          )}
        </div>

        {/* Recent Stores */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Store className="w-5 h-5 mr-2 text-green-500" />
              Recent Stores
            </h3>
            <Link 
              href="/dashboard/stores"
              className="text-sm text-green-600 hover:text-green-800 font-medium"
            >
              View All →
            </Link>
          </div>
          
          {stats?.recentStores && stats.recentStores.length > 0 ? (
            <div className="space-y-4">
              {stats.recentStores.map((store) => (
                <div key={store._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">{store.name}</h4>
                    <p className="text-xs text-gray-600 mt-1">Category: {store.category || 'General'}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-xs text-green-600">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Active
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Store className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No stores yet</p>
              <p className="text-sm mt-1">Add your first store to get started</p>
            </div>
          )}
        </div>
      </div>

      {/* Performance Overview */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-indigo-500" />
          Quick Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-900">{((stats?.activeCoupons || 0) / (stats?.totalCoupons || 1) * 100).toFixed(0)}%</div>
            <div className="text-sm text-blue-600 mt-1">Active Rate</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-900">{(stats?.totalCoupons || 0) / (stats?.totalStores || 1) > 0 ? ((stats?.totalCoupons || 0) / (stats?.totalStores || 1)).toFixed(1) : '0'}</div>
            <div className="text-sm text-green-600 mt-1">Coupons per Store</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-900">{stats?.thisMonthCoupons || 0}</div>
            <div className="text-sm text-purple-600 mt-1">This Month</div>
          </div>
        </div>
      </div>
    </div>
  );
}