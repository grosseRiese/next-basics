import { PrismaClient, Prisma } from "../generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import "dotenv/config"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
})

const postData: Prisma.PostCreateInput[] = [
  {
    title: "Join the Prisma Discord",
    content: "https://pris.ly/discord",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Follow Prisma on Twitter",
    content: "https://www.twitter.com/prisma",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export async function main() {
  for (const p of postData) {
    await prisma.post.create({ data: p })
  }
}

main()
