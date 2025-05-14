// import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
// import { io, Socket } from 'socket.io-client';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { socketUrl } from '@/services/apiUrl';
// import { fetchToken } from '@/controllers/fetchToken';

// // Types
// interface User {
//   id: string;
//   userName: string;
//   userProfile: string;
//   level: number;
//   specialId: string;
//   seat?: number;
//   micOn?: boolean;
//   isCohost?: boolean; // Added isCohost to match backend
// }

// interface RoomData {
//   roomId: string;
//   title?: string;
//   seats?: number;
//   isLocked?: boolean;
//   hostId?: string;
//   users: User[];
//   cohostRequests?: string[];
// }

// interface JoinRoomPayload {
//   roomId: string;
//   id: string;
//   userName: string;
//   userProfile: string;
//   level: number;
//   specialId: string;
// }

// interface AudioRoomContextType {
//   socket: Socket | null;
//   socketRef: Socket | null;
//   userId: string | null;
//   user: any;
//   isLoading: boolean;
//   room: RoomData | null;
//   joinRoom: (payload: JoinRoomPayload) => void;
//   leaveRoom: (roomId: string, id: string) => void;
//   requestCohost: (roomId: string, id: string) => void;
//   acceptCohost: (roomId: string, id: string) => void;
//   kickUser: (roomId: string, id: string) => void;
//   toggleMic: (roomId: string, id: string, micStatus: boolean) => void;
//   deleteRoom: (roomId: string) => void;
//   changeSeat: (roomId: string, id: string, newSeat: number) => void; // Added changeSeat

//   assignCohostAndSeat: (roomId: string, id: string, newSeat: number) => void;
//   toggleRoomLock: (roomId: string, isLocked: boolean) => void;

// }

// // Context Setup
// const AudioRoomContext = createContext<AudioRoomContextType | undefined>(undefined);

// export const AudioRoomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const socketRef = useRef<Socket | null>(null);
//   const [userId, setUserId] = useState<string | null>(null);
//   const [user, setUser] = useState<any | null>(null);
//   const [room, setRoom] = useState<RoomData | null>(null);
//   const roomRef = useRef<RoomData | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const initialize = async () => {
//       try {
//         if (socketRef.current) return; // Avoid reinitializing

//         const storedUser = await AsyncStorage.getItem('fbUser');
//         const parsedUser = storedUser ? JSON.parse(storedUser) : null;
//         const storedUserId = parsedUser?.id;
//         const storedToken = await fetchToken();

//         if (!storedUserId || !storedToken) {
//           console.error('User ID or Token not found.');
//           setIsLoading(false);
//           return;
//         }

//         setUserId(storedUserId);
//         setUser(parsedUser);

//         const newSocket = io(socketUrl, {
//           transports: ['websocket'],
//           auth: { token: storedToken },
//         });

//         socketRef.current = newSocket;
//         setSocket(newSocket);

//         newSocket.on('connect', () => console.log('🎧 Audio Socket connected'));
//         newSocket.on('disconnect', () => console.log('🔌 Audio Socket disconnected'));

//         newSocket.on('roomUpdate', (data: RoomData) => {
//           console.log('📡 Room Update:', data);
//           roomRef.current = data;
//           setRoom(data);
//         });

//         newSocket.on('roomDeleted', ({ roomId }) => {
//           if (roomRef.current?.roomId === roomId) {
//             setRoom(null);
//             roomRef.current = null;
//           }
//         });

//         newSocket.on('kickedFromRoom', ({ roomId }) => {
//           if (roomRef.current?.roomId === roomId) {
//             setRoom(null);
//             roomRef.current = null;
//           }
//         });

//         newSocket.on('seatChanged', ({ roomId, id, newSeat }) => {
//           console.log(`Seat changed for user ${id} to seat ${newSeat} in room ${roomId}`);
//           if (roomRef.current?.roomId === roomId) {
//             setRoom((prev) => {
//               if (!prev) return prev;
//               const updatedUsers = prev.users.map((u) =>
//                 u.id === id ? { ...u, seat: newSeat } : u
//               );
//               return { ...prev, users: updatedUsers };
//             });
//           }
//         });

//         setIsLoading(false);
//       } catch (err) {
//         console.error('⚠️ Failed to init AudioRoomProvider:', err);
//         setIsLoading(false);
//       }
//     };

//     initialize();

//     return () => {
//       socketRef.current?.disconnect();
//       socketRef.current = null;
//       setSocket(null);
//       roomRef.current = null;
//       setRoom(null);
//     };
//   }, []);

//   // Emit Helpers
//   const emit = (event: string, payload: any) => {
//     if (socketRef.current?.connected) {
//       socketRef.current.emit(event, payload);
//     } else {
//       console.warn(`⚠️ Socket not connected: cannot emit "${event}"`);
//     }
//   };

//   // Actions
//   const joinRoom = (payload: JoinRoomPayload) => emit('joinRoom', payload);

//   const leaveRoom = (roomId: string, id: string) => emit('leaveRoom', { roomId, id });

//   const requestCohost = (roomId: string, id: string) => emit('requestCohost', { roomId, id });

//   const acceptCohost = (roomId: string, id: string) => emit('acceptCohost', { roomId, id });

//   const kickUser = (roomId: string, id: string) => emit('kickUser', { roomId, id });

//   const toggleMic = (roomId: string, id: string, micStatus: boolean) =>
//     emit('toggleCohostMic', { roomId, id, micStatus });

//   const deleteRoom = (roomId: string) => emit('deleteRoom', { roomId });

//   const changeSeat = (roomId: string, id: string, newSeat: number) =>
//     emit('changeSeat', { roomId, id, newSeat });

//   const assignCohostAndSeat = (roomId: string, id: string, newSeat: number) => {
//     socket?.emit('assignCohostAndSeat', { roomId, id, newSeat });
//   };

//   const toggleRoomLock = (roomId: string, isLocked: boolean) => {
//     socket?.emit('toggleRoomLock', { roomId, isLocked });
//   };


//   return (
//     <AudioRoomContext.Provider
//       value={{
//         socket,
//         socketRef: socketRef.current,
//         userId,
//         user,
//         isLoading,
//         room,
//         joinRoom,
//         leaveRoom,
//         requestCohost,
//         acceptCohost,
//         kickUser,
//         toggleMic,
//         deleteRoom,
//         changeSeat, // Added changeSeat
//         assignCohostAndSeat,
//         toggleRoomLock
//       }}
//     >
//       {children}
//     </AudioRoomContext.Provider>
//   );
// };

// // Hook
// export const useAudioRoom = (): AudioRoomContextType => {
//   const context = useContext(AudioRoomContext);
//   if (!context) throw new Error('useAudioRoom must be used within AudioRoomProvider');
//   return context;
// };

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { socketUrl } from '@/services/apiUrl';
import { fetchToken } from '@/controllers/fetchToken';

// Types
interface User {
  id: string;
  userName: string;
  userProfile: string;
  level: number;
  specialId: string;
  seat?: number;
  micOn?: boolean;
  isCohost?: boolean;
  isHost?: boolean;
}

interface RoomData {
  roomId: string;
  title?: string;
  seats?: number;
  isLocked?: boolean;
  hostId?: string;
  image?: string; // Ensure image is included
  users: User[];
  cohostRequests?: string[];
}

interface JoinRoomPayload {
  roomId: string;
  id: string;
  userName: string;
  userProfile: string;
  level: number;
  specialId: string;
}

interface AudioRoomContextType {
  socket: Socket | null;
  socketRef: Socket | null;
  userId: string | null;
  user: any;
  isLoading: boolean;
  room: RoomData | null;
  joinRoom: (payload: JoinRoomPayload) => void;
  leaveRoom: (roomId: string, id: string) => void;
  requestCohost: (roomId: string, id: string) => void;
  acceptCohost: (roomId: string, id: string) => void;
  kickCohostFromSeat: (roomId: string, id: string) => void;
  toggleMic: (roomId: string, id: string, micStatus: boolean) => void;
  deleteRoom: (roomId: string) => void;
  changeSeat: (roomId: string, id: string, newSeat: number) => void;
  assignCohostAndSeat: (roomId: string, id: string, newSeat: number) => void;
  toggleRoomLock: (roomId: string, isLocked: boolean) => void;
  changeRoomBackground: (roomId: string, newImage: string) => void; // New
  removeCohostStatus: (roomId: string, id: string) => void; // New
}

// Context Setup
const AudioRoomContext = createContext<AudioRoomContextType | undefined>(undefined);

export const AudioRoomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [room, setRoom] = useState<RoomData | null>(null);
  const roomRef = useRef<RoomData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        if (socketRef.current) return;

        const storedUser = await AsyncStorage.getItem('fbUser');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        const storedUserId = parsedUser?.id;
        const storedToken = await fetchToken();

        if (!storedUserId || !storedToken) {
          console.error('User ID or Token not found.');
          setIsLoading(false);
          return;
        }

        setUserId(storedUserId);
        setUser(parsedUser);

        const newSocket = io(socketUrl, {
          transports: ['websocket'],
          auth: { token: storedToken },
        });

        socketRef.current = newSocket;
        setSocket(newSocket);

        newSocket.on('connect', () => console.log('🎧 Audio Socket connected'));
        newSocket.on('disconnect', () => console.log('🔌 Audio Socket disconnected'));

        newSocket.on('roomUpdate', (data: RoomData) => {
          console.log('📡 Room Update:', data);
          roomRef.current = data;
          setRoom(data);
        });

        newSocket.on('roomDeleted', ({ roomId }) => {
          if (roomRef.current?.roomId === roomId) {
            setRoom(null);
            roomRef.current = null;
          }
        });

        newSocket.on('kickedFromRoom', ({ roomId }) => {
          if (roomRef.current?.roomId === roomId) {
            setRoom(null);
            roomRef.current = null;
          }
        });

        newSocket.on('seatChanged', ({ roomId, id, newSeat }) => {
          console.log(`Seat changed for user ${id} to seat ${newSeat} in room ${roomId}`);
          if (roomRef.current?.roomId === roomId) {
            setRoom((prev) => {
              if (!prev) return prev;
              const updatedUsers = prev.users.map((u) =>
                u.id === id ? { ...u, seat: newSeat } : u
              );
              return { ...prev, users: updatedUsers };
            });
          }
        });

        newSocket.on('roomBackgroundChanged', ({ roomId, newImage }) => {
          console.log(`Room background changed for room ${roomId} to ${newImage}`);
          if (roomRef.current?.roomId === roomId) {
            setRoom((prev) => (prev ? { ...prev, image: newImage } : prev));
          }
        });

        newSocket.on('cohostStatusRemoved', ({ roomId, users }) => {
          console.log(`Cohost status removed in room ${roomId}`);
          if (roomRef.current?.roomId === roomId) {
            setRoom((prev) => (prev ? { ...prev, users } : prev));
          }
        });

        setIsLoading(false);
      } catch (err) {
        console.error('⚠️ Failed to init AudioRoomProvider:', err);
        setIsLoading(false);
      }
    };

    initialize();

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
      setSocket(null);
      roomRef.current = null;
      setRoom(null);
    };
  }, []);

  // Emit Helpers
  const emit = (event: string, payload: any) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(event, payload);
    } else {
      console.warn(`⚠️ Socket not connected: cannot emit "${event}"`);
    }
  };

  // Actions
  const joinRoom = (payload: JoinRoomPayload) => emit('joinRoom', payload);
  const leaveRoom = (roomId: string, id: string) => emit('leaveRoom', { roomId, id });
  const requestCohost = (roomId: string, id: string) => emit('requestCohost', { roomId, id });
  const acceptCohost = (roomId: string, id: string) => emit('acceptCohost', { roomId, id });
  const kickCohostFromSeat = (roomId: string, id: string) => emit('kickCohostFromSeat', { roomId, id });
  const toggleMic = (roomId: string, id: string, micStatus: boolean) =>
    emit('toggleCohostMic', { roomId, id, micStatus });
  const deleteRoom = (roomId: string) => emit('deleteRoom', { roomId });
  const changeSeat = (roomId: string, id: string, newSeat: number) =>
    emit('changeSeat', { roomId, id, newSeat });
  const assignCohostAndSeat = (roomId: string, id: string, newSeat: number) =>
    emit('assignCohostAndSeat', { roomId, id, newSeat });
  const toggleRoomLock = (roomId: string, isLocked: boolean) =>
    emit('toggleRoomLock', { roomId, isLocked });
  const changeRoomBackground = (roomId: string, newImage: string) =>
    emit('changeRoomBackground', { roomId, newImage }); // New
  const removeCohostStatus = (roomId: string, id: string) =>
    emit('removeCohostStatus', { roomId, id }); // New

  return (
    <AudioRoomContext.Provider
      value={{
        socket,
        socketRef: socketRef.current,
        userId,
        user,
        isLoading,
        room,
        joinRoom,
        leaveRoom,
        requestCohost,
        acceptCohost,
        kickCohostFromSeat,
        toggleMic,
        deleteRoom,
        changeSeat,
        assignCohostAndSeat,
        toggleRoomLock,
        changeRoomBackground, // New
        removeCohostStatus, // New
      }}
    >
      {children}
    </AudioRoomContext.Provider>
  );
};

// Hook
export const useAudioRoom = (): AudioRoomContextType => {
  const context = useContext(AudioRoomContext);
  if (!context) throw new Error('useAudioRoom must be used within AudioRoomProvider');
  return context;
};