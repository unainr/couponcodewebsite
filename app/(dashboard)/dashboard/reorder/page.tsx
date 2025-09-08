"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Save, 
  Loader2,
  Search,
  Filter,
  GripVertical,
  Calendar,
  CheckCircle,
  Circle,
  LoaderCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from 'react-hot-toast';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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

// Sortable Item Component
function SortableItem({ coupon, index }: { coupon: Coupon; index: number }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: coupon._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : 1,
  };

  const isExpired = (expireDate: string) => {
    return new Date(expireDate) < new Date();
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`border-b border-gray-200 last:border-b-0 ${
        isDragging 
          ? "bg-white shadow-2xl rounded-lg border-2 border-blue-400 opacity-90" 
          : "bg-white hover:bg-gray-50"
      }`}
    >
      <div className="p-4 flex items-center">
        {/* DRAG HANDLE */}
        <div
          {...attributes}
          {...listeners}
          className="mr-4 p-3 cursor-grab active:cursor-grabbing text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all border-2 border-dashed border-gray-300 hover:border-blue-400"
          title="Drag to reorder"
        >
          <div className="flex flex-col items-center">
            <div className="text-xs font-bold text-gray-600 mb-1">DRAG</div>
            <GripVertical className="w-5 h-5" />
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
              #{index + 1}
            </span>
            <h3 className="text-lg font-semibold text-gray-900">
              {coupon.coupontitle}
            </h3>
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
            {coupon.couponcode && (
              <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                {coupon.couponcode}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReorderCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStore, setFilterStore] = useState("");
  const [stores, setStores] = useState<{_id: string, name: string}[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    console.log("🔥 DRAG END - Moving:", active.id, "to position of:", over.id);

    const oldIndex = filteredCoupons.findIndex(item => item._id === active.id);
    const newIndex = filteredCoupons.findIndex(item => item._id === over.id);

    console.log(`Moving from index ${oldIndex} to ${newIndex}`);

    const newOrder = arrayMove(filteredCoupons, oldIndex, newIndex);
    
    // Update order numbers
    const updatedCoupons = newOrder.map((item, index) => ({
      ...item,
      order: index
    }));

    // Update main coupons state
    setCoupons(prevCoupons => {
      const newCoupons = [...prevCoupons];
      updatedCoupons.forEach(updatedCoupon => {
        const index = newCoupons.findIndex(c => c._id === updatedCoupon._id);
        if (index !== -1) {
          newCoupons[index] = updatedCoupon;
        }
      });
      return newCoupons;
    });

    setHasChanges(true);
    console.log("✅ Order updated successfully!");
  };

  const saveOrder = async () => {
    setSaving(true);
    
    try {
      const updatePromises = filteredCoupons.map((item, index) =>
        fetch(`/api/dashboard/coupons/${item._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: index }),
        })
      );

      await Promise.all(updatePromises);
      setHasChanges(false);
      toast.success("🎉 Coupon order saved successfully! The new order will be reflected on your site.", {
        duration: 4000,
        position: 'top-center',
      });
      
    } catch (error) {
      console.error("Error saving order:", error);
      toast.error("❌ Error saving order. Please try again.", {
        duration: 4000,
        position: 'top-center',
      });
      fetchCoupons();
    } finally {
      setSaving(false);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Loading coupons...</span>
      </div>
    );
  }

  return (
    <div>
      <Toaster />
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <Link
            href="/dashboard/coupons"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Coupons
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">Reorder Coupons</h2>
          <p className="text-gray-600 mt-1">
            Drag and drop to reorder your coupons. Top coupons will appear first on your site.
          </p>
        </div>
        {/* <Button 
          onClick={saveOrder}
          disabled={!hasChanges || saving}
          className="bg-orange-600 hover:bg-orange-700 disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Order ({filteredCoupons.length} items)
            </>
          )}
        </Button> */}
         {/* Bottom Save Button */}
      {hasChanges && (
        <div className="mt-6 text-center">
          <Button 
            onClick={saveOrder}
            disabled={saving}
            size="lg"
            className="bg-orange-600 hover:bg-orange-700"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <LoaderCircle className="w-5 h-5 " />
                 Reorder
              </>
            )}
          </Button>
        </div>
      )}
      </div>

      {/* Status */}
      {hasChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-yellow-600" />
            <div className="ml-3">
              <p className="text-sm text-yellow-800">
                <strong>You have unsaved changes.</strong> Click "Save Order" to apply the new order to your site.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className=" rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search coupons or stores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="md:w-48">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={filterStore}
                onChange={(e) => setFilterStore(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
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

      {/* Instructions */}
      {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">🎯 How to Reorder:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Click and drag the <strong>DRAG</strong> handle to move coupons up or down</li>
          <li>• Coupons at the top (#1, #2, #3) will appear first on your website</li>
          <li>• Use search and filter to find specific coupons</li>
          <li>• Click "Save Order" when you're done to apply changes</li>
        </ul>
      </div> */}

      {/* Coupons List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {filteredCoupons.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No coupons found.</p>
            <Link href="/dashboard/coupons/add" className="text-blue-500 hover:text-blue-600 mt-2 inline-block">
              Add your first coupon
            </Link>
          </div>
        ) : (
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={filteredCoupons.map(c => c._id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="min-h-[200px]">
                {filteredCoupons.map((coupon, index) => (
                  <SortableItem 
                    key={coupon._id} 
                    coupon={coupon} 
                    index={index}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

     
    </div>
  );
}