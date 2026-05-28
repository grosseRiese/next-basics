import { PostCard } from "@/components/post-card"
import prisma from "@/lib/prisma"

export default async function PostsPage() {
  const posts = await prisma.post.findMany({})
  return (
    <div className="container p-4">
      <h1 className="mb-4 text-2xl font-bold">Posts </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
