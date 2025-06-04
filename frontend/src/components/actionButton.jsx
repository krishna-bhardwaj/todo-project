const ActionButton = ({ onClick, children }) => {
  return (
    <button
      className="rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-shadow duration-200 border-none h-full px-4 text-gray-700"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ActionButton;
