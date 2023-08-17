import GroupGrid from "./groupGrid";

export default function ChatsAside(params) {
  return (
    <div className=" h-screen border-gray-300 border w-full col-span-1">
      <div className=" bg-white border-r border-gray-300">
        <div className="py-4 px border-b border-gray-300">
          <h1 className="text-xl font-semibold">WhatsApp</h1>
        </div>
        <GroupGrid/>
      </div>
    </div>
  );
}
