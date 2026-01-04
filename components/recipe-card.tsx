"use client"

import Link from "next/link"
import Image from "next/image"
import { Clock, Users, Heart, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Recipe } from "@/lib/types"

interface RecipeCardProps {
  recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0)

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <Link href={`/recipes/${recipe.slug}`}>
        <div className="relative h-48 overflow-hidden">
          <Image
            src={recipe.image || "/placeholder.svg?height=300&width=400&query=recipe"}
            alt={recipe.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
            onClick={(e) => {
              e.preventDefault()
              // Handle like functionality
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
          {recipe.difficulty && (
            <Badge className="absolute top-2 left-2 bg-white/90 text-foreground">{recipe.difficulty}</Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/recipes/${recipe.slug}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors text-balance">
            {recipe.title}
          </h3>
        </Link>

        {recipe.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2 text-pretty">{recipe.description}</p>
        )}

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          {totalTime > 0 && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{totalTime} min</span>
            </div>
          )}
          {recipe.servings && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{recipe.servings} servings</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {recipe.averageRating && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="text-sm font-medium">{recipe.averageRating}</span>
                <span className="text-sm text-muted-foreground">({recipe.reviewCount})</span>
              </div>
            )}
          </div>
          {recipe.likeCount && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Heart className="h-4 w-4" />
              <span>{recipe.likeCount}</span>
            </div>
          )}
        </div>

        {recipe.categories && recipe.categories.length > 0 && (
          <div className="flex gap-2 mt-3 flex-wrap">
            {recipe.categories.slice(0, 2).map((category) => (
              <Badge key={category.id} variant="secondary" className="text-xs">
                {category.name}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
