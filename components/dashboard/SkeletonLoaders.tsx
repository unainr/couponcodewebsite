import { Skeleton } from "@/components/ui/skeleton";

// Coupon List Skeleton
export function CouponListSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="border-b border-gray-200 last:border-b-0 p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Skeleton className="h-6 w-16" /> {/* Order badge */}
                <Skeleton className="h-6 w-64" /> {/* Title */}
                <Skeleton className="h-5 w-16" /> {/* Status badge */}
              </div>
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-32" /> {/* Expires */}
                <Skeleton className="h-4 w-24" /> {/* Store */}
                <Skeleton className="h-4 w-20" /> {/* Type */}
                <Skeleton className="h-6 w-20" /> {/* Code */}
              </div>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Store List Skeleton
export function StoreListSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="border-b border-gray-200 last:border-b-0 p-6">
          <div className="flex items-center">
            <Skeleton className="h-16 w-16 rounded-lg mr-4" /> {/* Store image */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Skeleton className="h-6 w-48" /> {/* Store name */}
                <Skeleton className="h-5 w-20" /> {/* Category badge */}
              </div>
              <Skeleton className="h-4 w-full mb-2" /> {/* Description line 1 */}
              <Skeleton className="h-4 w-3/4 mb-3" /> {/* Description line 2 */}
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-24" /> {/* Country */}
                <Skeleton className="h-4 w-32" /> {/* URL */}
                <Skeleton className="h-4 w-20" /> {/* Coupons count */}
              </div>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Dashboard Stats Skeleton
export function DashboardStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-16" />
            </div>
            <Skeleton className="h-12 w-12 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Form Skeleton
export function FormSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={i === 1 ? "md:col-span-2" : ""}>
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}