import { SiteHeader } from "@/components/site-header"
import { RecipeCard } from "@/components/recipe-card"
import { Badge } from "@/components/ui/badge"
import { mockCategories, mockRecipes } from "@/lib/mock-data"
import Link from "next/link"
import { notFound } from "next/navigation"
import Image from "next/image"

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = mockCategories.find((c) => c.slug === slug)

  if (!category) {
    notFound()
  }

  const categoryRecipes = mockRecipes.filter((recipe) => recipe.categories?.some((cat) => cat.id === category.id))

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          {" / "}
          <Link href="/categories" className="hover:text-primary">
            Categories
          </Link>
          {" / "}
          <span className="text-foreground">{category.name}</span>
        </div>

        {/* Category Header */}
        <div className="relative h-64 rounded-lg overflow-hidden mb-8">
          <Image
            src={category.image || "/placeholder.svg?height=400&width=1200&query=food"}
            alt={category.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <Badge className="mb-3 bg-white/20 text-white border-white/30">Category</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 text-balance">{category.name}</h1>
            {category.description && <p className="text-white/90 text-lg text-pretty">{category.description}</p>}
            <p className="text-white/80 text-sm mt-2">{categoryRecipes.length} recipes available</p>
          </div>
        </div>

        {/* Recipes Grid */}
        {categoryRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No recipes found in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
