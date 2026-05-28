import { ClientButton } from "./_components/client-button"

// its averver component...
export default function AboutPage() {
  return (
    <div className="container p-4">
      <h1 className="mb-4 text-2xl font-bold">About Page</h1>

      <p suppressHydrationWarning>{new Date().toLocaleDateString()}</p>

      <ClientButton />
    </div>
  )
}
