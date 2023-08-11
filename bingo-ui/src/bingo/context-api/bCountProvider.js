import React, {createContext,useContext,useState} from "react";
import { useNavigate } from "react-router";
const BingoCounterContext = createContext();
export function BingoCounterProvider({children}){
    const nevigate=useNavigate();
    const [bingoCount,setBingoCount]= useState(0);
    const incBingoCount=(count)=>{
        if((count+bingoCount)>=5)
        {
            nevigate('/')
            setBingoCount(5);
        }
            else{
                
                setBingoCount(bingoCount+count);   
            }
    }
    const resetCount=()=>{
        setBingoCount(0);
    }
    const contextValue={
        bingoCount,
        incBingoCount,
        resetCount
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