import { filterNavbarMenu } from "../../constants/filterNavbarMenu.js";

function FilterNavbar({ activeCategory, setActiveCategory }) {
  return (
    <div className="relative z-99 bg-white/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-2">
        <div className="flex items-center lg:justify-between gap-5 overflow-x-auto scrollbar-hide whitespace-nowrap bg-[#F5F5F5] rounded px-4 py-1 shadow-[0_4px_6px_-4px_rgba(0,0,0,0.08)]">
          {filterNavbarMenu.map((item) => {
            const Icon = item.icon;

            const isActive = activeCategory === item.value;

            return (
              <button
                key={item.value}
                onClick={() => setActiveCategory(item.value)}
                className={`flex shrink-0 items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200

                  ${
                    isActive
                      ? "bg-white text-black shadow-sm"
                      : "text-gray-500 hover:text-black"
                  }
                `}
              >
                <Icon className="w-4 h-4" />

                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FilterNavbar;
