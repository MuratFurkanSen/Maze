import "./Cell.css"
import {useEffect, useState, useRef} from "react";
import {valIncludes} from "./Area"
import Pawn from "./Pawn";

function Cell(props) {
    // Variables for states
    const [[highlighted, setHighlighted], [firstWallPart, setFirst], [secondWallPart, setSecond]] = props.gridPack
    const [[playerPawnCords, setPlayerPawnCords], [opponentPawnCords, setOppPawnCords], [playerTurn, setPlayerTurn]] = props.pawnPack;
    const [isVerWall, setVerWall] = useState(false);
    const [isHorWall, setHorWall] = useState(false);
    let isNewWall = useRef(false);

    let arrID = [props.x, props.y];
    // Size According to Contents

    let height = props.y < 8 ? 75 : 70;
    let width = props.x < 8 ? 75 : 70;
    // --Handlers
    // -Line

    const handleLineMouseEnter = (event) => {
        console.log(event.target.parentNode.id, "Entered")
        const temp_first = [...firstWallPart]
        const temp_second = [...secondWallPart]
        if (event.target.className.startsWith("vertical-line")) {
            if (arrID[1] < 8 && !valIncludes(firstWallPart, [arrID[0], arrID[1] + 1, 0])) {
                isNewWall.current = true
                temp_first.push([...arrID, 0]);
                temp_second.push([arrID[0], arrID[1] + 1, 0])
            }
        } else {
            if (arrID[0] < 8 && !valIncludes(firstWallPart, [arrID[0] + 1, arrID[1], 1])) {
                isNewWall.current = true
                temp_first.push([...arrID, 1]);
                temp_second.push([arrID[0] + 1, arrID[1], 1])
            }
        }

        setFirst(temp_first);
        setSecond(temp_second);
    }
    const handleLineMouseLeave = (event) => {
        console.log(event.target.parentNode.id, "Leaved", isNewWall.current)
        if (isNewWall.current) {
            console.log("Wtf")
            const temp_first = [...firstWallPart]
            const temp_second = [...secondWallPart]
            console.log(temp_first,temp_second)
            temp_first.pop()
            temp_second.pop()

            setFirst(temp_first)
            setSecond(temp_second)

            isNewWall.current = false
        }
    }
    const handleLineClick = (event) => {
        if (!(arrID[0] > 8 || arrID[1] > 8)) {
            if (event.target.className.startsWith("vertical-line")) {
                setVerWall(true)
            } else {
                setHorWall(true)
            }
            setPlayerTurn(!playerTurn)
        }
    }

    // -Square
    const handleSquareClick = (event) => {
        if (event.target.className.includes("highlighted")) {
            const cellID = event.target.parentNode.id
            const [x, y] = cellID.replace("Cell#", "").split("-").map(Number)
            if (playerTurn) {
                setPlayerPawnCords([x, y])
            } else {
                setOppPawnCords([x, y])
            }
            setHighlighted([])
            setPlayerTurn(!playerTurn)

        }

    }

    // -Update on SecondWallPart
    useEffect(() => {
        if (valIncludes(secondWallPart, [...arrID, 0])) {
            setVerWall(true)
        }
        if (valIncludes(secondWallPart, [...arrID, 1])) {
            setHorWall(true)
        }
    }, [secondWallPart])

    // Element Variables
    const verWallState = valIncludes(firstWallPart, arrID.concat([0])) || valIncludes(secondWallPart, arrID.concat([0])) ? "wall" : "";
    const horWallState = valIncludes(firstWallPart, arrID.concat([1])) || valIncludes(secondWallPart, arrID.concat([1])) ? "wall" : "";
    const dotWallState = valIncludes(firstWallPart, arrID.concat([0])) || valIncludes(firstWallPart, arrID.concat([1])) ? "wall" : "";

    // --Elements
    const square = <div className={`square ${valIncludes(highlighted, arrID) ? "highlighted" : ""}`}
                        onClick={handleSquareClick}>
        {props.x === playerPawnCords[0] && props.y === playerPawnCords[1] ?
            <Pawn className={`player ${playerTurn ? "turn" : ""}`} gridPack={props.gridPack}/> : null}
        {props.x === opponentPawnCords[0] && props.y === opponentPawnCords[1] ?
            <Pawn className={`opponent ${playerTurn ? "" : "turn"}`} gridPack={props.gridPack}/> : null}

    </div>
    const verticalLine = props.x < 8 ?
        <div className={`vertical-line ${verWallState}`}
             onMouseEnter={isVerWall ? null : handleLineMouseEnter}
             onMouseLeave={isVerWall ? null : handleLineMouseLeave}
             onClick={isVerWall ? null : handleLineClick}/> : ""

    const horizontalLine = props.y < 8 ?
        <div className={`horizontal-line ${horWallState}`}
             onMouseEnter={isHorWall ? null : handleLineMouseEnter}
             onMouseLeave={isHorWall ? null : handleLineMouseLeave}
             onClick={isHorWall ? null : handleLineClick}/> : ""

    const dot = props.x < 8 && props.y < 8 ? <div className={`dot ${dotWallState}`}></div> : ""

    return <div id={`Cell#${props.x}-${props.y}`} className="cell" style={{width: width, height: height}}>
        {square}
        {verticalLine}
        {horizontalLine}
        {dot}
    </div>

}

export default Cell;