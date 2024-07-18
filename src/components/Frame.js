import "./Frame.css"

function Frame(props) {
    return <div className="outer-frame">
        <div className="inner-frame">
            {props.children}
        </div>
    </div>

}

export default Frame;