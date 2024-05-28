import '../App.css'

export default function Subject({ subject }) {

    return (
        <div>
            <div>{subject.image}</div>
            <div>{subject.formatted_name}</div>
        </div>
    )
}