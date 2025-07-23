import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "wouter"

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md p-6 text-center">
        <CardContent className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground">404</h1>
          <p className="text-lg text-muted-foreground">{"Oops! The page you're looking for doesn't exist."}</p>
          <Link href="/">
            <Button>Go to Homepage</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
