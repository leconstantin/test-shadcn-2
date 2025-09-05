import type { TMember } from "@/types";

export async function getMembers(): Promise<TMember[]> {
  const res = await fetch(`${process.env.CONVEX_SITE_URL}/members`);
  const teamMembers = res.json();
  if (!teamMembers) return [];
  return teamMembers;
}

export async function getMember(username: string): Promise<TMember | null> {
  const teamMembers = await getMembers();
  const teamMember = teamMembers.find((member) => member.username === username);
  if (!teamMember) return null;
  return teamMember;
}

export async function getMemberById(id: string): Promise<TMember | null> {
  const teamMembers = await getMembers();
  const teamMember = teamMembers.find((member) => member.id === id);
  if (!teamMember) return null;
  return teamMember;
}

// if is media-manager return Media Manager , if is author return Author, if is admin return Admin, if is ads-manager return Ads Manager
export function getRoleName(role: TMember["role"]) {
  if (role === "media-manager") return "Media Manager";
  if (role === "author") return "Author";
  if (role === "admin") return "Admin";
  if (role === "ads-manager") return "Ads Manager";
  return "Unknown";
}
