"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListFilter, Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TransactionSearch({
  onSearch,
  onFilterChange,
  delay = 300,
}: {
  onSearch?: (value: string) => void;
  onFilterChange?: (filter: string) => void;
  delay?: number;
}) {
  const [query, setQuery] = useState("");
  const [debouncedValue] = useDebounce(query, delay);

  // Trigger callback when the debounced value updates
  useEffect(() => {
    onSearch?.(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <div className="w-full flex items-center gap-2  p-3 rounded-lg">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />

        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="pl-8 bg-[#1F2229] focus:none ring-0 border-[#313139] text-neutral-200"
        />
      </div>

      <Button
        size="icon"
        variant="outline"
        className="bg-[#1F2229] border-[#313139]"
      >
        <ListFilter className="h-4 w-4 text-neutral-300" />
      </Button>
    </div>
  );
}
