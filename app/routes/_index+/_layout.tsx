import SiteLayout from "@/components/layouts/site-layout";
import { getSidebarCookies } from "@/lib/cookies";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie") ?? "";
  const { sidebarCookies, headers } = await getSidebarCookies(cookieHeader);
  return json({ ...sidebarCookies }, { headers });
}

export default function Layout() {
  const data = useLoaderData<typeof loader>();
  const defaultLayout = data?.layout ? data.layout.value : undefined;
  const defaultCollapsed = data?.collapsed ? data.collapsed.value : undefined;

  return (
    <SiteLayout
      user={{ name: "Renan Sui" }}
      page={<Outlet />}
      defaultLayout={defaultLayout}
      defaultCollapsed={defaultCollapsed}
      navCollapsedSize={4}
    />
  );
}
