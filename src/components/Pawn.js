import "./Pawn.css"
import {valIncludes} from "./Area";

function Pawn(props){

    const [[highlighted, setHighlighted], [firstWallPart, setFirst], [secondWallPart, setSecond]] = props.gridPack
    const handleClick = (event) => {
        if (!event.target.classList.contains("turn")) {
            return;
        }
        if (highlighted.length !== 0){
            setHighlighted([])
            return;
        }
        const cellID = event.target.parentNode.parentNode.id
        const [x, y] = cellID.replace("Cell#", "").split("-").map(Number)

        const temp = [...highlighted]
        if (y>0&&!valIncludes(firstWallPart, [x, y-1, 1])&&!valIncludes(secondWallPart, [x, y-1, 1])){
            temp.push([x,y-1])
        }
        if (x<8&&!valIncludes(firstWallPart, [x, y, 0])&&!valIncludes(secondWallPart, [x, y, 0])){
            temp.push([x+1,y])
        }
        if (y<8&&!valIncludes(firstWallPart, [x, y, 1])&&!valIncludes(secondWallPart, [x, y, 1])){
            temp.push([x,y+1])
        }
        if (x>0&&!valIncludes(firstWallPart, [x-1, y, 0])&&!valIncludes(secondWallPart, [x-1, y, 0])){
            temp.push([x-1,y])
        }
        setHighlighted(temp)
    }

    return <div className={`circle-button ${props.className}`} onClick={handleClick}/>;
}

export default Pawn;