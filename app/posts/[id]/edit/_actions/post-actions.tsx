"use server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"

const editPostSchema = z.object({
  id: z.string().min(1),
  title: z
    .string()
    .min(1, "Title is required")
    .max(32, "Title must be less than 32 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(5000, "Content must be less than 5000 characters"),
})

export async function editPost(values: z.infer<typeof editPostSchema>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/sign-in")
  }

  const data = editPostSchema.parse(values)

  try {
    const updatedPost = await prisma.post.update({
      where: {
        id: data.id,
        authorId: session.user.id,
      },
      data: {
        title: data.title,
        content: data.content,
      },
    })

    return updatedPost
  } catch (error) {
    console.error("Error updating post:", error)
    throw new Error("Failed to update post")
  }
}
