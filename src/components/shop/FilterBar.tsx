import React from 'react';

interface FilterBarProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export function FilterBar({ activeFilter, setActiveFilter }: FilterBarProps) {
  const filters = ['All', 'Ghee', 'Milk', 'Paneer', 'Dahi', 'Lassi'];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
            activeFilter === filter
              ? 'bg-[var(--color-brand-blue)] text-white shadow-md shadow-blue-500/20'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue)]'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
