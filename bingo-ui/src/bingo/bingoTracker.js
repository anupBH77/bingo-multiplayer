import { useState } from "react"
import { useBingoCounter } from "./context-api/bCountProvider"

export default function BingoTracker() {
    const {bingoCount}= useBingoCounter()
    const bingoChars=['B','I',   'N', 'G'  , 'O']

    return (
        <div className={` opacity-100 z-10 font-mono font-semibold text-lg text-slate-700 grid grid-cols-5 my-4 ${"bg-green-400"} p-1 rounded-lg mx-1 shadow-sm shadow-black`}>
            {bingoChars.map((value,index)=><div key={index} className={`${index==bingoCount-1?` bg-slate-800 text-slate-100 `:""} rounded-sm p-1`}> {value} </div>)}
        </div>

    )
    
}