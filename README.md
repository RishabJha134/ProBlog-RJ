# ProBlog

A modern, secure, and performant full-stack blogging platform built with Hono, React, and TypeScript.

## 🌟 Live Demo

Check out the live application: [ProBlog Live Demo](https://pro-blog-rj.vercel.app/signup)

## 🚀 Features

- **Secure Authentication**: JWT-based authentication system
- **Global CDN**: Deployed on Cloudflare Workers for optimal performance
- **Type Safety**: Built with TypeScript for robust development
- **Responsive Design**: CSS Grid layout for seamless desktop and mobile experience
- **Enhanced UX**: 
 - Shimmer UI effects for loading states
 - Clean and intuitive user interface
 - Private routing for protected content
- **Code Reusability**: Custom React hooks and shared validation logic

## 🛠️ Technology Stack

### Frontend
- React.js with TypeScript
- React Router DOM for routing
- Custom hooks for state management
- CSS Grid for responsive layouts
- Shared validation package (@rishabjha/common)

### Backend
- Hono web application framework
- Cloudflare Workers for serverless deployment
- PostgreSQL database
- Prisma ORM
- JWT for authentication

### Common Package
- NPM package (`@rishabjha/common`)
- Shared input validation logic
- TypeScript for type safety

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/RishabJha134/ProBlog-RJ.git
cd Project
```

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Install shared package
npm install @rishabjha/common

# Backend .env
DATABASE_URL="your_postgres_connection_string"
JWT_SECRET="your_jwt_secret"

# Frontend .env
VITE_API_URL="your_api_url"

# Backend
npm run dev

# Frontend
cd ../frontend
npm run dev

MEDIUM/
├── backend/
│   ├── .wrangler
│   ├── node_modules
│   ├── prisma/
│   ├── src/
│   │   ├── routes/
│   │   └── index.ts
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── tsconfig.json
│   └── wrangler.toml
├── common/
└── frontend/
    ├── dist/
    ├── node_modules/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── Hooks/
    │   ├── pages/
    │   ├── utils/
    │   ├── App.css
    │   ├── App.tsx
    │   ├── index.css
    │   └── main.tsx
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    └── vite-env.d.ts
``

## 🔒 Security Features

- **JWT-based authentication**
- Protected routes implementation
- Input validation on both client and server
- Secure environment variable handling
- Type-safe API interactions

## 🌐 Deployment

- **Frontend:** Deployed on Vercel
- **Backend:** Deployed on Cloudflare Workers
- **Database:** PostgreSQL instance

## 💡 Best Practices

- Consistent code formatting
- Component-based architecture
- Custom hook implementation
- Shared validation logic
- Responsive design patterns
- Loading state management
- Error boundary implementation
- Type safety throughout the application

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Rishab Jha**

- GitHub: [@RishabJha134](https://github.com/RishabJha134)

## 🙏 Acknowledgments

- Thanks to all contributors who helped in making this project better
- Special thanks to the Hono, React, and Cloudflare communities

⭐️ If you like this project, please give it a star on GitHub!
