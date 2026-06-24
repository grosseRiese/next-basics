import { getCart } from "@/lib/cart"

export default async function CartPage() {
  const cart = await getCart()
  const ids = Object.keys(cart)
  //const movies = await prisma.movie.findMany({
  // where:{
  // id:{in:ids},deleteAt:null}
  //});

  return (
    <div>
      <h1> Cart </h1>
    </div>
  )
}
