const Input = ({type="text",required=false,placeholder="Enter", minLength, label}) => {
    return (
        <div className="flex flex-col gap-2">
            {
                label && <label className="text-sm font-medium text-gray-700">{label}</label>
            }
            <input
                type={type}
                required={required}
                placeholder={placeholder}
                minLength={minLength}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#282c34] transition" 
            />
        </div>);
}

export default Input;