import '../App.css'
import Subject from './Subject'

export default function SectionDetails({ section }) {

    return (
        <div className="flex flex-col items-start">
            <h2 className="mb-2 text-xl font-medium text-gray-900 dark:text-white">{section.name}</h2>
            {section.description?.length > 0 && <span className="text-sm text-gray-500 dark:text-gray-400">{section.description}</span>}
            <div className="w-full grid grid-cols-3 md:grid-cols-5 gap-4">{section.subjects.map((x) => <Subject subject={x} key={x.id} />)}</div>
        </div>
    )
}