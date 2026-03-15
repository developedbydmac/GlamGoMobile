import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarItems: Array<{
    label: string;
    path: string;
    icon: React.ReactNode;
  }>;
  title?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  sidebarItems,
  title,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`bg-gradient-to-b from-primary-deepPlum to-primary-darkPlum text-white transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        } fixed left-0 top-0 h-screen overflow-y-auto z-40`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-primary-lightLavender/20">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-between hover:opacity-80 transition"
          >
            <span className={`font-bold text-xl ${!sidebarOpen && "hidden"}`}>
              GlamGo
            </span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                location.pathname === item.path
                  ? "bg-primary-rose text-white"
                  : "hover:bg-primary-lightLavender/10 text-white/80 hover:text-white"
              }`}
              title={sidebarOpen ? undefined : item.label}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <span className={`${!sidebarOpen && "hidden"}`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Top Bar */}
        <header className="bg-white shadow sticky top-0 z-30">
          <div className="px-8 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <button
              onClick={() => {
                localStorage.removeItem("vendorAuthToken");
                navigate("/login");
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
