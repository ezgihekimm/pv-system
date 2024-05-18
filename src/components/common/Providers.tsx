"use client";

import ReduxProvider from "@/store/provider";
import React from "react";
import { SocketProvider } from "./SocketProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <SocketProvider>{children}</SocketProvider>
    </ReduxProvider>
  );
}
