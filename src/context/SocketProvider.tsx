import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import io, { Socket } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchToken } from "@/controllers/fetchToken";
import { socketUrl } from "@/services/apiUrl";

const SOCKET_SERVER_URL = socketUrl;

interface SocketContextType {
  socket: Socket | null;
  socketRef: Socket | null;
  userId: string | null;
  isLoading: boolean;
  user: any | null; 
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const initializeSocket = async () => {
      try {
        if (socketRef.current) return; // Avoid multiple connections

        const storedUser = await AsyncStorage.getItem("fbUser");

        console.log(storedUser)

        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        const storedUserId = parsedUser?.id;
        console.log(storedUserId)
        const storedToken = await fetchToken();

        console.log(storedToken,'stored token')



        if (!storedUserId || !storedToken) {
          console.error("User ID or Token not found.");
          setIsLoading(false);
          return;
        }

        setUserId(storedUserId);
        setUser(parsedUser);

        const newSocket = io(SOCKET_SERVER_URL, {
          transports: ["websocket"],
          auth: { token: storedToken },
        });
        setSocket(newSocket);
        socketRef.current = newSocket; // Store socket in ref

        newSocket.on("connect", () => console.log("✅ Connected to Socket.io"));
        newSocket.on("disconnect", () => console.log("🛑 Socket disconnected"));

        setIsLoading(false);
      } catch (error) {
        console.error("⚠️ Error initializing socket:", error);
        setIsLoading(false);
      }
    };

    initializeSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []); // Runs only once

  return (
    <SocketContext.Provider value={{ socket, socketRef: socketRef.current, userId, isLoading, user }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
