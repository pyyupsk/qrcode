import type { Dispatch, SetStateAction } from "react"

export type ColorPickerProps = {
  color: string
  setColor: Dispatch<SetStateAction<string>>
  className?: string
}
