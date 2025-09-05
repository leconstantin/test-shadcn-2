import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { TMedia } from "@/types";
import { audioPlaceHolder } from "@/config/app";


export default function AudioCard({ title, slug, createdAt, group }: TMedia) {
  return (
    <Link
      className="group relative flex cursor-pointer flex-col gap-4 rounded-sm bg-background p-2"
      href={`/podcast/${slug}`}
      title={title}
    >
      <div className="relative overflow-hidden rounded-md ring ring-ring/10">
        <AspectRatio ratio={16 / 9}>
          <Image
            alt={title}
            className="w-full rounded-sm object-cover grayscale transition-all duration-300 hover:scale-105 group-hover:grayscale-75"
            height={500}
            priority
            src={audioPlaceHolder}
            width={500}
          />
        </AspectRatio>
      </div>
      <h2 className="text-pretty font-medium text-lg leading-6 tracking-tight">
        {title}
      </h2>

      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 font-medium text-sm">
        <p className="text-wrap">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </p>
        <p className="text-muted-foreground text-sm">{group}</p>
      </div>
    </Link>
  );
}
