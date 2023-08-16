export default function PlUid(props) {
    return(
        <div className=" text-slate-800 text-lg font-semibold bg-gray-300 p-2 m-2 outline outline-1 outline-gray-600 rounded-sm">
            <span>{props.userId}</span>
        </div>
    )
}