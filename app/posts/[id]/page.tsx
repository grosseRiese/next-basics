import prisma from "@/lib/prisma"

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  })

  if (!post) {
    return <p>Post not found</p>
  }

  return (
    <div className="-mt-16 flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <article className="max-w-2xl space-y-4">
        <h1 className="mb-8 text-4xl font-bold text-[#333333]">{post.title}</h1>
        <p className="text-center text-gray-600">
          Created At: {post.createdAt?.toLocaleDateString()}
        </p>
        <div className="prose prose-gray mt-8">
          {post.content || "No content available."}
        </div>
        <p className="text-center text-gray-600">
          Updated At: {post.updatedAt?.toLocaleDateString()}
        </p>
      </article>
    </div>
  )
}
