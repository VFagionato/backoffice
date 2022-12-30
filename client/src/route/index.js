import { Dashboard } from "../views/Dashboard";
import Login from "../views/Login";

export const routes = [
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  }
]