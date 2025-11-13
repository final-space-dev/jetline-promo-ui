'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200 mb-8">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex gap-8">
          <Link
            href="/calendar"
            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
              pathname === '/calendar'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Calendar Idea
          </Link>
          <Link
            href="/calculation-result"
            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
              pathname === '/calculation-result'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Calculation Result Idea
          </Link>
        </div>
      </div>
    </nav>
  );
}
