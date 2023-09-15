import React, { useEffect } from "react";
import { useState } from "react";
import getCard from "./cardGenerator";
import BingoTracker from "./bingoTracker";
import { useBingoCounter } from "./context-api/bCountProvider";
import PlUid from "./plUid";
export default function BingoCard({ userId, turn, socket, setTurn ,room}) {
  
  const [row_col, setRow_Col] = useState([0, 0]);
  const { incBingoCount, resetCount, bingoCount } = useBingoCounter();
  const [bingoCard, loadBingoCard] = useState(getCard);
  // socket.on("iLose",()=>{
  //   console.log("i lost")
  // })
  socket.on("getPosition", async ({ value, turn }) => {
    console.log(value)
    await FindValue(value);
    await setTurn(turn);
  });

  function FindValue(value) {
    for (let i = 0; i < bingoCard.length; i++) {
      for (let j = 0; j < bingoCard.length; j++) {
        if (bingoCard[i][j].value == value) {
          setMarked(i, j);
        }
      }
    }
  }
  function setMarked(row, col) {
    loadBingoCard((bingoCard) => {
      const copy = [...bingoCard];
      copy[row][col] = { ...copy[row][col], isMarked: true };
      return copy;
    });
    setRow_Col([row, col]);
  }

  useEffect(() => {
    const [row, col] = row_col;

    let count = 0;
    for (let r = 0; r < bingoCard.length; r++) {
      if (bingoCard[r][col].isMarked == false) {
        break;
      } else if (
        r == bingoCard.length - 1 &&
        bingoCard[r][col].isMarked == true
      ) {
        count++;
      }
    }

    //row-wise check
    for (let cl = 0; cl < bingoCard.length; cl++) {
      if (bingoCard[row][cl].isMarked == false) break;
      else if (
        cl == bingoCard.length - 1 &&
        bingoCard[row][cl].isMarked == true
      ) {
        count++;
      }
    }
    // diagonal-wise
    if (row == col) {
      for (let i = 0; i < bingoCard.length; i++) {
        if (bingoCard[i][i].isMarked == false) break;
        else if (
          i == bingoCard.length - 1 &&
          bingoCard[i][i].isMarked == true
        ) {
          count++;
        }
      }
    }
    // second-diagonal-wise
    if (row + col == bingoCard.length - 1) {
      for (let i = 0, len = bingoCard.length - 1; i < bingoCard.length; i++) {
        if (bingoCard[i][len - i].isMarked == false) break;
        else if (
          i == bingoCard.length - 1 &&
          bingoCard[i][len - i].isMarked == true
        ) {
          count++;
        }
      }
    }
    incBingoCount(count);
  }, [bingoCard]);

  useEffect(() => {
    socket.emit("bingoCount", bingoCount,room);
  }, [bingoCount]);

  return (
    <div className="  z-0 bg-slate-950   flex  justify-center items-center h-screen ">
      <div className="w-64  rounded-sm p-2 m-auto  bg-gray-300  font-mono ring-8 ring-gray-600 ring-opacity-25 shadow-2xl shadow-white ">
        <BingoTracker />
        <div className=" my-4">
          {bingoCard.map((curRow, row) => (
            <div key={row} className="grid grid-cols-5">
              {curRow.map((num, col) => (
                <div
                  key={row - col}
                  className={`hover:cursor-pointer rounded-md outline-gray-700 p-2 m-1 border-gray-200 ${
                    num.isMarked
                      ? " bg-slate-700 text-white shadow-md shadow-black"
                      : " hover:opacity-75 shadow-sm shadow-black hover:text-black"
                  }`}
                  onClick={
                    num.isMarked || !turn
                      ? null
                      : () => {
                          setMarked(row, col, turn);
                          setTurn(false);
                          socket.emit("playerHasMarked", {
                            value: num.value,
                            turn,
                            bingoCount,
                          });
                        }
                  }
                >
                  <span className="text-xl">{num.value}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <PlUid userId={userId} />
      </div>
    </div>
  );
}
