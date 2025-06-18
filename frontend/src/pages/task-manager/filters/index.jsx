import { Search } from "lucide-react";

const FilterButton = ({ children, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm rounded-full mx-1 border transition
      ${
        isSelected
          ? "bg-blue-100 border-blue-500 text-blue-700"
          : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
};

const Filters = ({
  selectedFilter,
  setSelectedFilter,
  searchQuery,
  setSearchQuery,
}) => {
  const filters = ["All", "Not Started", "In Progress", "Paused", "Completed"];

  return (
    <div className="w-full flex justify-between items-center px-4 py-3 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
      <div className="flex items-center">
        {filters.map((filter) => (
          <FilterButton
            key={filter}
            isSelected={selectedFilter === filter}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </FilterButton>
        ))}
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-[#282c34] focus:outline-none transition"
        />
        <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
      </div>
    </div>
  );
};

export default Filters;
