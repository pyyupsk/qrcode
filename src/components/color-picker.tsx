"use client"

import { Paintbrush } from "lucide-react"

import type { ColorPickerProps } from "@/types"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { colors } from "@/constants/colors"
import { cn } from "@/lib/utils"

export function ColorPicker({ color, setColor, className }: Readonly<ColorPickerProps>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[220px] justify-start text-left font-normal",
            !color && "text-muted-foreground",
            className,
          )}
        >
          <div className="flex w-full items-center gap-2">
            {color ? (
              <div
                className="h-4 w-4 rounded !bg-cover !bg-center transition-all"
                style={{ background: color }}
              ></div>
            ) : (
              <Paintbrush className="h-4 w-4" />
            )}
            <div className="flex-1 truncate">{color || "Pick a color"}</div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="mt-0 flex w-full flex-wrap gap-1">
          {colors.map((s) => (
            <button
              key={s}
              style={{ background: s }}
              className="h-6 w-6 cursor-pointer rounded-md border-0 p-0 active:scale-105"
              onClick={() => setColor(s)}
              aria-label={`Select color ${s}`}
            />
          ))}
        </div>

        <Input
          id="custom"
          value={color}
          className="col-span-2 mt-4 h-8"
          onChange={(e) => setColor(e.currentTarget.value)}
        />
      </PopoverContent>
    </Popover>
  )
}
