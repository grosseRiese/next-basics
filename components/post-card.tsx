import type { Post } from "@/generated/prisma/client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Button } from "./ui/button"
import Link from "next/link"
import { MoveRight } from "lucide-react"

type Props = {
  post: Post
  // OR ...
  //   post: {
  //     id: number;
  //     title: string;
  //     content: string;
  //     createdAt: Date;
  //     updatedAt: Date;
  //   }
}
function PostCard({ post }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>{post.title}</h2>
        </CardTitle>
        <CardDescription>
          <p className="text-sm text-gray-500">
            Created At: {post.createdAt.toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500">
            Updated At: {post.updatedAt.toLocaleDateString()}
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2">{post.content}</p>
        {/*OR  <p className="">{post.content.substring(0, 100)}...</p> */}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/posts/${post.id}`}>
            View post
            <MoveRight className="ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export { PostCard }
