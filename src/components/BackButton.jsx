import { useNavigate } from 'react-router-dom'

function BackButton() {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 cursor-pointer 
      text-gray-600 hover:text-orange-500 
      transition hover:-translate-x-1"
    >
      <span className="text-base opacity-70">{'<'}</span>
      <span className="text-sm font-medium">Back</span>
    </div>
  )
}

export default BackButton