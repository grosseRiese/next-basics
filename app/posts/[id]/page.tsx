import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"

/**
 * 
 * export default async function PostDetailsPage({params}: {params: Promise<{ id: string }>}) {}
 * OR
 export default async function PostDetailsPage(props: PageProps<"/posts/[id]">){}
 */

export default async function PostDetailsPage(props: PageProps<"/posts/[id]">) {
  const params = await props.params //OR:   const {id} = await props.params
  if (!params.id) {
    notFound()
  }
  const post = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!post) {
    notFound()
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
