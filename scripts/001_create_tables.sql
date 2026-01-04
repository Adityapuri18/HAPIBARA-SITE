-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  bio TEXT,
  profile_image VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  image VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recipes table
CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  prep_time INTEGER, -- in minutes
  cook_time INTEGER, -- in minutes
  servings INTEGER,
  difficulty VARCHAR(50), -- Easy, Medium, Hard
  image VARCHAR(500),
  video_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recipe categories (many-to-many relationship)
CREATE TABLE recipe_categories (
  recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (recipe_id, category_id)
);

-- Ingredients table
CREATE TABLE ingredients (
  id SERIAL PRIMARY KEY,
  recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
  item VARCHAR(255) NOT NULL,
  quantity VARCHAR(100),
  unit VARCHAR(50),
  order_index INTEGER
);

-- Instructions table
CREATE TABLE instructions (
  id SERIAL PRIMARY KEY,
  recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  instruction TEXT NOT NULL,
  image VARCHAR(500)
);

-- Reviews table
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(recipe_id, user_id)
);

-- Likes table
CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(recipe_id, user_id)
);

-- Cart items table
CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, recipe_id)
);

-- Orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  total_amount DECIMAL(10, 2),
  status VARCHAR(50), -- pending, completed, cancelled
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
  quantity INTEGER,
  price DECIMAL(10, 2)
);

-- Community posts table
CREATE TABLE community_posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  content TEXT NOT NULL,
  image VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Post comments table
CREATE TABLE post_comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  comment TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Post likes table
CREATE TABLE post_likes (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(post_id, user_id)
);

-- Create indexes for better performance
CREATE INDEX idx_recipes_user_id ON recipes(user_id);
CREATE INDEX idx_reviews_recipe_id ON reviews(recipe_id);
CREATE INDEX idx_likes_recipe_id ON likes(recipe_id);
CREATE INDEX idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_community_posts_user_id ON community_posts(user_id);
