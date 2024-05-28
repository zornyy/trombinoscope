import placeholder from "../assets/placeholder.webp"

export default function Subject({ subject }) {
    return (
        <div className="flex flex-col items-center pb-2">
            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={subject.image?.length > 0 ? `${import.meta.env.VITE_BACKEND_URL}/api/files/Subject/${subject.id}/${subject.image}` : placeholder} />
            <h5 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">{subject.formatted_name}</h5>
            {subject.description?.length > 0 && <span className="text-sm text-gray-500 dark:text-gray-400">{subject.description}</span>}
        </div>
    )
}