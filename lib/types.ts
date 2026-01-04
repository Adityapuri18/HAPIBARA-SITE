export interface User {
  id: number
  email: string
  username: string
  fullName?: string
  bio?: string
  profileImage?: string
  createdAt: Date
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  image?: string
}

export interface Recipe {
  id: number
  userId: number
  title: string
  slug: string
  description?: string
  prepTime?: number
  cookTime?: number
  servings?: number
  difficulty?: "Easy" | "Medium" | "Hard"
  image?: string
  videoUrl?: string
  createdAt: Date
  user?: User
  categories?: Category[]
  ingredients?: Ingredient[]
  instructions?: Instruction[]
  averageRating?: number
  reviewCount?: number
  likeCount?: number
  isLiked?: boolean
}

export interface Ingredient {
  id: number
  recipeId: number
  item: string
  quantity?: string
  unit?: string
  orderIndex?: number
}

export interface Instruction {
  id: number
  recipeId: number
  stepNumber: number
  instruction: string
  image?: string
}

export interface Review {
  id: number
  recipeId: number
  userId: number
  rating: number
  comment?: string
  createdAt: Date
  user?: User
}

export interface CartItem {
  id: number
  userId: number
  recipeId: number
  quantity: number
  recipe?: Recipe
}

export interface Order {
  id: number
  userId: number
  totalAmount: number
  status: "pending" | "completed" | "cancelled"
  createdAt: Date
  items?: OrderItem[]
}

export interface OrderItem {
  id: number
  orderId: number
  recipeId: number
  quantity: number
  price: number
  recipe?: Recipe
}

export interface CommunityPost {
  id: number
  userId: number
  title?: string
  content: string
  image?: string
  createdAt: Date
  user?: User
  commentCount?: number
  likeCount?: number
  isLiked?: boolean
}

export interface PostComment {
  id: number
  postId: number
  userId: number
  comment: string
  createdAt: Date
  user?: User
}
