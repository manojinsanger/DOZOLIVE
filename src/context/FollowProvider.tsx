import React, { createContext, useContext, useState, useEffect } from "react";
import { followApi } from "@/services/followApi";

interface FollowContextType {
    follower: number;
    following: number;
    friends: number;
    isLoading: boolean;
    error: string | null;
    fetchFollowCounts: (userId?: number, liveId?: number) => Promise<void>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const FollowContext = createContext<FollowContextType | undefined>(undefined);

export const FollowProvider: React.FC<{
    children: React.ReactNode;
    userId?: number;
    liveId?: number;
}> = ({ children}) => {
    const [follower, setFollower] = useState<number>(0);
    const [following, setFollowing] = useState<number>(0);
    const [friends, setFriends] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Single function to fetch all follow counts
    const fetchFollowCounts = async (userId?: number) => {
        try {
            setIsLoading(true);
            setError(null);

            const counts = await followApi.getNumberOfFollowers();            

            // Update all three counts at once
            setFollower(counts.followers || 0);
            setFollowing(counts.following || 0);
            setFriends(counts.friends || 0);

        } catch (err) {
            console.error("Error fetching follow counts:", err);
            setError("Failed to fetch follow counts");
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch follow counts on mount or when userId/liveId changes
    useEffect(() => {
        fetchFollowCounts();
    }, []);

    return (
        <FollowContext.Provider value={{
            follower,
            following,
            friends,
            isLoading,
            error,
            fetchFollowCounts,
            setIsLoading
        }}>
            {children}
        </FollowContext.Provider>
    );
};

// Fixed useFollow hook to correctly use the context
export const useNoOfFollowers = (): FollowContextType => {
    const context = useContext(FollowContext);

    if (!context) {
        throw new Error("useFollow must be used within a FollowProvider");
    }

    return context;
};