"use client";

import React, { createContext, useContext } from "react";
import socket from "@/lib/socket"; // Import our globally connected singleton instance

// Create the context
const SocketContext = createContext(socket);

// Custom hook to easily access the socket from any component
export const useSocket = () => {
  return useContext(SocketContext);
};

// The provider component is now extremely simple. It no longer contains
// any useEffect hooks for connecting or disconnecting. It just provides the value.
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
