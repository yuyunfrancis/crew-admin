import Link from "next/link";
import { FiActivity, FiFileText, FiShield } from "react-icons/fi";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal – Crew Social",
  description: "Terms and Conditions and Privacy Policy for the Crew Social app.",
};

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Public Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FiActivity className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              Crew Social
            </span>
          </Link>

          {/* Legal Nav Links */}
          <nav className="flex items-center gap-1">
            <Link
              href="/terms"
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
            >
              <FiFileText className="w-3.5 h-3.5" />
              Terms
            </Link>
            <Link
              href="/privacy"
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-150"
            >
              <FiShield className="w-3.5 h-3.5" />
              Privacy
            </Link>
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Crew Social, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <Link href="/terms" className="hover:text-blue-500 transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/privacy" className="hover:text-purple-500 transition-colors">
              Privacy Policy
            </Link>
            <a href="mailto:legal@crewsocial.app" className="hover:text-gray-600 transition-colors">
              legal@crewsocial.app
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
