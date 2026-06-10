"use client"

import { Button } from "./ui/button"

type Props = React.ComponentProps<typeof Button>

function SignOutButton(props: Props) {
  async function handleClick() {}
  return <Button onClick={handleClick} {...props} />
}

export { SignOutButton }
