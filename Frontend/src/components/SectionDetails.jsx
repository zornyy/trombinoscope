import '../App.css'
import Subject from './Subject'

export default function SectionDetails({ section }) {

    return (
        <div>
            <div>{section.name}</div>
            <div>{section.subjects.map((x) => <Subject subject={x} key={x.id} />)}</div>
        </div>
    )
}