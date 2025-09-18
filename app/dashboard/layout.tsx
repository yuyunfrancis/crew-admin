import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden bg-gray-50 flex">
      {/* Sidebar - Fixed width and full height */}
      <div className="w-64 flex-shrink-0 h-full">
        <Sidebar />
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-auto h-full">
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
