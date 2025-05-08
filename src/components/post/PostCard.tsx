import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import customColors from '@/constants/styles';

// const demoData: ProfileData = {
//     id: "2133213",
//     coverImage:
//         'https://images.pexels.com/photos/28343562/pexels-photo-28343562/free-photo-of-serene-sunset-over-przemkow-wetlands.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//     profileImage:
//         'https://images.pexels.com/photos/12011615/pexels-photo-12011615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//     firstName: 'Riya',
//     gender: 'female',
//     age: 25,
//     gifts: 100,
//     level: 100,
//     friends: 123,
//     follows: 122,
//     followers: 456,
//     visitors: 789,
// };


const Header: React.FC<{ profileImage: string, name: string, location: string }> = ({ profileImage, name, location }) => {
    return (
        <View style={styles.headerContainer}>
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
            <View style={styles.headerInfo}>
                <Text style={styles.nameText}>{name}</Text>
                <Text style={styles.locationText}>{location}</Text>
            </View>
            <MaterialIcons name="more-vert" size={24} color="black" />
        </View>
    );
};

const Post: React.FC<{ postImage: string, description: string, likeCount: number, onLikePress: () => void }> = ({ postImage, description, likeCount, onLikePress }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleShowMore = () => {
        setIsExpanded(!isExpanded);
    };
    const formattedLikeCount = new Intl.NumberFormat('en-US').format(likeCount);


    return (
        <View style={styles.postContainer}>
            <Image source={{ uri: postImage }} style={styles.postImage} />
            <View style={styles.postDescriptionContainer}>
                <View style={styles.likeSection}>
                    <Text>{formattedLikeCount} Likes</Text>
                    <View style={styles.icons}>
                        <TouchableOpacity onPress={onLikePress}>
                            <Ionicons name="heart-outline" size={24} color={customColors.gray800} />

                        </TouchableOpacity>
                        <Ionicons name="chatbubble-outline" size={24} color={customColors.gray800}/>
                        <FontAwesome name="paper-plane" size={24} color={customColors.gray800} />
                    </View>
                </View>
                <Text numberOfLines={isExpanded ? 0 : 2} style={styles.descriptionText}>
                    {description}
                </Text>
                <TouchableOpacity onPress={handleShowMore}>
                    <Text style={styles.showMoreText}>{isExpanded ? 'Show Less' : 'Show More'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const CommentsSection: React.FC<{ comments: string[], onSubmitComment: (comment: string) => void }> = ({ comments, onSubmitComment }) => {
    const [commentText, setCommentText] = useState('');

    return (
        <View style={styles.commentsContainer}>
            <Text style={styles.viewAllCommentsText}>View All Comments ({comments.length})</Text>
            {/* <ScrollView style={styles.commentsList}>
                {comments.map((comment, index) => (
                    <Text key={index} style={styles.commentText}>{comment}</Text>
                ))}
            </ScrollView> */}
            <View style={styles.commentInputContainer}>
                <Image source={{ uri: 'https://randomuser.me/api/portraits/women/11.jpg' }} style={styles.profileImageSmall} />
                <TextInput
                    style={styles.commentInput}
                    placeholder="Add a comment..."
                    value={commentText}
                    onChangeText={setCommentText}
                />
                <TouchableOpacity onPress={() => { onSubmitComment(commentText); setCommentText(''); }}>
                    <Text style={styles.submitButton}>Post</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


type PostCardProps = {
    postImage: string;
    description: string;
    likeCount: number;
    comments: string[];
};
const PostCard: React.FC<PostCardProps> = ({ postImage, description }) => {
    const [likeCount, setLikeCount] = useState(121212);
    const [comments, setComments] = useState<string[]>(['Great post!', 'Awesome work!']);

    const handleLikePress = () => {
        setLikeCount(likeCount + 1);
    };

    const handleSubmitComment = (comment: string) => {
        setComments([...comments, comment]);
    };

    return (
        <View style={styles.container}>
            <Header profileImage="https://randomuser.me/api/portraits/women/11.jpg" name="Riya" location="New York, USA" />
            <Post postImage={postImage} description={description} likeCount={likeCount} onLikePress={handleLikePress} />
            <CommentsSection comments={comments} onSubmitComment={handleSubmitComment} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        paddingVertical: 15,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        justifyContent: 'space-between',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    headerInfo: {
        flex: 1,
        marginLeft: 10,
    },
    nameText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    locationText: {
        fontSize: 12,
        color: 'gray',
    },
    postContainer: {
        marginVertical: 15,
    },
    postDescriptionContainer: {
        marginHorizontal: 15,

    },
    postImage: {
        width: '100%',
        height: 250,
    },
    likeSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 100,
    },
    descriptionText: {
        fontSize: 14,
        color: '#1F1F1F',
    },
    showMoreText: {
        color: '#9E9E9E',
        fontSize: 14,
    },
    commentsContainer: {
        marginTop: 0,
        marginHorizontal: 15,
    },
    viewAllCommentsText: {
        color: '#9E9E9E',
        fontSize: 14,
    },
    commentsList: {
        maxHeight: 150,
        marginVertical: 10,
    },
    commentText: {
        fontSize: 14,
        color: 'black',
    },
    commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    profileImageSmall: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    commentInput: {
        flex: 1,
        borderRadius: 20,
        padding: 5,
        fontSize: 14,
    },
    submitButton: {
        fontSize: 16,
        color: '#9E9E9E',
        marginLeft: 10,
    },
});

export default PostCard;
