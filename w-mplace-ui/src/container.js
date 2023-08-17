import ChatsAside from "./comps/chatsAside";
import GroupDis from "./comps/groupDiscussion";
import GroupGrid from "./comps/groupGrid";
import { Routes,Route } from "react-router-dom";
export function  Container(){
    return(
        <div className=" grid grid-cols-3">
            <ChatsAside/>
            <Routes>
            <Route path="/" element={<h1>watsapp web</h1>}/>
           <Route path="/discussion" element={ <GroupDis/>}/>
            </Routes>
        {/* <div className="flex h-screen ">
    <div className="w-1/4 bg-white border-r border-gray-300">
        <div className="py-4 px-6 border-b border-gray-300">
            <h1 className="text-xl font-semibold">WhatsApp</h1>
        </div>
        <GroupGrid/>
    </div>
   
        
    <div className="flex-1 bg-white ">
        <div className="py-4 px-6 border-b border-gray-300 flex items-center fixed  w-full ">
            <img src="profile_image_url" alt="Profile" className="w-10 h-10 rounded-full"/>
            <div className="ml-3">
                <h2 className="text-lg font-semibold">Contact Name</h2>
                <p className="text-sm text-gray-500">Online</p>
            </div>
        </div>
        

        <div className="flex-1 p-6 overflow-y-auto">
            <div className="flex mb-4">
                <div className="bg-gray-200 py-2 px-4 rounded-lg max-w-lg">
                    <p className="text-sm">This is a message from the contact.</p>
                </div>
            </div>
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
            <div className="flex mb-4">
                <div className="bg-gray-200 py-2 px-4 rounded-lg max-w-lg">
                    <p className="text-sm">This is a message from the contact.</p>
                </div>
            </div>
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
            <div className="flex mb-4">
                <div className="bg-gray-200 py-2 px-4 rounded-lg max-w-lg">
                    <p className="text-sm">This is a message from the contact.</p>
                </div>
            </div>
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
            <div className="flex mb-4">
                <div className="bg-gray-200 py-2 px-4 rounded-lg max-w-lg">
                    <p className="text-sm">This is a message from the contact.</p>
                </div>
            </div>
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
            <div className="flex mb-4">
                <div className="bg-gray-200 py-2 px-4 rounded-lg max-w-lg">
                    <p className="text-sm">This is a message from the contact.</p>
                </div>
            </div>
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
            <div className="flex mb-4">
                <div className="bg-gray-200 py-2 px-4 rounded-lg max-w-lg">
                    <p className="text-sm">This is a message from the contact.</p>
                </div>
            </div>
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
            <div className="flex mb-4">
                <div className="bg-gray-200 py-2 px-4 rounded-lg max-w-lg">
                    <p className="text-sm">This is a message from the contact.</p>
                </div>
            </div>
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
            <div className="flex mb-4">
                <div className="bg-gray-200 py-2 px-4 rounded-lg max-w-lg">
                    <p className="text-sm">This is a message from the contact.</p>
                </div>
            </div>
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
            <div className="flex mb-4">
                <div className="bg-gray-200 py-2 px-4 rounded-lg max-w-lg">
                    <p className="text-sm">This is a message from the contact.</p>
                </div>
            </div>
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
            <div className="flex mb-4">
                <div className="bg-gray-200 py-2 px-4 rounded-lg max-w-lg">
                    <p className="text-sm">This is a message from the contact.</p>
                </div>
            </div>
        </div>
        
      
    </div>
</div> */}
</div>
    );
}