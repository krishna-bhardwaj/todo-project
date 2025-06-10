const SecondaryActionButton = ({ icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      title={label}
      className="p-2 rounded-full hover:bg-gray-200 text-gray-900 w-10 h-10 flex justify-center items-center"
    >
      {icon}
    </button>
  );
};

export default SecondaryActionButton;
