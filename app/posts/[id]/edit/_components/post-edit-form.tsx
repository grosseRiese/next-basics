"use client"
import { useForm } from "@tanstack/react-form"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { z } from "zod"
const formSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(32, "Title must be less than 32 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(5000, "Content must be less than 5000 characters"),
})
type Props = {
  post: {
    id: string
    title: string
    content: string
  }
}
function PostEditForm({ post }: Props) {
  //   const router = useRouter()
  const form = useForm({
    defaultValues: {
      title: post.title,
      content: post.content,
    },
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },

    onSubmit: async ({ value }) => {
      toast.success("Form edited successfully", {})

      // router.push(`/posts`)
    },
  })
  return (
    <form
      method="POST"
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    ></form>
  )
}

export { PostEditForm }
