import { Link } from "react-router-dom";

export default function GroupGrid(p) {
   return(
        <Link to={'/discussion'}>
       <ul className="flex flex-col divide-y divide-gray-300 overflow-y-auto">
            <li className="py-3 px-6 flex items-center space-x-4 hover:bg-gray-200">
                <img src="profile_image_url" alt="Profile" className="w-10 h-10 rounded-full" />
                <div className=" hover:cursor-pointer" >
                    <h2 className="text-lg font-semibold">group-name</h2>
                </div>
            </li>
        </ul>
        </Link>
   ) ;
}