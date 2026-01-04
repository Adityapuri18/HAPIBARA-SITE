import Link from "next/link"
import { Home, Compass, ShoppingCart, User, ChevronLeft } from "lucide-react"
import { RecipeCard } from "@/components/recipe-card"
import { mockRecipes } from "@/lib/mock-data"

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage(props: CategoryPageProps) {
  const params = await props.params
  const categorySlug = params.slug

  const categoryMap: Record<string, string> = {
    breakfast: "Breakfast",
    lunch: "Lunch",
    snacks: "Snacks",
    dinner: "Dinner",
    sippables: "Sippables",
  }

  const categoryName = categoryMap[categorySlug] || categorySlug

  // Filter recipes by category - recipes should have categories matching the slug
  const categoryRecipes = mockRecipes.filter((recipe) => {
    return recipe.categories?.some(
      (cat) => cat.slug === categorySlug || cat.name.toLowerCase() === categoryName.toLowerCase(),
    )
  })

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="flex-shrink-0">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{categoryName} Recipes</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        <p className="text-sm text-gray-600 mb-6">{categoryRecipes.length} recipes found</p>

        {categoryRecipes.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {categoryRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No recipes found in this category yet.</p>
            <Link href="/recipes" className="text-green-500 font-semibold hover:underline">
              Browse all recipes
            </Link>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t max-w-md mx-auto">
        <div className="flex items-center justify-around py-3">
          <Link href="/" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition">
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
