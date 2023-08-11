import React, {createContext,useContext,useState} from "react";
const BingoCounterContext = createContext();
export function BingoCounterProvider({children}){
    const [bingoCount,setBingoCount]= useState(0);
    const incBingoCount=()=>{
        setBingoCount(bingoCount+1);
    }
    const contextValue={
        bingoCount,
        incBingoCount
    }
    return(
        <BingoCounterContext.Provider value={contextValue}>
            {children}
        </BingoCounterContext.Provider>
    );
} 
export function useBingoCounter(){
    return useContext(BingoCounterContext)
}