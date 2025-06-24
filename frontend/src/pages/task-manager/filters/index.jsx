import { Search } from "lucide-react";
import { TASK_STATUS } from "../../../constants";
import { useEffect, useState } from "react";
import { getLastActions } from "../../../utils/task";

const FilterButton = ({ title, isSelected, onClick, count }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm rounded-full mx-1 border transition whitespace-nowrap flex gap-1 items-center
      ${
        isSelected
          ? "bg-blue-100 border-blue-500 text-blue-700"
          : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
      }`}
    >
      <span>{title}</span>
      <span className=" bg-[#282c34] text-xs px-1 rounded-xl flex items-center justify-center text-white">
        {count ?? "99"}
      </span>
    </button>
  );
};

const Filters = ({ filterAndSearchText, setFilterAndSearchText }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const taskStatuses = Object.values(TASK_STATUS);

  const handleFilterClick = (title) => {
    if (selectedFilters.includes(title)) {
      setSelectedFilters((prev) => prev.filter((item) => item !== title));
    } else setSelectedFilters((prev) => [...prev, title]);
  };

  useEffect(() => {
    let newLastActions = [];

    selectedFilters.forEach((item) => {
      newLastActions = [...newLastActions, ...getLastActions(item)];
    });

    if (newLastActions.length === 0) newLastActions = undefined;

    if (
      JSON.stringify(newLastActions) ===
      JSON.stringify(filterAndSearchText?.lastActions)
    )
      return;

    setFilterAndSearchText((prev) => ({
      ...prev,
      lastActions: newLastActions,
    }));
  }, [
    selectedFilters,
    setFilterAndSearchText,
    filterAndSearchText?.lastActions,
  ]);

  return (
    <div className="w-full flex justify-between items-center px-4 py-3 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
      <div className="flex items-center">
        {taskStatuses.map((title) => (
          <FilterButton
            key={title}
            isSelected={selectedFilters.includes(title)}
            onClick={() => handleFilterClick(title)}
            title={title}
          />
        ))}
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search tasks..."
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-[#282c34] focus:outline-none transition flex-1"
        />
        <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
      </div>
    </div>
  );
};

export default Filters;
