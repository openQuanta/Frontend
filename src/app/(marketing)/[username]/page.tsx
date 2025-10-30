import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { profileSchema, type ProfileData } from "@/schemas/profile-schema";

export const revalidate = 600;

interface PublicProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function PublicProfilePage({
  params,
}: PublicProfilePageProps) {
  const { username } = await params;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (error || !data) {
    console.error("Profile not found:", error);
    notFound();
  }

  const parsed = profileSchema.safeParse(data);

  if (!parsed.success) {
    console.error("Invalid profile data:", parsed.error.format());
    notFound();
  }

  const profile: ProfileData = parsed.data;

  return (
    <main className="w-full max-w-[800px] mx-auto mt-24 py-24">
      <Card className="p-6 border border-white/10 bg-white/5 backdrop-blur">
        <CardHeader className="flex flex-col items-center text-center space-y-4">
          {profile.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt={`${profile.username}'s avatar`}
              width={100}
              height={100}
              className="rounded-full border border-white/10 object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center text-2xl font-semibold text-muted-foreground">
              {profile.first_name?.[0] ?? profile.username?.[0] ?? "?"}
            </div>
          )}

          <div>
            <CardTitle className="text-2xl font-bold">
              {profile.first_name || profile.last_name
                ? `${profile.first_name ?? ""} ${profile.last_name ?? ""}`
                : profile.username}
            </CardTitle>
            {profile.username && (
              <p className="text-muted-foreground">@{profile.username}</p>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4 mt-4 text-center">
          {profile.field_of_study && (
            <p>
              <span className="font-semibold">Field of Study:</span>{" "}
              {profile.field_of_study}
            </p>
          )}

          {profile.bio && (
            <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {profile.bio}
            </p>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
