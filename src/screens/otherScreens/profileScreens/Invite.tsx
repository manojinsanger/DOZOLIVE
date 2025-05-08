import { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Share,
    FlatList,
    Dimensions,
    Image,
    Animated,
    Alert,
    ActivityIndicator,
    StatusBar,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { getRefer } from "@/services/referrals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { scaleWidth, scaleHeight, scaleFont } from "@/constants/scaling";
import DarkContentStatusBar from "@/components/statusbar/DarkContentStatusBar";

const { width } = Dimensions.get("window");

type InvitedUser = {
    id: string;
    name: string;
    gender: string;
    profileImage: string;
    homeCountry: string;
    _id: string;
};

const InviteScreen = ({ navigation }: { navigation: any }) => {
    const [inviteLink, setInviteLink] = useState("");
    const [totalPoints, setTotalPoints] = useState(0);
    const [totalInvites, setTotalInvites] = useState(0);
    const [incomeRank, setIncomeRank] = useState(0);
    const [invitedUsers, setInvitedUsers] = useState<InvitedUser[]>([]);
    const [activeTab, setActiveTab] = useState<"income" | "rank">("income");
    const [loading, setLoading] = useState(false);
    const [refCode, setRefCode] = useState<string | null>(null);

    const animatedValue = useRef(new Animated.Value(0)).current;

    const fetchData = async () => {
        setLoading(true);
        await fetchProfile();
        await fetchInvitedUsers();
        await fetchRewards();
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchProfile = async () => {
        try {
            const userData = await AsyncStorage.getItem("fbUser");
            if (userData) {
                const parsedUser = JSON.parse(userData);
                setRefCode(parsedUser.referralCode);
            } else {
                setRefCode(null);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            setRefCode(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (refCode) {
            setInviteLink(`https://myapp.com/download?ref=${refCode}`);
        }
    }, [refCode]);

    const fetchRewards = () => {
        setTotalPoints(0);
        setIncomeRank(0);
    };

    const fetchInvitedUsers = async () => {
        const invite = await getRefer();
        if (invite.success === true) {
            setInvitedUsers(invite.data.referredUsers);
            setTotalInvites(invite.data.referredUsers?.length || 0);
        }
    };

    const shareInvite = async () => {
        try {
            if (refCode) {
                await Share.share({
                    message: `Join the app using my invite link: ${inviteLink}`,
                });
            } else {
                Alert.alert(
                    "Referral Code Missing",
                    "You don't have a referral code. Please check your account or contact support."
                );
            }
        } catch (error) {
            console.error("Error sharing invite:", error);
        }
    };

    const handleTabPress = (tab: "income" | "rank") => {
        setActiveTab(tab);
        Animated.timing(animatedValue, {
            toValue: tab === "income" ? 0 : 1,
            duration: 100,
            useNativeDriver: false,
        }).start();
    };

    const incomeBackgroundColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["#F1567D", "#DDD"],
    });

    const rankBackgroundColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["#DDD", "#F1567D"],
    });

    // Custom Header Component
    const CustomHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.headerBackButton}
                >
                    <MaterialIcons
                        name="arrow-back"
                        size={scaleFont(24)}
                        color="#fff"
                    />
                </TouchableOpacity>
                <Animated.Text style={[styles.headerTitle, { color: "#fff" }]}>
                    Invite & Rewards
                </Animated.Text>
                <View style={styles.headerPlaceholder} />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <DarkContentStatusBar/>
            <CustomHeader />
            <View style={{ paddingHorizontal: scaleWidth(10) , flex:1 }}>
                {/* Invite Banner */}
                <View style={styles.inviteBanner}>
                    <Text style={styles.inviteTitle}>Invite & Earn Rewards!</Text>
                    <Text style={styles.inviteSubTitle}>Get up to $100 per invite</Text>
                </View>

                <View style={styles.toggleSection}>
                    <Animated.View
                        style={[
                            styles.toggleButton,
                            { backgroundColor: incomeBackgroundColor, borderRadius: scaleWidth(10) },
                        ]}
                    >
                        <TouchableOpacity
                            style={styles.toggleButtonContent}
                            onPress={() => handleTabPress("income")}
                        >
                            <Text
                                style={[
                                    styles.toggleText,
                                    activeTab === "income" && styles.activeText,
                                ]}
                            >
                                Income
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View
                        style={[
                            styles.toggleButton,
                            { backgroundColor: rankBackgroundColor, borderRadius: scaleWidth(10) },
                        ]}
                    >
                        <TouchableOpacity
                            style={styles.toggleButtonContent}
                            onPress={() => handleTabPress("rank")}
                        >
                            <Text
                                style={[styles.toggleText, activeTab === "rank" && styles.activeText]}
                            >
                                Rank
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>

                {/* Content Section */}
                {activeTab === "income" ? (
                    <View style={styles.infoSection}>
                        <View style={styles.rewardSection}>
                            <Text style={styles.sectionTitle}>My Rewards</Text>
                            <View style={styles.rewardBoxes}>
                                <View style={styles.rewardBox}>
                                    <Text style={styles.rewardValue}>{totalPoints}</Text>
                                    <Text style={styles.rewardLabel}>Total Points</Text>
                                </View>
                                <View style={styles.rewardBox}>
                                    <Text style={styles.rewardValue}>{totalInvites}</Text>
                                    <Text style={styles.rewardLabel}>Total Invites</Text>
                                </View>
                            </View>
                        </View>

                        {/* Invited Users List */}
                        <Text style={styles.sectionTitle}>Invited People</Text>
                        {loading ? (
                            <View style={styles.loaderContainer}>
                                <ActivityIndicator size="large" color="#F1567D" />
                            </View>
                        ) : (
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={invitedUsers}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate(`/user/profile/${item._id}`)}
                                        style={styles.userRow}
                                    >
                                        <Image source={{ uri: item.profileImage }} style={styles.userAvatar} />
                                        <View>
                                            <Text style={styles.userName}>{item.name}</Text>
                                            <Text style={styles.userLevel}>
                                                {item.gender} | {item.homeCountry}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                ListEmptyComponent={() => (
                                    <View style={styles.emptyContainer}>
                                        <Text style={styles.emptyText}>No invited users found.</Text>
                                    </View>
                                )}
                                contentContainerStyle={{ paddingBottom: scaleHeight(80) }}
                            />
                        )}
                    </View>
                ) : (
                    <View style={[styles.infoSection, styles.rankSection]}>
                        <Text style={styles.rankText}>
                            Your rank is #{incomeRank} among all users.
                        </Text>
                    </View>
                )}
                <View style={{ height: scaleHeight(40) }}>
                    <View style={styles.bottomSection}>
                        {/* Invite Button at Bottom */}
                        <TouchableOpacity style={styles.inviteButton} onPress={shareInvite}>
                            <Text style={styles.inviteButtonText}>Invite Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </View>
    );
};

export default InviteScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        // paddingHorizontal: scaleWidth(20),
        // paddingTop: scaleHeight(20),
        // paddingTop: StatusBar.currentHeight
    },
    // Custom Header Styles
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#F1567D",
        paddingHorizontal: scaleWidth(15),
        paddingVertical: scaleHeight(10),
        paddingTop: scaleHeight(40),
    },
    headerBackButton: {
        padding: scaleWidth(10),
    },
    headerTitle: {
        fontSize: scaleFont(20),
        fontWeight: "600",
    },
    headerPlaceholder: {
        width: scaleWidth(44),
    },
    inviteBanner: {
        padding: scaleWidth(20),
        borderRadius: scaleWidth(15),
        alignItems: "center",
        marginBottom: scaleHeight(20),
        backgroundColor: "#F5F5F5",
    },
    inviteTitle: {
        fontSize: scaleFont(22),
        fontWeight: "bold",
        color: "#333",
    },
    inviteSubTitle: {
        fontSize: scaleFont(16),
        color: "#666",
        marginTop: scaleHeight(5),
    },
    toggleSection: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: scaleHeight(20),
        borderRadius: scaleWidth(10),
        backgroundColor: "#DDD",
        overflow: "hidden",
    },
    toggleButton: {
        flex: 1,
        paddingVertical: scaleHeight(12),
    },
    toggleButtonContent: {
        width: "100%",
        alignItems: "center",
    },
    toggleText: {
        fontSize: scaleFont(16),
        color: "#666",
    },
    activeText: {
        color: "#FFF",
    },
    infoSection: {
        backgroundColor: "#F9F9F9",
        flex: 1,
        paddingVertical: scaleHeight(15),
        paddingHorizontal: scaleWidth(10),
        borderRadius: scaleWidth(10),
        marginBottom: scaleHeight(50),
    },
    sectionTitle: {
        fontSize: scaleFont(18),
        fontWeight: "bold",
        color: "#333",
        marginBottom: scaleHeight(10),
    },
    rewardSection: {
        marginBottom: scaleHeight(20),
    },
    rewardBoxes: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    rewardBox: {
        width: width * 0.35,
        backgroundColor: "#FFF",
        borderRadius: scaleWidth(10),
        padding: scaleWidth(15),
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: scaleWidth(5),
        elevation: 5,
    },
    rewardValue: {
        fontSize: scaleFont(22),
        color: "#F1567D",
        fontWeight: "bold",
    },
    rewardLabel: {
        fontSize: scaleFont(14),
        color: "#777",
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    userRow: {
        flexDirection: "row",
        alignItems: "center",
        padding: scaleWidth(10),
        backgroundColor: "#F5F5F5",
        borderRadius: scaleWidth(10),
        marginBottom: scaleHeight(10),
    },
    userAvatar: {
        width: scaleWidth(50),
        height: scaleWidth(50),
        borderRadius: scaleWidth(25),
        marginRight: scaleWidth(15),
    },
    userName: {
        fontSize: scaleFont(16),
        fontWeight: "bold",
        color: "#333",
    },
    userLevel: {
        fontSize: scaleFont(14),
        color: "#666",
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: scaleHeight(20),
    },
    emptyText: {
        fontSize: scaleFont(16),
        color: "#888",
        fontWeight: "semibold",
    },
    rankSection: {
        alignItems: "center",
    },
    rankText: {
        fontSize: scaleFont(18),
        color: "#333",
    },
    bottomSection: {
        position: "absolute",
        bottom: scaleHeight(6),
        width: "100%",
        alignSelf: "center",
    },
    inviteButton: {
        backgroundColor: "#F1567D",
        paddingVertical: scaleHeight(15),
        alignItems: "center",
        borderRadius: scaleWidth(10),
        marginBottom: scaleHeight(20),
    },
    inviteButtonText: {
        fontSize: scaleFont(18),
        fontWeight: "bold",
        color: "#FFF",
    },
});