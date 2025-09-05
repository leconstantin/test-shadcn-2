'use client';
import { ArrowRightIcon, ChevronDownIcon, X } from 'lucide-react';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function SortArticles() {
  const [open, setOpen] = useState(false);
  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <button
          aria-label="open sort menu"
          className="flex cursor-pointer items-center gap-1 border-none bg-transparent p-0 text-foreground transition-all duration-300 hover:text-muted-foreground"
          type="button"
        >
          <span className="text-sm">Sort</span>
          {open ? (
            <X className="size-4" onClick={() => setOpen(false)} />
          ) : (
            <ChevronDownIcon className="size-4" />
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent className=" mt-3 ml-6 border-0 bg-background/40 px-6 backdrop-blur-lg supports-backdrop-blur:bg-background/90 md:mr-10">
        <div className="flex flex-col gap-4">
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="option-one" value="option-one" />
              <Label className="flex items-center gap-1 " htmlFor="option-one">
                <span className="text-sm">Newest</span>
                <ArrowRightIcon className="size-4" />
                <span className="text-sm">Oldest</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="option-two" value="option-two" />
              <Label className="flex items-center gap-1 " htmlFor="option-two">
                <span className="text-sm">Oldest</span>
                <ArrowRightIcon className="size-4" />
                <span className="text-sm">Newest</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="option-three" value="option-three" />
              <Label
                className="flex items-center gap-1 "
                htmlFor="option-three"
              >
                <span className="text-sm">Alphabetical</span>
                <span className="text-sm">(A-Z)</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="option-four" value="option-four" />
              <Label className="flex items-center gap-1 " htmlFor="option-four">
                <span className="text-sm">Alphabetical</span>
                <span className="text-sm">(Z-A)</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
      </PopoverContent>
    </Popover>
  );
}
