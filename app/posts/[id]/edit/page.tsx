import prisma from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"
import { PostEditForm } from "./_components/post-edit-form"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

async function PostEditPage(props: PageProps<"/posts/[id]/edit">) {
  const params = await props.params

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/sign-in")
  }

  const post = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!post || post.authorId !== session.user.id) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-prose space-y-4 p-4">
      <h1 className="text-4xl font-bold">Edit Post</h1>
      <PostEditForm post={post} />
    </div>
  )
}

export default PostEditPage
