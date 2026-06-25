"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type Props = React.ComponentProps<typeof Button> & {
  productId: string
  toastMessage: string
  action: (productId: string) => Promise<unknown>
}

function CartActionButton({
  productId,
  toastMessage,
  action,
  ...props
}: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    await action(productId)
    setLoading(false)

    toast.success(toastMessage)
    router.refresh()
  }

  return <Button {...props} onClick={handleClick} disabled={loading} />
}

export { CartActionButton }
