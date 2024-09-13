interface LoadingProps {
  isLoading?: boolean
}

export function Loading({ isLoading = true }: LoadingProps) {
  return (
    <div
      data-loading={isLoading}
      className="data-[loading=false]:hidden w-full h-screen flex justify-center items-center fixed z-50 bg-black/35"
    >
      <div className="w-16 h-16 border-2 rounded-full animate-spin border-t-transparent border-r-transparent border-b-primary border-l-primary"></div>
    </div>
  )
}
