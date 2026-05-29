"use client"
import z from "zod"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
function CreatePostForm() {
  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      toast.success("Form submitted successfully")
      console.log(value)
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
    >
      <FieldGroup>
        <Field orientation="horizontal">
          <Button type="submit">Create Post</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export { CreatePostForm }
