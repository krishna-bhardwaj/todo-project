const Input = ({...props}) => {
    return (
        <div className="flex flex-col gap-2">
            {
                props.label && <label className="text-sm font-medium text-gray-700">{props.label}</label>
            }
            <input
                onChange={props.onChange}
                name={props.name}
                type={props.type}
                required={props.required}
                placeholder={props.placeholder}
                minLength={props.minLength}
                defaultChecked={props.defaultChecked}
                className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#282c34] transition ${props.className}`}
            />
        </div>);
}

export default Input;