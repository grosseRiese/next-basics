import { Heading, Html, Head, Body, Text, Button } from "react-email"
import * as React from "react"
import EmailLayout from "../email-layout"

type Props = {
  url: string
}
export default function EmailVerfication({ url }: Props) {
  return (
    <EmailLayout>
      <Heading>Verify your email</Heading>
      <Text>Please click the link below...</Text>
      <Button href={url}>Verify email</Button>
    </EmailLayout>
  )
}

EmailVerfication.PreviewProps = {
  url: "http://localhost:3000",
} satisfies Props
