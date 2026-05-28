import { PostCard } from "@/components/post-card"
import prisma from "@/lib/prisma"

export default async function PostsPage() {
  const posts = await prisma.post.findMany({})
  return (
    <div className="container p-4">
      <h1 className="mb-4 text-2xl font-bold">Posts </h1>
      <ul className="space-y-2">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
          //   <li key={post.id}>
          //     <span className="font-semibold">{post.title}</span>
          //     <span className="ml-2 text-sm text-gray-600">
          //       by {post.content}
          //     </span>
          //     <span className="ml-2 text-sm text-gray-500">
          //       (Created At: {post.createdAt.toLocaleDateString()})
          //     </span>
          //     <span className="ml-2 text-sm text-gray-500">
          //       (updated At: {post.updatedAt.toLocaleDateString()})
          //     </span>
          //   </li>
        ))}
      </ul>
    </div>
  )
}
