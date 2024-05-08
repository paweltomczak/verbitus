# Verbitus

## Overview
Verbitus is a Marketing Platform built with the latest version of Next.js, leveraging speed for SEO and advertising purposes. It features server-side rendering and utilizes new React features such as server actions. The application is designed to manage content efficiently through a robust dashboard provided for admins.

## Features
- **Admin Dashboard**: Manage posts with options to edit or delete, and handle categories and tags.
- **Content Creation**: Use the React-Quill editor for creating posts, manage file uploads to Firebase Storage, and categorize posts.
- **Dynamic Home Page**: Displays recent, most viewed, and most liked articles.
- **Interactive UI**: Includes a theme switcher for light and dark modes, and a search function.
- **Security**: Utilizes PostgreSQL for database management with secure access controls.

  #### User Authentication
  User authentication in Verbitus is managed through `NextAuth`, an authentication library for Next.js applications. This setup enhances the security and functionality of our system with features such as session management and protected routes.
  
  #### Authorization Logic
  - **Sign-in and Sign-up Redirection**: Users who are already logged in are redirected from the sign-in or sign-up page to the dashboard.
  - **Dashboard Access Control**: Unauthenticated users attempting to access the dashboard are redirected to the sign-in page.
  - **Custom Authorization**: Customized callbacks to check user credentials and roles to ensure that only admins can access certain functionalities.

## Installation
To set up the project locally, follow these steps:

```bash
git clone https://github.com/paweltomczak/verbitus.git
cd verbitus
npm install
npm run dev
```

Navigate to http://localhost:3000 to view the application.

## Usage

- **Dashboard**: Accessible at `/dashboard`, for managing posts, categories, and tags.
- **Creating Posts**: Through the Create Post page with rich text features and media upload.
- **Managing Categories and Tags**: Add or remove categories and tags to streamline content organization.

## Contributing

Contributions are welcome! Please fork the project, make your changes, and submit a pull request. If you have any questions, feel free to contact me at `contact@paweltomczak.dev`

## License

This project is open sourced under the [MIT License](https://opensource.org/licenses/MIT).
