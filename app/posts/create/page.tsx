import { CreatePostForm } from "./_components/create-post-form"

export default function CreatePostPage(props: PageProps<"/posts/create">) {
  //const { title, content } = props.params
  // const post = prisma.post.create({
  //   data: {
  //     title,
  //     content,
  //   },
  // })
  return (
    <div className="mx-auto max-w-prose p-4">
      <h1 className="mb-4 text-2xl font-bold">Create Post</h1>
      <CreatePostForm />
    </div>
  )
}
