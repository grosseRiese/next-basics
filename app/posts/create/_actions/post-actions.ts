"use server"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const createPostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(32, "Title must be less than 32 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(5000, "Content must be less than 5000 characters"),
})

export async function createPost(values: z.infer<typeof createPostSchema>) {
  //const { title, content } = createPostSchema.parse(values);
  const data = createPostSchema.parse(values)

  console.log(data)
  try {
    await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
      },
    })

    revalidatePath("/posts")
    return { success: true }
  } catch (error) {
    console.error("Error creating post:", error)
    throw new Error("Failed to create post")
  }
}
