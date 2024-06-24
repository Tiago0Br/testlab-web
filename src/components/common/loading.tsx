interface LoadingProps {
  isLoading?: boolean
}

export function Loading({ isLoading }: LoadingProps) {
  return (
    <>
      {isLoading && (
        <div className="w-full h-screen flex justify-center items-center fixed z-1 bg-black/35">
          <div
            className="w-16 h-16 border-2 rounded-full animate-spin 
          border-t-transparent border-r-transparent border-b-green-500 border-l-green-500"
          ></div>
        </div>
      )}
    </>
  )
}
