import { profile } from "@/lib/actions/profile";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect, useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderFunctionArgs) {
  const profileId = params.profileId
  if(!profileId) {
    return redirect('/')
  }

  const Profile = profile.getByProfileId(profileId)

  return Profile;
}

export default function ProfilePage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Hello world</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}