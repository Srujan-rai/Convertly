import { PuffLoader } from "react-spinners"

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <PuffLoader color="#8B5CF6" size={100} />
    </div>
  )
}

