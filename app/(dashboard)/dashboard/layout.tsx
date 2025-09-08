import { Metadata } from "next";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard - Coupon Management",
  description: "Manage your coupons, stores, and categories",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
   const session = await auth.api.getSession({
          headers: await headers(),
      });
  
    if(!session){
      redirect("/sign-in")
    }
  return (
    <div className="min-h-screen ">
      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar />
        
        {/* Main Content */}
        <div className="flex-1 ml-64">
          <div className=" border-b">
            <div className="px-6 py-2">
              <h1 className="text-2xl font-bold text-gray-900">
                Dashboard
              </h1>
              <p className="text-gray-600  mt-1">
                Manage your coupon site content
              </p>
            </div>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}