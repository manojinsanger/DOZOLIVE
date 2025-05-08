import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { formatDate } from '@/utils/date';

interface ChipProps {
    text: string;
}

interface ListItemProps {
    title: string;
    description: string;
}

const Chip: React.FC<ChipProps> = ({ text }) => (
    <View style={styles.chip}>
        <Text style={styles.chipText}>{text}</Text>
    </View>
);

const ListItem: React.FC<ListItemProps> = ({ title, description }) => (
    <View style={styles.listItem}>
        <Text style={styles.listTitle}>{title}</Text>
        <Text style={styles.listDescription}>{description}</Text>
    </View>
);

interface DemoData {
    firstName: string;
    age: number;
    gender: string;
    followers: number;
    follows: number;
    friends: number;
    dob: string;
    knownLanguages: string[];
    interests: string[];
    skills: string[];
    education: { institute: string; date: string }[];
    careers: { company: string; role: string; location: string; duration: string }[];
    socialProfiles: {
        platform: string;
        color: string;
        icon:
        | "instagram-with-circle"
        | "facebook-with-circle"
        | "twitter-with-circle"
        | "youtube-with-circle"
        | "linkedin-with-circle"
        | "pinterest-with-circle"
        // | "snapchat";
    }[];
}

const demoData: DemoData = {
    firstName: "John Doe",
    age: 25,
    gender: "Male",
    followers: 5000,
    follows: 300,
    friends: 150,
    dob: "11 Oct 1998",
    knownLanguages: ["English", "Hindi", "Spanish"],
    interests: ["Reading", "Traveling", "Gaming", "Reading", "Traveling", "Gaming"],
    skills: ["React", "Node.js", "TypeScript"],
    education: [
        { institute: "Institute of Engineering, Delhi", date: "2004-2008" },
        { institute: "Institute of Engineering, Delhi", date: "2004-2008" },
        { institute: "Institute of Engineering, Delhi", date: "2004-2008" }
    ],
    careers: [
        { company: "Bams Technologies Pvt. Ltd.", role: "CEO", location: "Chennai", duration: "Feb 2019 - Till Today" },
        { company: "Bams Technologies Pvt. Ltd.", role: "CEO", location: "Chennai", duration: "Feb 2019 - Till Today" },
        { company: "Bams Technologies Pvt. Ltd.", role: "CEO", location: "Chennai", duration: "Feb 2019 - Till Today" },
    ],
    socialProfiles: [
        { platform: "LinkedIn", icon: "linkedin-with-circle", color: "#0077b5" },
        { platform: "Twitter", icon: "twitter-with-circle", color: "#1DA1F2" },
        { platform: "Facebook", icon: "facebook-with-circle", color: "#4267B2" },
        { platform: "Instagram", icon: "instagram-with-circle", color: "#C13584" },
        { platform: "YouTube", icon: "youtube-with-circle", color: "#FF0000" },
        { platform: "Pinterest", icon: "pinterest-with-circle", color: "#E60023" },
    ],
};


const UserDetails: React.FC<any> = ({ user }) => {
    const educationList = Array.isArray(user?.educationList) ? user.educationList : [];
    const careerList = Array.isArray(user?.careerList) ? user.careerList : [];

    console.log("User Details: ", user);

    return (
        <View style={styles.container}>
            {/* Basic Details */}
            {/* <View style={styles.detailsContainer}>
                <Text style={styles.detailText}>Date of Birth</Text>
                <Text style={styles.detailText}>{formatDate(user?.dateOfBirth)}</Text>
            </View> */}

            <Text style={styles.sectionTitle}>Known Languages</Text>
            <View style={styles.chipContainer}>
                {/* {demoData.knownLanguages.map((lang, index) => (
                    <Chip key={index} text={lang} />
                ))} */}
                <Chip text={user?.language} />
            </View>

            {user?.interests?.length !== 0 && (
                <>
                    <Text style={styles.sectionTitle}>Interests</Text>
                    <View style={styles.chipContainer}>
                        {user?.interests.map((interest: string, index: React.Key) => (
                            <Chip key={index} text={interest} />
                        ))}
                    </View>
                </>)}

            {user?.skills?.length !== 0 && (
                <>
                    <Text style={styles.sectionTitle}>Skills</Text>
                    <View style={styles.chipContainer}>
                        {user?.skills.map((skill: string, index: React.Key) => (
                            <Chip key={index} text={skill} />
                        ))}
                    </View>
                </>)}

            {educationList.length > 0 && (
                <>
                    <Text style={styles.sectionTitle}>Education</Text>
                    {educationList.map((edu: { _id: React.Key | null | undefined; education: string; educationYear: string; }) => (
                        <ListItem key={edu?._id} title={edu?.education} description={edu?.educationYear} />
                    ))}
                </>
            )}


            {careerList.length > 0 && (
                <>
                    <Text style={styles.sectionTitle}>Careers</Text>
                    {careerList.map((career: { _id: React.Key | null | undefined; company: string; position: string; fromYear: number; toYear: number; }) => (
                        <ListItem
                            key={career._id}
                            title={`${career.company} - ${career.position}`}
                            description={`${career.fromYear} - ${career.toYear}`}
                        />
                    ))}
                </>
            )}


            {/* <Text style={styles.sectionTitle}>Social Profiles</Text>
            <View style={styles.socialProfileRow}>
                {demoData.socialProfiles.map((profile, index) => (
                    <TouchableOpacity key={index} style={styles.iconContainer}>
                        <Entypo name={profile.icon} size={32} color={profile.color} />
                    </TouchableOpacity>
                ))}
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    detailsContainer: {
        marginBottom: 20,
    },
    detailText: {
        fontSize: 16,
        marginBottom: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 15,
        marginBottom: 15,
    },
    chipContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 15,
    },
    chip: {
        backgroundColor: "#e0e0e0",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 15,
        margin: 5,
    },
    chipText: {
        fontSize: 14,
    },
    listItem: {
        marginBottom: 10,
    },
    listTitle: {
        fontSize: 16,
        fontWeight: "500",
    },
    listDescription: {
        fontSize: 14,
        color: "#666",
    },
    socialProfileRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        flexWrap: "nowrap",
    },
    iconContainer: {
        // marginHorizontal: 1,
    },
    socialText: {
        fontSize: 16,
        marginLeft: 10,
    },
});

export default UserDetails;
