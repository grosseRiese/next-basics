"use client"
export function ClientButton() {
  return (
    <button
      onClick={() => {
        console.log("Clicked!")
      }}
    >
      Click Me!
    </button>
  )
}
