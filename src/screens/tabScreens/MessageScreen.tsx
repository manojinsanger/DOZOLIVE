import { ThemedView } from "@/components/ThemedView";
import NoMessageScreen from "@/components/blank_state/no_message";
import Header from "@/components/common/Header";
import LoadingScreen from "@/components/common/Loading";
import MainContainerP from "@/components/common/mainContainers/MainContainerP";
import { MessageCard } from "@/components/message/MessageCard";
import { chatUserList } from "@/services/chatServices";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";



type User = {
  _id: string;
  name: string;
  profileImage: string;
  homeCountry: string;
  isOnline?: boolean | null;
  lastSeen?: string | null;
  lastMessage?: string | null;
  lastMessageTime?: string | null;
};


export default function MessageScreen() {
  const [user, setUser] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  async function fetchUser(page = 1) {
    try {
      if (page === 1) setLoading(true);
      const response = await chatUserList(page);
      if (response.success) {
        setUser((prevUsers) =>
          page === 1 ? response?.data?.users : [...prevUsers, ...response?.data?.users]
        );
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error("⚠️ Error fetching user data:", error);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const loadMoreUsers = () => {
    if (!isFetchingMore && currentPage < totalPages) {
      setIsFetchingMore(true);
      setCurrentPage((prevPage) => {
        const nextPage = prevPage + 1;
        fetchUser(nextPage);
        return nextPage;
      });
    }
  };

  if (loading && user.length === 0) return <LoadingScreen />;

  if (user.length === 0)
    return (
      <>
        <Header appName={"Messages"} />
        <NoMessageScreen />
      </>
    );

  return (
    <MainContainerP>
      <View style={styles.safeArea}>
        <ThemedView style={styles.container}>
          <Header appName="Messages" />
          <FlatList
            data={user}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <MessageCard
                id={item._id}
                name={item.name}
                status={item.isOnline ? "Online" : "Offline"}
                imageUrl={item.profileImage}
                lastMessageTime={item.lastMessageTime ?? "2025-01-25T14:30:00Z"}
                lastMessage={item.lastMessage ?? "demo message"}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMoreUsers}
            onEndReachedThreshold={0.5}
            ListFooterComponent={isFetchingMore ? <LoadingScreen /> : null}
          />
        </ThemedView>
      </View>
    </MainContainerP>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 96,
    paddingBottom: 30,
  },
  title: {
    marginBottom: 10,
    paddingHorizontal: 8,
    marginTop: 15,
    fontSize: 24,
  },
  listContent: {
    paddingBottom: 80,
    paddingTop: 16,
  },
  scrollContent: {
    paddingBottom: 30,
  },
});
