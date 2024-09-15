import Cell from "./Cell";
import "./Area.css"
import {useEffect, useState} from "react";

function Area() {
    let grid = []

    // Grid Variables
    const [highlighted, setHighlighted] = useState([]);
    const [firstWallPart, setFirst] = useState([]);
    const [secondWallPart, setSecond] = useState([]);
    const gridPack = [[highlighted, setHighlighted], [firstWallPart, setFirst], [secondWallPart, setSecond]];
    // Pawn Variables
    const [playerPawnCords, setPlayerPawnCords] = useState([4,8]);
    const [opponentPawnCords, setOppPawnCords] = useState([4,0]);
    const [playerTurn, setPlayerTurn] = useState(true);
    const pawnPack = [[playerPawnCords, setPlayerPawnCords],[opponentPawnCords,setOppPawnCords],[playerTurn,setPlayerTurn]];
    
    for (let i = 0; i < 9; i++) {
        let row = []
        for (let j = 0; j < 9; j++) {
            row.push(<Cell x={j} y={i} gridPack={gridPack} pawnPack={pawnPack}/>)
        }
        grid.push(<div className="row">{row}</div>)
    }
    return grid;
}
function valIncludes(parentArr, subArr) {
    for (const arr of parentArr) {
        if (subArr.length === arr.length) {
            let isAllSame = true
            for (let i = 0; i < subArr.length; i++) {
                if (arr[i] !== subArr[i]) {
                    isAllSame = false;
                    break;
                }
            }
            if (isAllSame) {
                return true;
            }
        }
    }
    return false;
}
export {valIncludes};
export default Area;
