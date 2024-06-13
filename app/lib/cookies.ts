import { collapsedCookie, layoutCookie } from "@/cookies.server";

export async function getSidebarCookies(cookieHeader: string | null) {
  const layout: { value: number[] } = await layoutCookie.parse(cookieHeader);
  const collapsed: { value: boolean } = await collapsedCookie.parse(
    cookieHeader
  );

  const sidebarCookies = { layout: layout, collapsed: collapsed };
  const headers: HeadersInit | undefined = [
    ["Set-Cookie", await layoutCookie.serialize({ value: [20, 80] })],
    ["Set-Cookie", await collapsedCookie.serialize({ value: false })],
  ];

  return {
    sidebarCookies,
    headers: !layout || !collapsed ? headers : undefined,
  };
}
