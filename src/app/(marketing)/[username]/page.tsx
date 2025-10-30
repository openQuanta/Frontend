import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";

type Props = {
  params: { username: string };
};

export default async function PublicProfilePage({ params }: Props) {
  const { username } = params;

  try {
    // ✅ Await the client creation
    const supabase = await createClient();

    // ✅ Fetch user profile by username
    const { data: profile, error } = await supabase
      .from("profiles")
      .select(
        "username, first_name, last_name, field_of_study, bio, updated_at"
      )
      .eq("username", username)
      .single();

    if (error || !profile) {
      console.error(error);
      notFound();
    }

    return (
      <main className="w-full max-w-[800px] mx-auto mt-24 py-24">
        <Card className="p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {profile.first_name} {profile.last_name}
            </CardTitle>
            <p className="text-muted-foreground">@{profile.username}</p>
          </CardHeader>

          <CardContent className="space-y-4 mt-4">
            {profile.field_of_study && (
              <p>
                <span className="font-semibold">Field of Study:</span>{" "}
                {profile.field_of_study}
              </p>
            )}

            {profile.bio && (
              <p className="text-muted-foreground whitespace-pre-wrap">
                {profile.bio}
              </p>
            )}

            <p className="text-xs text-muted-foreground">
              Last updated: {new Date(profile.updated_at).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </main>
    );
  } catch (err) {
    console.error("Unexpected error fetching profile:", err);
    notFound();
  }
}
