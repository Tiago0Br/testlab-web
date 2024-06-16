import { Input, InputProps } from "@/components";

export function CustomInput (props: InputProps) {
  return (
    <Input
      className="bg-transparent text-white rounded-none border-0 border-b-2 placeholder:text-[#999]"
      {...props}
    />
  )
}
