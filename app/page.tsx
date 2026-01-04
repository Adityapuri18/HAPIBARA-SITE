"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Search, Home, Compass, ShoppingCart, User, Sun, Utensils, Wind, Droplet, Coffee } from "lucide-react"
import { mockRecipes } from "@/lib/mock-data"
import { RecipeCard } from "@/components/recipe-card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, TrendingUp } from "lucide-react"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    { name: "Breakfast", slug: "breakfast", icon: Sun, color: "text-yellow-500" },
    { name: "Lunch", slug: "lunch", icon: Utensils, color: "text-orange-500" },
    { name: "Snacks", slug: "snacks", icon: Wind, color: "text-pink-500" },
    { name: "Dinner", slug: "dinner", icon: Coffee, color: "text-blue-500" },
    { name: "Sippables", slug: "sippables", icon: Droplet, color: "text-purple-500" },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/recipes?q=${encodeURIComponent(searchQuery)}`
    }
  }

  const featuredRecipes = mockRecipes.slice(0, 3)
  const popularRecipes = mockRecipes.slice(3, 6)

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header with profile - Updated greeting from Teresa to HAPIBARA */}
      <div className="sticky top-0 z-40 bg-white border-b">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Hello, HAPIBARA</p>
            <h1 className="text-2xl font-bold">
              <span className="text-black">Make your own food,</span>
              <br />
              <span className="text-yellow-500">stay at home</span>
            </h1>
          </div>
          <Link
            href="/profile"
            className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition"
          >
            <User className="w-6 h-6 text-white" />
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Align Your V / Nourish Your Soul section */}
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-widest text-gray-600 font-semibold">Align Your V.</p>
          <div className="bg-gradient-to-r from-blue-50 to-blue-50 p-4 rounded-xl">
            <h2 className="text-2xl font-bold mb-2">Nourish Your Soul</h2>
            <p className="text-sm text-gray-600">Cook with kindness, eat with purpose and feel the difference.</p>
          </div>
        </div>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search 100+ HAPIBARA Recipes"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pr-12 bg-gray-100 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white rounded-full w-10 h-10 p-0 flex items-center justify-center transition"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>

        {/* Category cards - Made clickable to navigate to category pages */}
        <div className="space-y-3">
          <div className="grid grid-cols-5 gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <Link key={cat.slug} href={`/category/${cat.slug}`} className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-green-100 transition">
                    <Icon className={`w-6 h-6 ${cat.color}`} />
                  </div>
                  <span className="text-xs text-center text-gray-700 font-medium">{cat.name}</span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Power Plates promotional card */}
        <Link href="/category/breakfast" className="block group">
          <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-2xl p-6 text-white group-hover:shadow-lg transition">
            <h3 className="text-2xl font-bold mb-2">Power Plates</h3>
            <p className="text-sm">Fuel your body and mind.</p>
          </div>
        </Link>

        {/* Feel Good Fast Food promotional card */}
        <Link href="/category/snacks" className="block group">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl p-6 text-white group-hover:shadow-lg transition">
            <h3 className="text-2xl font-bold mb-2">Feel Good Fast Food</h3>
            <p className="text-sm">Quick, easy & delicious.</p>
          </div>
        </Link>
      </div>

      {/* Featured Recipes Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Badge className="mb-2 bg-green-100 text-green-700">
                <TrendingUp className="h-3 w-3 mr-1" />
                Featured
              </Badge>
              <h2 className="text-2xl font-bold">Editor's Picks</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {featuredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Recipes Section */}
      <section className="py-8">
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Popular Recipes</h2>
            <Link
              href="/recipes"
              className="text-green-500 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {popularRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t max-w-md mx-auto">
        <div className="flex items-center justify-around py-3">
          <Link href="/" className="flex flex-col items-center gap-1 text-green-500">
            <Home className="w-6 h-6" />
            <span className="text-xs font-semibold">Home</span>
          </Link>
          <Link
            href="/recipes"
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition"
          >
            <Compass className="w-6 h-6" />
            <span className="text-xs font-semibold">Recipes</span>
          </Link>
          <Link href="/cart" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition">
            <ShoppingCart className="w-6 h-6" />
            <span className="text-xs font-semibold">Cart</span>
          </Link>
          <Link
            href="/profile"
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition"
          >
            <User className="w-6 h-6" />
            <span className="text-xs font-semibold">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
