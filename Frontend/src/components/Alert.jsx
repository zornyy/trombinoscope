import "../App.css"

export default function Alert(props) {

    return(
        <div className="Alert">
            <h4>Are you sure ?</h4>
            <div className="buttons">
                <button className="button" onClick={props.cancel}>Cancel</button>
                <button className="button" onClick={props.continue}>Continue</button>
            </div>
        </div>
    )
}