import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';

export const authConfig = {
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnSignInPage = nextUrl.pathname === '/signin';
      const isOnSignUpPage = nextUrl.pathname === '/signup';

      if ((isOnSignInPage || isOnSignUpPage) && isLoggedIn) {
        const url = nextUrl.clone();
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
      }

      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard && !isLoggedIn) {
        const url = nextUrl.clone();
        url.pathname = '/signin';
        return NextResponse.redirect(url);
      }

      return true;
    },
  },
  providers: [],
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
