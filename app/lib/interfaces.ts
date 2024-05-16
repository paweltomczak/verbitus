export type User = {
  id: string;
  email: string;
  password_hash: string;
  is_admin: boolean;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  tags: string[];
  category: string;
  view_count: number;
};

export type Posts = {
  posts: Post[];
};

export type TopPost = {
  id: number;
  title: string;
  image_url: string;
  view_count?: number;
  likes_count?: number;
};

export type DataForAI = {
  titles: string[];
  tags: string[];
  categories: string[];
};

export type Theme = 'dark' | 'light';
