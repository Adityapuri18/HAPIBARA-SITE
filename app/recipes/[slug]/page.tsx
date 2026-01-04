import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockRecipes } from "@/lib/mock-data"
import { Clock, Users, Heart, Star, ShoppingCart, ChefHat, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function RecipeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const recipe = mockRecipes.find((r) => r.slug === slug)

  if (!recipe) {
    notFound()
  }

  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0)

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
          <Link href="/recipes" className="hover:text-primary">
            Recipes
          </Link>
          {" / "}
          <span className="text-foreground">{recipe.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image & Title */}
            <div>
              <div className="relative h-96 rounded-lg overflow-hidden mb-6">
                <Image
                  src={recipe.image || "/placeholder.svg?height=600&width=800&query=recipe"}
                  alt={recipe.title}
                  fill
                  className="object-cover"
                />
                {recipe.videoUrl && (
                  <Button
                    size="lg"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-16 h-16"
                  >
                    <Play className="h-8 w-8" />
                  </Button>
                )}
              </div>

              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-3 text-balance">{recipe.title}</h1>
                  {recipe.description && (
                    <p className="text-lg text-muted-foreground text-pretty">{recipe.description}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Categories & Difficulty */}
              <div className="flex gap-2 flex-wrap mb-6">
                {recipe.difficulty && (
                  <Badge variant="secondary" className="text-sm px-3 py-1">
                    {recipe.difficulty}
                  </Badge>
                )}
                {recipe.categories?.map((category) => (
                  <Badge key={category.id} variant="outline" className="text-sm px-3 py-1">
                    {category.name}
                  </Badge>
                ))}
              </div>

              {/* Chef Info */}
              {recipe.user && (
                <div className="flex items-center gap-3 mb-6">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={recipe.user.profileImage || "/placeholder.svg"} alt={recipe.user.username} />
                    <AvatarFallback>
                      <ChefHat className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Recipe by {recipe.user.fullName || recipe.user.username}</p>
                    <p className="text-sm text-muted-foreground">{recipe.user.bio}</p>
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {totalTime > 0 && (
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Clock className="h-5 w-5 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">{totalTime}</p>
                      <p className="text-sm text-muted-foreground">minutes</p>
                    </CardContent>
                  </Card>
                )}
                {recipe.servings && (
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Users className="h-5 w-5 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">{recipe.servings}</p>
                      <p className="text-sm text-muted-foreground">servings</p>
                    </CardContent>
                  </Card>
                )}
                {recipe.averageRating && (
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Star className="h-5 w-5 mx-auto mb-2 text-primary fill-primary" />
                      <p className="text-2xl font-bold">{recipe.averageRating}</p>
                      <p className="text-sm text-muted-foreground">{recipe.reviewCount} reviews</p>
                    </CardContent>
                  </Card>
                )}
                {recipe.likeCount && (
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Heart className="h-5 w-5 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">{recipe.likeCount}</p>
                      <p className="text-sm text-muted-foreground">likes</p>
                    </CardContent>
                  </Card>
                )}
              </div>

              <Separator className="mb-8" />

              {/* Tabs: Ingredients & Instructions */}
              <Tabs defaultValue="ingredients" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                  <TabsTrigger value="instructions">Instructions</TabsTrigger>
                </TabsList>
                <TabsContent value="ingredients" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-4">What you'll need</h3>
                      <ul className="space-y-3">
                        {recipe.ingredients?.map((ingredient) => (
                          <li key={ingredient.id} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <span>
                              {ingredient.quantity && ingredient.unit && (
                                <span className="font-medium">
                                  {ingredient.quantity} {ingredient.unit}{" "}
                                </span>
                              )}
                              {ingredient.item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="instructions" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-4">Step-by-step instructions</h3>
                      <ol className="space-y-6">
                        {recipe.instructions?.map((instruction) => (
                          <li key={instruction.id} className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                              {instruction.stepNumber}
                            </div>
                            <div className="flex-1 pt-1">
                              <p className="text-pretty">{instruction.instruction}</p>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Add to Cart Card */}
              <Card className="glass">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Get this recipe</h3>
                  <div className="space-y-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">$12.99</span>
                      <span className="text-sm text-muted-foreground">one-time</span>
                    </div>
                    <Button className="w-full" size="lg">
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Includes detailed recipe, video tutorial, and chef tips
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Recipe Details */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Recipe Details</h3>
                  <dl className="space-y-3 text-sm">
                    {recipe.prepTime && (
                      <>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Prep Time</dt>
                          <dd className="font-medium">{recipe.prepTime} min</dd>
                        </div>
                        <Separator />
                      </>
                    )}
                    {recipe.cookTime && (
                      <>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Cook Time</dt>
                          <dd className="font-medium">{recipe.cookTime} min</dd>
                        </div>
                        <Separator />
                      </>
                    )}
                    {totalTime > 0 && (
                      <>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Total Time</dt>
                          <dd className="font-medium">{totalTime} min</dd>
                        </div>
                        <Separator />
                      </>
                    )}
                    {recipe.servings && (
                      <>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Servings</dt>
                          <dd className="font-medium">{recipe.servings}</dd>
                        </div>
                        <Separator />
                      </>
                    )}
                    {recipe.difficulty && (
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Difficulty</dt>
                        <dd className="font-medium">{recipe.difficulty}</dd>
                      </div>
                    )}
                  </dl>
                </CardContent>
              </Card>

              {/* Share */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Share this recipe</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Share
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Print
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
