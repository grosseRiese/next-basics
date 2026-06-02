"use client"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "@tanstack/react-form"
import { Save } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { z } from "zod"
import { editPost } from "../_actions/post-actions"
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
  //const router = useRouter()
  const form = useForm({
    defaultValues: {
      title: post.title,
      content: post.content,
    },
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },

    onSubmit: async ({ value, formApi }) => {
      const updatedPost = await editPost({
        ...value,
        id: post.id,
      })
      formApi.reset({
        title: updatedPost.title,
        content: updatedPost.content,
      })
      toast.success("Form edited successfully", {})
      //router.push(`/posts/${updatedPost.id}/edit`)
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
        <form.Field name="title">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="content">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Content</FieldLabel>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  className="h-48"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <FieldSeparator />
        <form.Subscribe selector={(state) => [state.isSubmitting] as const}>
          {([isSubmitting]) => (
            <Field orientation="horizontal">
              <Button
                type="reset"
                disabled={isSubmitting}
                onClick={(ev) => {
                  ev.preventDefault()
                  form.reset()
                }}
                variant="outline"
              >
                Reset
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Spinner /> : <Save />}
                Save Post
              </Button>
            </Field>
          )}
        </form.Subscribe>

        {/* <Field orientation="horizontal">
          <Button type="submit">Save Post</Button>
        </Field> */}
      </FieldGroup>
    </form>
  )
}

export { PostEditForm }
