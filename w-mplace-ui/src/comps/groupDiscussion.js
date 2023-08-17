import { useNavigate } from "react-router"
export default function GroupDis(params) {
    const dummyChats=['helo', 'or bhai kya haal','abe ja' ]
    return(
        <div className="flex-1 col-span-2"> 
         <div className="  py-4 px-6 border-b border-gray-300 flex items-center">
            <div className="ml-3 p-5 ">
                <h2 className="text-lg font-semibold">group</h2>
            </div>
          
         </div>
         <div className="">
                {dummyChats.map(chat=>
                    <div className=" text-left  m-6"><span className="bg-gray-200 p-2 rounded-md">{chat}</span></div>
                )}
           </div>
    </div>
    )
    
}