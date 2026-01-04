import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RecipeCard } from "@/components/recipe-card"
import { mockUsers, mockRecipes } from "@/lib/mock-data"
import { Settings, Heart, ShoppingBag, ChefHat, Users, Star } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const user = mockUsers[0]
  const userRecipes = mockRecipes.filter((recipe) => recipe.userId === user.id)

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Avatar className="h-32 w-32">
                <AvatarImage src={user.profileImage || "/placeholder.svg"} alt={user.username} />
                <AvatarFallback className="text-4xl">
                  <ChefHat className="h-16 w-16" />
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{user.fullName || user.username}</h1>
                    <p className="text-muted-foreground mb-3">@{user.username}</p>
                    {user.bio && <p className="text-pretty">{user.bio}</p>}
                  </div>
                  <Button asChild>
                    <Link href="/profile/edit">
                      <Settings className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Link>
                  </Button>
                </div>

                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="font-bold text-lg">{userRecipes.length}</span>
                    <span className="text-muted-foreground ml-1">Recipes</span>
                  </div>
                  <div>
                    <span className="font-bold text-lg">1.2K</span>
                    <span className="text-muted-foreground ml-1">Followers</span>
                  </div>
                  <div>
                    <span className="font-bold text-lg">432</span>
                    <span className="text-muted-foreground ml-1">Following</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <ChefHat className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{userRecipes.length}</p>
              <p className="text-sm text-muted-foreground">Recipes Created</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">89</p>
              <p className="text-sm text-muted-foreground">Favorites</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">4.8</p>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">1.2K</p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="recipes" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recipes">My Recipes</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="recipes" className="mt-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">My Recipes ({userRecipes.length})</h2>
              <Button>
                <ChefHat className="mr-2 h-4 w-4" />
                Create Recipe
              </Button>
            </div>
            {userRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <ChefHat className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No recipes yet</h3>
                  <p className="text-muted-foreground mb-6">Start sharing your culinary creations with the community</p>
                  <Button>Create Your First Recipe</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="mt-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Favorite Recipes</h2>
              <p className="text-muted-foreground">Recipes you've saved for later</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockRecipes.slice(0, 3).map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Order History</h2>
              <p className="text-muted-foreground">View your purchased recipes</p>
            </div>
            <Card>
              <CardContent className="p-12 text-center">
                <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
                <p className="text-muted-foreground mb-6">Start exploring and purchase your favorite recipes</p>
                <Button asChild>
                  <Link href="/recipes">Browse Recipes</Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
