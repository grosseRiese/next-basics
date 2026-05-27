"use client"
// Its a client component...
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
