const Button = ({ title, onClick = () => {}, isbgThemeLight=false }) => {

  const baseClasses =
    "px-4 py-2 rounded-md transition font-medium";

  const darkClasses =
    "border border-[#ffd900] text-[#ffd900] hover:bg-[#ffd900] hover:text-[#282c34]";

  const lightClasses =
    "border border-[#282c34] text-[#282c34] hover:bg-[#282c34] hover:text-[#ffd900]";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${isbgThemeLight ?  lightClasses : darkClasses}`}
    >
      {title}
    </button>
  );
};

export default Button;
