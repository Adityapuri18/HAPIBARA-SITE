"use client"

import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { mockCommunityPosts, mockUsers } from "@/lib/mock-data"
import { Heart, MessageCircle, Share2, Send, ChefHat, ImageIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function CommunityPage() {
  const [posts, setPosts] = useState(mockCommunityPosts)
  const [newPost, setNewPost] = useState("")

  const handleLike = (postId: number) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likeCount: post.isLiked ? (post.likeCount || 0) - 1 : (post.likeCount || 0) + 1,
              isLiked: !post.isLiked,
            }
          : post,
      ),
    )
  }

  const handlePost = () => {
    if (newPost.trim()) {
      // In a real app, this would create a new post via API
      setNewPost("")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-3">Community</h1>
            <p className="text-lg text-muted-foreground">
              Connect with fellow food lovers, share your creations, and get inspired
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <ChefHat className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">12.5K</p>
                <p className="text-sm text-muted-foreground">Active Members</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">8.2K</p>
                <p className="text-sm text-muted-foreground">Posts Today</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Heart className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">45K</p>
                <p className="text-sm text-muted-foreground">Likes Today</p>
              </CardContent>
            </Card>
          </div>

          {/* Create Post */}
          <Card className="mb-8 glass">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarImage src={mockUsers[0].profileImage || "/placeholder.svg"} alt="You" />
                  <AvatarFallback>
                    <ChefHat className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Share your cooking journey, tips, or ask a question..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="mb-3 min-h-24"
                  />
                  <div className="flex justify-between items-center">
                    <Button variant="ghost" size="sm">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Add Image
                    </Button>
                    <Button onClick={handlePost} disabled={!newPost.trim()}>
                      <Send className="h-4 w-4 mr-2" />
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feed */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-6">
                  {/* Post Header */}
                  <div className="flex gap-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={post.user?.profileImage || "/placeholder.svg"} alt={post.user?.username} />
                      <AvatarFallback>
                        <ChefHat className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Link href={`/profile/${post.userId}`} className="font-semibold hover:text-primary">
                          {post.user?.fullName || post.user?.username}
                        </Link>
                        <Badge variant="secondary" className="text-xs">
                          Member
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {post.createdAt.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Post Content */}
                  {post.title && <h3 className="text-xl font-bold mb-2 text-balance">{post.title}</h3>}
                  <p className="text-pretty mb-4">{post.content}</p>

                  {/* Post Image */}
                  {post.image && (
                    <div className="relative h-96 rounded-lg overflow-hidden mb-4">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title || "Post image"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="flex items-center gap-6 pt-4 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={post.isLiked ? "text-primary" : ""}
                      onClick={() => handleLike(post.id)}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${post.isLiked ? "fill-primary" : ""}`} />
                      {post.likeCount || 0}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {post.commentCount || 0}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Posts
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
