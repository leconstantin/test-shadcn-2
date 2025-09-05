'use client';
import { X } from 'lucide-react';
import { useState } from 'react';
import { PiSlidersHorizontalBold } from 'react-icons/pi';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const years = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016];
export default function FilterArticles() {
  const [open, setOpen] = useState(false);
  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <button
          aria-label="Open filter menu"
          className="flex cursor-pointer items-center gap-1 border-none bg-transparent p-0 text-foreground transition-all duration-300 hover:text-muted-foreground"
          type="button"
        >
          <span className="text-sm">Filter</span>
          {open ? (
            <X className="size-4" onClick={() => setOpen(false)} />
          ) : (
            <PiSlidersHorizontalBold className="size-4" />
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent className="mt-3 ml-6 flex flex-col gap-6 border-0 bg-background/40 px-6 backdrop-blur-lg supports-backdrop-blur:bg-background/90 md:mr-10 lg:min-w-sm">
        <p className="font-medium text-base text-muted-foreground tracking-tight">
          Year
        </p>
        <div className="grid grid-cols-2 gap-4">
          {years.map((year) => (
            <div className="cursor-pointer" key={year}>
              <div className="flex items-center gap-3">
                <Checkbox id={year.toString()} />
                <Label htmlFor={year.toString()}>{year}</Label>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
