import { DataPacket, addData, setConnected } from "@/store/features/liveData";
import { useAppDispatch } from "@/store/hooks";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";

interface Message {
  [key: string]: boolean;
}

interface SocketContextType {
  socket: Socket | null;
  sendMessage: (message: Message) => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  sendMessage: () => {},
});

export function SocketProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("ws://localhost:5001", {
      transports: ["websocket"],
    });

    newSocket.on("connect", () => {
      console.log("Connected to server");
      dispatch(setConnected(true));
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from server");
      dispatch(setConnected(false));
    });

    newSocket.on("message", (data: DataPacket) => {
      dispatch(addData(data));
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      dispatch(setConnected(false));
    };
  }, [dispatch]);

  const sendMessage = (message: Message) => {
    if (socket) {
      socket.emit("message", message);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
