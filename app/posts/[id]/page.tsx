import prisma from "@/lib/prisma"

/**
 * 
 * export default async function PostDetailsPage({params,}: {params: Promise<{ id: string }>}) {}
 * OR
 export default async function PostDetailsPage(props: PageProps<"/posts/[postId]">){}
 */

export default async function PostDetailsPage(props: PageProps<"/posts/[id]">) {
  const { id } = await props.params
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  })

  if (!post) {
    return <p>Post not found</p>
  }

  return (
    <div className="">
      <article className="p-4">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <p className="">Created At: {post.createdAt?.toLocaleDateString()}</p>
        <div className="">{post.content || "No content available."}</div>
        <p className="text-center">
          Updated At: {post.updatedAt?.toLocaleDateString()}
        </p>
      </article>
    </div>
  )
}
