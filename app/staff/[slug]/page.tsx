import { format } from 'date-fns';
import { MailIcon } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PageContainer } from '@/components/custom/page-container';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getMember, getMembers, getRoleName } from '@/data/staff';
import StaffArticles from '@/features/staff/staff-articles';
import StaffCard from '@/features/staff/staff-card';
import { getSocialIcon } from '@/lib/utils';
import { avatarPlaceHolder, staffPlaceHolder } from '@/config/app';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = await getMember(slug);
  if (!member) {
    return notFound();
  }
  return {
    title: `${member.name} - ${getRoleName(member.role)}`,
    description: member.bio?.slice(0, 100),
  };
}
export default async function StaffPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = await getMember(slug);
  const members = await getMembers();
  const otherMembers = members.filter((m) => m.username !== slug);
  if (!member) {
    return notFound();
  }
  return (
    <PageContainer>
      <div className="flex flex-col gap-20 px-0 md:px-4 lg:px-6">
        <div className="group flex flex-col gap-10 overflow-hidden py-10 md:gap-14">
          <div className="flex flex-col gap-2 md:gap-4">
            <div className="relative">
              <Image
                alt="team member"
                className="h-[12rem] w-full rounded-md object-cover object-center grayscale transition-all duration-500 hover:grayscale-0 group-hover:rounded-xl md:h-[22.5rem]"
                height="1239"
                src={member.coverImage || staffPlaceHolder}
                width="826"
              />
              <div className="-bottom-[40%] -translate-x-1/2 -translate-y-1/2 absolute left-1/2 z-20 rounded-full bg-background p-1.5">
                <Avatar className="size-16 md:size-20 lg:size-30">
                  <AvatarImage src={member.avatarUrl || avatarPlaceHolder} />
                  <AvatarFallback>{member.username?.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
            </div>

            <div className="px-1 py-10 sm:py-0 md:px-2">
              <div className="flex justify-between">
                <h3 className="font-medium text-base capitalize transition-all duration-500 group-hover:tracking-wider">
                  {member.name}
                </h3>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="inline-block text-muted-foreground text-sm ">
                  {getRoleName(member.role)}
                </span>

                <p className="inline-block text-muted-foreground text-sm tracking-wide ">
                  Joined {format(new Date(member._creationTime), 'MMMM yyyy')}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 md:flex-row md:gap-14">
            <div className="flex-2">
              <p className="mt-6 text-pretty text-lg text-primary/90 tracking-tight">
                {member.bio}
              </p>
            </div>
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Social Medias</CardTitle>
                <CardDescription>
                  You can find me on social medias.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-2">
                  {member.socialLinks?.map((link) => {
                    const Icon = getSocialIcon(link.name);
                    return (
                      <li key={link.url}>
                        <a
                          className="flex items-center gap-2"
                          href={link.url}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <Icon className="size-4" />
                          <span className="text-sm">{link.name}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <a
                    className="flex w-full items-center gap-2"
                    href={`mailto:${member.email}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <MailIcon />
                    Send Email
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        <StaffArticles />
        <div className="flex flex-col gap-10 ">
          <h2 className="font-medium text-3xl sm:text-4xl">
            Other team members
          </h2>
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 ">
            {otherMembers.map((m, index) => (
              <StaffCard index={index} key={m.username} member={m} />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
