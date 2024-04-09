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
};
