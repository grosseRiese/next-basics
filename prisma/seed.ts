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
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lorem justo, faucibus quis est sed, imperdiet gravida est. Fusce elementum, nisl in elementum porta, nulla dui semper ligula, quis iaculis est urna ut nisl. Fusce mattis sem a tortor efficitur vehicula. Ut et sollicitudin tellus. Nunc id ultrices nisl, in sodales enim. Donec sem felis, congue vitae libero vel, fringilla pretium lectus. Sed tristique tortor a lectus tristique ultricies. Morbi aliquam pellentesque ipsum, eget viverra augue ultrices eget. Donec rhoncus felis sed ligula ornare convallis. Suspendisse molestie consequat convallis. Etiam dignissim purus nibh, sed tincidunt arcu dignissim ut. Maecenas eget magna eu massa maximus dignissim. Nulla pulvinar lectus erat, eget semper nisi ullamcorper eget. Donec id imperdiet lectus, elementum iaculis magna. Maecenas nec consequat odio.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Follow Prisma on Twitter",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lorem justo, faucibus quis est sed, imperdiet gravida est. Fusce elementum, nisl in elementum porta, nulla dui semper ligula, quis iaculis est urna ut nisl. Fusce mattis sem a tortor efficitur vehicula. Ut et sollicitudin tellus. Nunc id ultrices nisl, in sodales enim. Donec sem felis, congue vitae libero vel, fringilla pretium lectus. Sed tristique tortor a lectus tristique ultricies. Morbi aliquam pellentesque ipsum, eget viverra augue ultrices eget. Donec rhoncus felis sed ligula ornare convallis. Suspendisse molestie consequat convallis. Etiam dignissim purus nibh, sed tincidunt arcu dignissim ut. Maecenas eget magna eu massa maximus dignissim. Nulla pulvinar lectus erat, eget semper nisi ullamcorper eget. Donec id imperdiet lectus, elementum iaculis magna. Maecenas nec consequat odio. Proin lobortis vulputate neque, id fringilla ipsum dignissim aliquam. Ut elit nibh, aliquam iaculis aliquet nec, semper at arcu. Mauris a pretium nulla. Duis ultrices tellus in lorem lacinia, sit amet fringilla turpis sollicitudin. Aenean porttitor mattis lorem. Nunc vitae faucibus ex, ac condimentum ante. Curabitur elit metus, facilisis ac facilisis eget, tristique vitae velit. Praesent eleifend lectus nisi.",
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
