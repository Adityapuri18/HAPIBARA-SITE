"use client"

import Link from "next/link"
import { ShoppingCart, User, Search, Menu, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              HAPIBARA
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/recipes" className="text-sm font-medium hover:text-primary transition-colors">
              Recipes
            </Link>
            <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors">
              Categories
            </Link>
            <Link href="/community" className="text-sm font-medium hover:text-primary transition-colors">
              Community
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-sm mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search recipes..." className="pl-10 bg-secondary/50" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search recipes..." className="pl-10 bg-secondary/50" />
            </div>
            <nav className="flex flex-col gap-3">
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/recipes" className="text-sm font-medium hover:text-primary transition-colors">
                Recipes
              </Link>
              <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors">
                Categories
              </Link>
              <Link href="/community" className="text-sm font-medium hover:text-primary transition-colors">
                Community
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
