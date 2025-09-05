import { PageContainer } from '@/components/custom/page-container';
import { getMembers } from '@/data/staff';
import StaffCard from '@/features/staff/staff-card';

export default async function StaffList() {
  const members = await getMembers();
  return (
    <PageContainer className="py-8 pb-20 md:py-16">
      <section className="bg-background dark:bg-transparent">
        <div className="mx-auto max-w-5xl border-t px-6">
          <span className="-ml-6 -mt-3.5 block w-max px-6 text-caption ">
            Team
          </span>
          <div className="mt-12 gap-4 sm:grid sm:grid-cols-2 md:mt-24">
            <div className="sm:w-2/5">
              <h2 className="font-bold text-3xl sm:text-4xl">Our dream team</h2>
            </div>
            <div className="mt-6 sm:mt-0">
              <p>
                During the working process, we perform regular fitting with the
                readers because he is the only person who can feel whether a new
                suit fits or not.
              </p>
            </div>
          </div>

          <div className="mt-12 md:mt-24">
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((member, index) => (
                <StaffCard
                  index={index}
                  key={member.username}
                  member={member}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
