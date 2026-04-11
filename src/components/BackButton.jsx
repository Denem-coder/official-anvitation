import { useNavigate } from 'react-router-dom'

function BackButton() {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => {
        if (window.history.length > 1) {
          navigate(-1)
        } else {
          navigate('/services')
        }
      }}
      className="flex items-center gap-1 text-gray-600 hover:text-black text-sm transition"
    >
      {/* Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>

      {/* Text */}
      <span>Back</span>
    </button>
  )
}

export default BackButton