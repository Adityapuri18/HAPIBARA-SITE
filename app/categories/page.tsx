import { SiteHeader } from "@/components/site-header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockCategories, mockRecipes } from "@/lib/mock-data"
import Link from "next/link"
import Image from "next/image"

export default function CategoriesPage() {
  // Count recipes per category
  const categoryCounts = mockCategories.map((category) => {
    const count = mockRecipes.filter((recipe) => recipe.categories?.some((cat) => cat.id === category.id)).length
    return { ...category, recipeCount: count }
  })

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Recipe Categories</h1>
          <p className="text-muted-foreground text-lg">Explore recipes by your favorite categories</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryCounts.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`}>
              <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg?height=300&width=400&query=food"}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-2xl mb-1">{category.name}</h3>
                    <p className="text-white/90 text-sm mb-2">{category.description}</p>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {category.recipeCount} recipes
                    </Badge>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
