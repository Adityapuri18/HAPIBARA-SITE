"use client"

import type React from "react"

import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { mockRecipes } from "@/lib/mock-data"
import { CreditCard, Wallet } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  // Mock cart items
  const cartItems = [
    { recipe: mockRecipes[0], quantity: 1, price: 12.99 },
    { recipe: mockRecipes[1], quantity: 2, price: 9.99 },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      router.push("/orders/success")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleCheckout}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" required />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                  <RadioGroup defaultValue="card" className="space-y-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                        <CreditCard className="h-4 w-4" />
                        Credit / Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer">
                        <Wallet className="h-4 w-4" />
                        PayPal
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" required />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                    <div className="space-y-4 mb-6">
                      {cartItems.map((item, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="relative h-16 w-16 flex-shrink-0 rounded overflow-hidden">
                            <Image
                              src={item.recipe.image || "/placeholder.svg?height=80&width=80&query=recipe"}
                              alt={item.recipe.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm line-clamp-2">{item.recipe.title}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>

                    <Separator className="mb-4" />

                    <div className="space-y-3 mb-6">
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

                    <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                      {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center mt-4">
                      By completing your purchase, you agree to our Terms of Service
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
