"use server"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

async function handleSubmit(form: FormData) {
  const title = form.get("title") as string
  const content = form.get("content") as string

  try {
    await prisma.post.create({
      data: {
        title,
        content,
      },
    })
    revalidatePath("/posts")
  } catch (error) {
    console.error("Error creating post:", error)
    throw new Error("Failed to create post")
  }
  redirect("/posts")
}

export { handleSubmit }
