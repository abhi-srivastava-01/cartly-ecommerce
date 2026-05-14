import { User, Package, Heart, Settings } from "lucide-react";


export const accountMenu = [
  {
    id: 1,
    name: "My Profile",
    path: "/profile",
    icon: User,
  },
  {
    id: 2,
    name: "My Orders",
    path: "/orders",
    icon: Package,
  },
  {
    id: 3,
    name: "Wishlist",
    path: "/wishlist",
    icon: Heart,
  },
  {
    id: 4,
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];