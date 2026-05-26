"use client";

import type { City } from "@/lib/types";

const cities: City[] = [
  "All",
  "New York",
  "Chicago",
  "San Francisco",
  "Charlotte",
  "Miami",
];

interface CityFilterProps {
  selected: City;
  onChange: (city: City) => void;
}

export function CityFilter({ selected, onChange }: CityFilterProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {cities.map((city) => (
        <button
          key={city}
          type="button"
          onClick={() => onChange(city)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            selected === city
              ? "bg-[#1a1a2e] text-white"
              : "bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50"
          }`}
        >
          {city}
        </button>
      ))}
    </div>
  );
}
