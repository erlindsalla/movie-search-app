import React, { useState } from "react";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  initialValue?: string;
  placeholder?: string;
  isLoading?: boolean;
}

const SearchBar = ({
  onSearch,
  initialValue = "",
  placeholder = "Search for movies...",
  isLoading = false,
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState<string>(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() && !isLoading) {
      onSearch(searchTerm);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const debounced = useDebouncedCallback((value) => {
    if (value.trim().length > 1) {
      onSearch(value);
    }
  }, 1000);

  return (
    <div className="mb-8">
      <div className="flex shadow-md rounded-lg overflow-hidden">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            //changes requested on tech review
            debounced(e.target.value);
          }}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
          className="flex-grow p-4 focus:outline-none"
          disabled={isLoading}
          aria-label="Search input"
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading || !searchTerm.trim()}
          className={`px-6 py-4 flex items-center transition-colors ${
            isLoading || !searchTerm.trim()
              ? "bg-blue-400 cursor-not-allowed text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
          aria-label="Search button"
        >
          <Search size={20} className="mr-2" />
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
