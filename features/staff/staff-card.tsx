import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { staffPlaceHolder } from "@/config/app";
import { getRoleName } from "@/data/staff";
import type { TMember } from "@/types";

export default function StaffCard({
  member,
  index,
}: {
  member: TMember;
  index: number;
}) {
  return (
    <Link
      className="group overflow-hidden"
      href={`/staff/${member.username}`}
      key={member.username}
    >
      <Image
        alt="team member"
        className="h-96 w-full rounded-md object-cover object-top grayscale transition-all duration-500 hover:grayscale-0 group-hover:h-[22.5rem] group-hover:rounded-xl"
        height="1239"
        src={member.coverImage || staffPlaceHolder}
        width="826"
      />
      <div className="px-2 pt-2 sm:pt-4 sm:pb-0">
        <div className="flex justify-between">
          <h3 className="font-medium text-base transition-all duration-500 group-hover:tracking-wider">
            {member.name}
          </h3>
          <span className="text-xs">_0{index + 1}</span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="inline-block translate-y-6 text-muted-foreground text-sm opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            {getRoleName(member.role)}
          </span>
          <p className="inline-block translate-y-8 text-muted-foreground text-sm tracking-wide opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:text-primary-600 group-hover:opacity-100 dark:group-hover:text-primary-400">
            Joined {format(new Date(member._creationTime), "MMMM yyyy")}
          </p>
        </div>
      </div>
    </Link>
  );
}
