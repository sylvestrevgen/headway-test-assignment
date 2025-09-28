"use client";

import { Provider } from "react-redux";
import { store } from "@/app/providers/store";

export function StateProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
