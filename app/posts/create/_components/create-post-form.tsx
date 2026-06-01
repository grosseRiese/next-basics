"use client"
import z from "zod"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import {
  Field,
  FieldGroup,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { handleSubmit } from "../actions"
import { Toaster } from "@/components/ui/sonner"

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
      onChange: formSchema,
      onBlur: formSchema,
    },

    onSubmit: async ({ value }) => {
      const formData = new FormData()
      formData.append("title", value.title)
      formData.append("content", value.content)

      await handleSubmit(formData)
      toast.success("Post created")
    },
  })

  return (
    <>
      <form
        method="POST"
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <Toaster />
        <FieldSet>
          <FieldGroup>
            <form.Field name="title">
              {(field) => (
                <>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <p className="text-red-500">
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                </>
              )}
            </form.Field>

            <form.Field name="content">
              {(field) => (
                <>
                  <Textarea
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <p className="text-red-500">
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                </>
              )}
            </form.Field>

            <FieldSeparator />

            <Field orientation="horizontal">
              <Button type="submit">Create Post</Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </>
  )
}

export { CreatePostForm }
