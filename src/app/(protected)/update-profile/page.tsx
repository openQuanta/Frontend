"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { profileSchema, ProfileData } from "@/schemas/profile-schema";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function UpdateProfile() {
  const supabase = createClient();
  const router = useRouter();

  const [formData, setFormData] = useState<Partial<ProfileData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  // Fetch current user and profile
  useEffect(() => {
    const loadProfile = async () => {
      setInitializing(true);
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          toast.error("You must be logged in to view your profile");
          setInitializing(false);
          return;
        }

        const { data, error } = await supabase
          .from("profiles")
          .select("username, first_name, last_name, field_of_study, bio")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error(error);
          toast.error("Error loading profile");
        } else {
          setFormData({
            username: data?.username || "",
            first_name: data?.first_name || "",
            last_name: data?.last_name || "",
            field_of_study: data?.field_of_study || "",
            bio: data?.bio || "",
          });
        }
      } catch (err) {
        console.error("Unexpected error loading profile:", err);
        toast.error("Something went wrong while loading your profile");
      } finally {
        setInitializing(false);
      }
    };

    loadProfile();
  }, [supabase]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Handle profile update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("You must be logged in");
        setLoading(false);
        return;
      }

      // Validate with Zod
      const parsed = profileSchema.safeParse({
        id: user.id,
        ...formData,
      });

      if (!parsed.success) {
        const fieldErrors: Record<string, string> = {};
        parsed.error.errors.forEach((err) => {
          const key = err.path[0];
          if (typeof key === "string") fieldErrors[key] = err.message;
        });
        setErrors(fieldErrors);
        toast.error("Please fix the highlighted fields");
        setLoading(false);
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          username: formData.username || null,
          first_name: formData.first_name || null,
          last_name: formData.last_name || null,
          field_of_study: formData.field_of_study || null,
          bio: formData.bio || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) {
        console.error(error);
        toast.error("Error updating profile");
      } else {
        toast.success("Profile updated successfully");
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Unexpected error updating profile:", err);
      toast.error("Something went wrong while saving changes");
    } finally {
      setLoading(false);
    }
  };

  if (initializing) {
    return (
      <main className="w-full max-w-[800px] mx-auto mt-24 py-24">
        <p className="text-muted-foreground">Loading your profile...</p>
      </main>
    );
  }

  return (
    <main className="w-full max-w-[800px] mx-auto mt-24 py-24">
      <section className="flex justify-between items-center mb-12">
        <h2 className="text-2xl font-semibold">Your Profile</h2>
        <Button variant="outline">Create On-Chain Profile</Button>
      </section>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Username */}
        <Field>
          <FieldLabel>Username</FieldLabel>
          <Input
            name="username"
            value={formData.username || ""}
            onChange={handleChange}
            placeholder="username"
          />
          <FieldDescription>Minimum 3 characters</FieldDescription>
          {errors.username && <FieldError>{errors.username}</FieldError>}
        </Field>

        {/* First + Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel>First Name</FieldLabel>
            <Input
              name="first_name"
              value={formData.first_name || ""}
              onChange={handleChange}
              placeholder="First name"
            />
            {errors.first_name && <FieldError>{errors.first_name}</FieldError>}
          </Field>

          <Field>
            <FieldLabel>Last Name</FieldLabel>
            <Input
              name="last_name"
              value={formData.last_name || ""}
              onChange={handleChange}
              placeholder="Last name"
            />
            {errors.last_name && <FieldError>{errors.last_name}</FieldError>}
          </Field>
        </div>

        {/* Field of Study */}
        <Field>
          <FieldLabel>Field of Study</FieldLabel>
          <Input
            name="field_of_study"
            value={formData.field_of_study || ""}
            onChange={handleChange}
            placeholder="e.g. Computer Science"
          />
          {errors.field_of_study && (
            <FieldError>{errors.field_of_study}</FieldError>
          )}
        </Field>

        {/* Bio */}
        <Field>
          <FieldLabel>Bio</FieldLabel>
          <Textarea
            name="bio"
            value={formData.bio || ""}
            onChange={handleChange}
            placeholder="Tell us a bit about yourself..."
            rows={4}
          />
          {errors.bio && <FieldError>{errors.bio}</FieldError>}
        </Field>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </main>
  );
}
