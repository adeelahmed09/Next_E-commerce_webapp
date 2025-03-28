"use client"; // Mark this as a Client Component

import { SessionProvider } from "next-auth/react";
import store from "@/store/store.js";
import { Provider } from "react-redux";
export default function Providers({ children }) {
  return <Provider store={store}>
    <SessionProvider>
    {children}
    </SessionProvider>
  </Provider>;
}