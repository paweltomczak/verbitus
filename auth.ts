import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/interfaces';
import bcryptjs from 'bcryptjs';

export async function getAdmin(email: string): Promise<User | null> {
  try {
    const result =
      await sql<User>`SELECT * FROM users WHERE email=${email} AND is_admin=true`;
    if (result.rows.length > 0) {
      console.log(result.rows[0]);
      return result.rows[0];
    } else {
      console.error('Only Admins can access');
      return null;
    }
  } catch (error) {
    console.error('Failed to fetch admin:', error);
    throw new Error('Failed to fetch admin.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        if (credentials) {
          const { email, password } = credentials;
          const admin = await getAdmin(email as string);
          if (!admin) return null;

          const passwordsMatch = await bcryptjs.compare(
            password as string,
            admin.password_hash
          );
          if (passwordsMatch) return admin;
        }
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
