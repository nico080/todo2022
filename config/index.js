const dev = process.env.NODE_ENV !== 'production'

export const server = dev ? 'http://localhost:3005' : `https://todo-app-2022.vercel.app`
