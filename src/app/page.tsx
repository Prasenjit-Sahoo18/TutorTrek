export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-blue-100">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to StudyStream</h1>
        <p className="text-lg">Your Interactive E-Learning Platform</p>
        <a href="/dashboard" className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow">Enter Dashboard</a>
      </div>
    </div>
  )
}