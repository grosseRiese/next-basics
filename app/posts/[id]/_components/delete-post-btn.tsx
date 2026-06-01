"use client"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

type Props = {
  action: () => Promise<void> //deletePost: (postId: string) => Promise<void>
}

function DeletePostBtn({ action }: Props) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function handleClick() {
    const shouldDelete = confirm("Are you sure you want to delete this post?")

    if (!shouldDelete) {
      return
    }

    setIsLoading(true)
    await action()
    setIsLoading(false)
    toast.success("Post deleted successfully!")
    router.replace("/posts") // Redirect to the posts list page after deletion
  }

  return (
    <>
      <Button variant="destructive" onClick={handleClick} disabled={isLoading}>
        {isLoading ? <Spinner /> : "Delete"}
        Delete
      </Button>
    </>
  )
}
export { DeletePostBtn }
