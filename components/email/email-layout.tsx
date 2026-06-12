import { Head, Html, pixelBasedPreset, Tailwind } from "react-email"

type Props = {
  children: React.ReactNode
}
export default function EmailLayout({ children }: Props) {
  return (
    <Tailwind
      config={{
        presets: [pixelBasedPreset],
      }}
    >
      <Html>
        <Head />
        <body></body>
      </Html>
    </Tailwind>
  )
}
