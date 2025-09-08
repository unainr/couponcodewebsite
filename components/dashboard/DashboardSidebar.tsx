"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard,
  Tag,
  Store,
  Plus,
  List,
  Home,
  Settings
} from "lucide-react";
import UserDropDown from "../auth/UserDropDown";

const navigation = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Coupons",
    icon: Tag,
    children: [
      { name: "All Coupons", href: "/dashboard/coupons" },
      { name: "Add Coupon", href: "/dashboard/coupons/add" },
    ],
  },
  {
    name: "Stores",
    icon: Store,
    children: [
      { name: "All Stores", href: "/dashboard/stores" },
      { name: "Add Store", href: "/dashboard/stores/add" },
    ],
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname === href;
  };

  // Check if any child is active for parent sections
  const isParentActive = (children: { href: string }[]) => {
    return children.some(child => pathname === child.href);
  };

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white  border-r border-gray-200">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center px-6 py-4 border-b border-gray-200">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center ">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500">
                RedeemlyNow
              </h1>
              <p className="text-xs text-gray-500">Dashboard</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            if (item.children) {
              const parentActive = isParentActive(item.children);
              return (
                <div key={item.name} className="space-y-1">
                  <div className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    parentActive 
                      ? "text-orange-700 bg-orange-50" 
                      : "text-gray-700"
                  }`}>
                    <item.icon className={`w-5 h-5 mr-3 ${
                      parentActive ? "text-orange-500" : "text-gray-400"
                    }`} />
                    {item.name}
                  </div>
                  <div className="ml-6 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                          isActive(child.href)
                            ? "bg-orange-100 text-orange-800 font-medium border-l-2 border-orange-500"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.href)
                    ? "bg-orange-50 text-orange-700 border-l-2 border-orange-500"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className={`w-5 h-5 mr-3 ${
                  isActive(item.href) ? "text-orange-500" : "text-gray-400"
                }`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Navigation */}
        <div className="px-4 py-4 border-t border-gray-200 space-y-1">
          <UserDropDown/>
        </div>
      </div>
    </div>
  );
}