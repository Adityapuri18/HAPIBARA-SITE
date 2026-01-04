import { SiteHeader } from "@/components/site-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { mockRecipes } from "@/lib/mock-data"
import { Download, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function OrdersPage() {
  // Mock order data
  const orders = [
    {
      id: "ORD-001",
      date: new Date("2024-03-15"),
      status: "completed",
      total: 32.97,
      items: [
        { recipe: mockRecipes[0], quantity: 1, price: 12.99 },
        { recipe: mockRecipes[1], quantity: 2, price: 9.99 },
      ],
    },
    {
      id: "ORD-002",
      date: new Date("2024-03-10"),
      status: "completed",
      total: 12.99,
      items: [{ recipe: mockRecipes[2], quantity: 1, price: 12.99 }],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Order History</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-6">
                {/* Order Header */}
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">Order #{order.id}</h3>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Placed on{" "}
                      {order.date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Total</p>
                    <p className="text-2xl font-bold">${order.total.toFixed(2)}</p>
                  </div>
                </div>

                <Separator className="mb-4" />

                {/* Order Items */}
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="relative h-20 w-20 flex-shrink-0 rounded overflow-hidden">
                        <Image
                          src={item.recipe.image || "/placeholder.svg?height=100&width=100&query=recipe"}
                          alt={item.recipe.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <Link
                          href={`/recipes/${item.recipe.slug}`}
                          className="font-semibold hover:text-primary transition-colors"
                        >
                          {item.recipe.title}
                        </Link>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild className="bg-transparent">
                          <Link href={`/recipes/${item.recipe.slug}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
