import { Link } from "react-router-dom"

const NavigationLink = ({title, path, ...props}) => {
    return  (
        <Link 
            className="text-[#282c34] font-medium p-1 rounded-md hover:text-[#ffd900] hover:bg-[#282c34] mx-1"
            to = {path}
            onClick={props.onClick}
        >
            {title}
        </Link>
    )
}

export default NavigationLink;