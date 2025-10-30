"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Award,
  CircleUserRound,
  FileText,
  MoveUpRight,
  Stars,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  bio: string | null;
};

export default function Dashboard() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createClient();

      // Get the currently authenticated user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("Error fetching user:", userError);
        router.push("/login");
        return;
      }

      // Try to get the user's profile
      const { data, error } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, bio")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        // If profile doesn’t exist yet, redirect to profile setup page
        if (error.code === "PGRST116" /* no rows found */) {
          router.push("/update-profile");
          return;
        }
      }

      if (!data) {
        router.push("/update-profile");
        return;
      }

      setProfile(data);
      setLoading(false);
    };

    fetchProfile();
  }, [router]);

  const displayName = profile
    ? `${profile.first_name ?? ""} ${profile.last_name ?? ""}`.trim() ||
      "Anonymous"
    : "Loading...";

  const bio =
    profile?.bio ||
    "Research scientist exploring decentralized science, blockchain governance, and open data systems";

  return (
    <main className="w-full mt-24 p-6 space-y-12">
      <section className="flex justify-between items-center max-w-[1200px] mx-auto">
        <div>
          <h2 className="text-4xl">Hello, {loading ? "..." : displayName}</h2>
          {!loading && (
            <p className="text-white/60 mt-2 max-w-xl text-sm">{bio}</p>
          )}
        </div>

        <div className="rounded-full flex items-center gap-3 p-3 px-6 border-[0.5px] border-white/24">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
          <h4 className="text-sm">On Chain & Transparent</h4>
        </div>
      </section>

      {/* Stats */}
      <section className="flex justify-end gap-6 max-w-[1200px] mx-auto">
        <div className="w-max">
          <div className="flex items-baseline gap-6 justify-between">
            <div className="p-2 bg-primary/8 rounded-lg">
              <FileText className="text-primary" width={12} height={12} />
            </div>
            <p className="text-5xl">9</p>
          </div>
          <p className="text-xs pr-6 text-white/40 mt-1">Papers Published</p>
        </div>

        <div className="w-max">
          <div className="flex items-baseline gap-6 justify-between">
            <div className="p-2 bg-[#8330ED]/8 rounded-lg">
              <Award className="text-[#8330ED]" width={12} height={12} />
            </div>
            <p className="text-5xl">22</p>
          </div>
          <p className="text-xs pr-6 text-white/40 mt-1">Reviews Given</p>
        </div>

        <div className="w-max">
          <div className="flex items-baseline gap-6 justify-between">
            <div className="p-2 bg-[#FBC53A]/8 rounded-lg">
              <Stars className="text-[#FBC53A]" width={12} height={12} />
            </div>
            <p className="text-5xl">88</p>
          </div>
          <p className="text-xs pr-6 text-white/40 mt-1">Reputation Score</p>
        </div>
      </section>

      {/* Grid */}
      <section className="grid lg:grid-cols-4 gap-3 max-w-[1200px] mx-auto">
        <div className="aspect-square bg-white/4 border border-white/8 rounded-2xl flex items-center justify-center">
          <Link
            href="/update-profile"
            className="flex flex-col items-center gap-2"
          >
            <CircleUserRound width={64} height={64} />
            <p>Update Profile</p>
          </Link>
        </div>

        <div className="bg-white/4 p-3 rounded-2xl aspect-square border border-white/8 relative flex items-center justify-center">
          <div className="p-1 bg-[#D9D9D9] text-black rounded-full w-max ml-auto absolute top-3 right-3">
            <MoveUpRight width={12} height={12} />
          </div>

          <Link href="/publish" className="flex flex-col items-center gap-2">
            <CircleUserRound width={64} height={64} />
            <p>Publish</p>
          </Link>
        </div>

        <div className="bg-white/4 p-3 rounded-2xl aspect-square border border-white/8">
          <div className="p-1 bg-[#D9D9D9] text-black rounded-full w-max ml-auto">
            <MoveUpRight width={12} height={12} />
          </div>
        </div>

        <div className="bg-white/4 rounded-2xl row-span-2 border border-white/8"></div>
        <div className="bg-white/4 rounded-2xl aspect-square border border-white/8"></div>
        <div className="bg-white/4 rounded-2xl col-span-2 border border-white/8"></div>
      </section>
    </main>
  );
}
