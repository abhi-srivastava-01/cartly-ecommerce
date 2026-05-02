import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full pl-11 pr-4 py-2.5 
        bg-gray-100 border border-transparent 
        rounded-full text-sm text-gray-900
        outline-none"
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
    </div>
  );
}

export default SearchBar;
