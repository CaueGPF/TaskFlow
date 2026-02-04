"use client";

import { cn } from "@/lib/utils";
import type { FilterType } from "@/types/todo";

interface TodoFilterProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

const filters: { key: FilterType; label: string }[] = [
  { key: "all", label: "Todas" },
  { key: "active", label: "Pendentes" },
  { key: "completed", label: "Concluídas" },
];

export function TodoFilter({ filter, onFilterChange, counts }: TodoFilterProps) {
  return (
    <div className="flex gap-2 rounded-lg bg-secondary p-1">
      {filters.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={cn(
            "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200",
            filter === key
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {label}
          <span className="ml-2 text-xs opacity-70">({counts[key]})</span>
        </button>
      ))}
    </div>
  );
}
