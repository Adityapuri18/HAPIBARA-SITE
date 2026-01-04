"use client"

import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { mockRecipes } from "@/lib/mock-data"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function CartPage() {
  // Mock cart items
  const [cartItems, setCartItems] = useState([
    { recipe: mockRecipes[0], quantity: 1, price: 12.99 },
    { recipe: mockRecipes[1], quantity: 2, price: 9.99 },
  ])

  const updateQuantity = (index: number, delta: number) => {
    setCartItems((items) => {
      const newItems = [...items]
      newItems[index].quantity = Math.max(1, newItems[index].quantity + delta)
      return newItems
    })
  }

  const removeItem = (index: number) => {
    setCartItems((items) => items.filter((_, i) => i !== index))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="relative h-24 w-24 flex-shrink-0 rounded-md overflow-hidden">
                        <Image
                          src={item.recipe.image || "/placeholder.svg?height=100&width=100&query=recipe"}
                          alt={item.recipe.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <Link
                              href={`/recipes/${item.recipe.slug}`}
                              className="font-semibold text-lg hover:text-primary transition-colors"
                            >
                              {item.recipe.title}
                            </Link>
                            <p className="text-sm text-muted-foreground">{item.recipe.description}</p>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => removeItem(index)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => updateQuantity(index, -1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-12 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => updateQuantity(index, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                            <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/recipes">
                  <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                  Continue Shopping
                </Link>
              </Button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax (10%)</span>
                        <span className="font-medium">${tax.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="font-semibold">Total</span>
                        <span className="font-bold text-xl">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <Button className="w-full" size="lg" asChild>
                      <Link href="/checkout">
                        Proceed to Checkout
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>

                    <Separator className="my-6" />

                    <div className="space-y-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span>Instant digital download</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span>Video tutorials included</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span>30-day money back guarantee</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Start adding recipes to your cart to get cooking!</p>
              <Button size="lg" asChild>
                <Link href="/recipes">Browse Recipes</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
