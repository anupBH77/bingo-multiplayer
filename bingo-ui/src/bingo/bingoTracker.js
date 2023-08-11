import { useState } from "react"
import { useBingoCounter } from "./context-api/bCountProvider"

export default function BingoTracker() {
    const {bingoCount}= useBingoCounter()
    const bingoChars=['B','I',   'N', 'G'  , 'O']

    return (
        <div className={`grid grid-cols-5 my-4 bg-red-500 p-1 rounded-md`}>
           
            {bingoChars.map((value,index)=><div key={index} className={`${index==bingoCount-1?"bg-white":""} rounded-md p-1`}> {value} </div>)}
        </div>

    )
    
}