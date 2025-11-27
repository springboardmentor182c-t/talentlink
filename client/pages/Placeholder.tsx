import { Link } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";

interface PlaceholderProps {
  pageTitle: string;
}

export function PlaceholderPage({ pageTitle }: PlaceholderProps) {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="max-w-7xl">
          <h1 className="text-4xl font-bold text-foreground mb-6">
            {pageTitle}
          </h1>

          <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Coming Soon
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              This page is currently under development. Check back soon for updates!
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
