import { Search } from "lucide-react";
import { TASK_ACTIONS, TASK_STATUS } from "../../../constants";
import { useEffect, useRef, useState } from "react";
import { getLastActions } from "../../../utils/task";
import { taskApi } from "../../../services";

const FilterButton = ({ title, isSelected, onClick, count }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm rounded-full mx-1 border transition whitespace-nowrap flex gap-1 items-center
      ${
        isSelected
          ? "bg-[#282c34] text-white"
          : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
      }`}
    >
      <span>{title}</span>
      <span
        className={`bg-[#282c34] text-xs px-1 rounded-xl flex items-center justify-center text-white ${
          isSelected && "bg-[#ffd900] !text-[#282c34]"
        }`}
      >
        {count ?? "0"}
      </span>
    </button>
  );
};

const Filters = ({ filterAndSearchText, setFilterAndSearchText }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const timeOutRef = useRef();

  const { data: summary } = taskApi.useGetSummaryQuery();

  const getTaskCountForStatus = (status) => {
    switch (status) {
      case TASK_STATUS.NOT_STARTED:
        return summary?.[TASK_ACTIONS.CREATE] || 0;
      case TASK_STATUS.PAUSED:
        return summary?.[TASK_ACTIONS.PAUSE] || 0;
      case TASK_STATUS.IN_PROGRESS:
        return (
          (summary?.[TASK_ACTIONS.START] || 0) +
          (summary?.[TASK_ACTIONS.RESUME] || 0)
        );
      case TASK_STATUS.COMPLETED:
        return summary?.[TASK_ACTIONS.COMPLETE];
      default:
        return 0;
    }
  };

  const taskStatuses = Object.values(TASK_STATUS).map((status) => ({
    title: status,
    count: getTaskCountForStatus(status),
  }));

  const handleFilterClick = (title) => {
    if (selectedFilters.includes(title)) {
      setSelectedFilters((prev) => prev.filter((item) => item !== title));
    } else setSelectedFilters((prev) => [...prev, title]);
  };

  const handleSearchTextChange = (e) => {
    if (timeOutRef.current) clearTimeout(timeOutRef.current);
    timeOutRef.current = setTimeout(() => {
      const searchText = e.target.value;
      if (!searchText) {
        setFilterAndSearchText((prev) => ({
          ...prev,
          searchText: undefined,
        }));
        return;
      }
      setFilterAndSearchText((prev) => ({
        ...prev,
        searchText: e.target.value,
      }));
    }, 500);
  };

  useEffect(() => {
    let newLastActions = [];

    selectedFilters.forEach((item) => {
      newLastActions = [...newLastActions, ...getLastActions(item)];
    });

    if (newLastActions.length === 0) newLastActions = undefined;

    if (
      JSON.stringify(newLastActions) ===
      JSON.stringify(filterAndSearchText?.status)
    )
      return;

    setFilterAndSearchText((prev) => ({
      ...prev,
      status: newLastActions,
    }));
  }, [
    selectedFilters,
    setFilterAndSearchText,
    filterAndSearchText?.lastActions,
  ]);

  return (
    <div className="w-full flex justify-between items-center px-4 py-3 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
      <div className="flex items-center">
        {taskStatuses.map(({ title, count }) => (
          <FilterButton
            key={title}
            isSelected={selectedFilters.includes(title)}
            onClick={() => handleFilterClick(title)}
            title={title}
            count={count}
          />
        ))}
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search tasks..."
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-[#282c34] focus:outline-none transition flex-1"
          onChange={handleSearchTextChange}
        />
        <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
      </div>
    </div>
  );
};

export default Filters;
