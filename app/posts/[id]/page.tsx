import { Button } from "@/components/ui/button"
import prisma from "@/lib/prisma"
import { Edit, User } from "lucide-react"
import { notFound } from "next/navigation"
import { DeletePostBtn } from "./_components/delete-post-btn"
import Link from "next/link"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

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
    include: {
      author: {
        select: { name: true },
      },
    },
  })

  if (!post) {
    notFound()
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <div className="">
      <article className="mx-auto max-w-prose space-y-4 p-4">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <p className="text-sm font-medium text-muted-foreground">
          Created At: {post.createdAt?.toLocaleDateString()}
        </p>
        <div className="whitespace-pre-line">
          {post.content || "No content available."}
        </div>
        <p className="text-sm font-medium text-muted-foreground">
          Updated At: {post.updatedAt?.toLocaleDateString()}
        </p>

        {session && session?.user.id === post.authorId && (
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/posts/${post.id}/edit`}>
                <Edit />
                Edit
              </Link>
            </Button>

            <DeletePostBtn
              action={async () => {
                "use server"
                await prisma.post.delete({
                  where: {
                    id: post.id,
                  },
                })
              }}
            />
          </div>
        )}
      </article>
    </div>
  )
}
