import { Button } from "@/components/ui/button";


const sampleUser = {
  firstName: "Neos",
  lastName: "Jennifer",
  bio: "Research scientist exploring decentralized science, blockchain governance, and open data system",
  solanaAddress: "",
};

export default function Profile() {
  return (
    <main className="w-full max-w-[1200px] mx-auto mt-24 py-24">
      <section className="flex justify-between gap-6">
        <div>
          <h2 className="text-2xl">Hello, {sampleUser.firstName}</h2>
        </div>
        <div>
          <Button>Create On-Chain Profile</Button>
        </div>
      </section>
    </main>
  );
}
