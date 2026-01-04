import { SiteHeader } from "@/components/site-header"
import { RecipeCard } from "@/components/recipe-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockRecipes, mockCategories } from "@/lib/mock-data"
import { Filter, SlidersHorizontal } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RecipesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">All Recipes</h1>
          <p className="text-muted-foreground text-lg">Discover your next favorite dish</p>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-secondary/50 rounded-lg">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">Filters:</span>
          </div>

          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {mockCategories.map((category) => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="popular">
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="time">Quick & Easy</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="ml-auto bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Active Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <Badge variant="secondary" className="px-3 py-1">
            All Categories
          </Badge>
          <Badge variant="secondary" className="px-3 py-1">
            All Levels
          </Badge>
        </div>

        {/* Results Count */}
        <p className="text-muted-foreground mb-6">{mockRecipes.length} recipes found</p>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mockRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button size="lg" variant="outline">
            Load More Recipes
          </Button>
        </div>
      </div>
    </div>
  )
}
