import { auth } from "@clerk/nextjs/server";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    return <div className="text-center text-red-500">Please log in to access the dashboard.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard!</h1>
      <p>Your user ID: {userId}</p>
    </div>
  );
}
