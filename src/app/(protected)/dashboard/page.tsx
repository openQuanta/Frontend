import Link from "next/link";

const sampleUser = {
  firstName: "Neos",
  lastName: "Jennifer",
  bio: "Research scientist exploring decentralized science, blockchain governance, and open data system",
  solanaAddress: "",
};

export default function Dashboard() {
  return (
    <main className="w-full max-w-[1200px] mx-auto mt-24 p-6 space-y-12">
      <section>
        <div>
          <h2 className="text-4xl">Hello, {sampleUser.firstName}</h2>
        </div>
      </section>

      {/* Stats */}
      <section className="flex justify-end gap-6">
        <div className="w-max">
          <div className="flex items-baseline gap-6 justify-between">
            <div className="w-2 h-3 bg-primary rounded-lg"></div>
            <p className="text-5xl font-semibold">9</p>
          </div>
          <p>Papers published</p>
        </div>

        <div className="w-max">
          <div className="flex items-baseline gap-6 justify-between">
            <div className="w-2 h-3 bg-primary rounded-lg"></div>
            <p className="text-5xl font-semibold">22</p>
          </div>
          <p>Reviews Given</p>
        </div>

        <div className="w-max">
          <div className="flex items-baseline gap-6 justify-between">
            <div className="w-2 h-3 bg-primary rounded-lg"></div>
            <p className="text-5xl font-semibold">88</p>
          </div>
          <p>Reputation Gcore</p>
        </div>
      </section>

      <section className="grid grid-cols-4">
        <div className="h-64 bg-white/20 rounded-2xl flex items-center justify-center">
          <Link href="/profile">Go to Profile</Link>
        </div>
      </section>
    </main>
  );
}
