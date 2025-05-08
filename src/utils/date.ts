export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};


export const formatMessage = (msg: any) => ({
    _id: msg._id,
    text: msg.message,
    createdAt: new Date(msg.createdAt),
    user: {
        _id: msg.sender._id,
        name: msg.sender.name || "Unknown",
        avatar: msg.sender.profileImage || "https://example.com/default-avatar.png"
    },
});

  // const formatMessageLive = (msg: any): IMessage => ({
    //     _id: msg._id,
    //     text: msg.message,
    //     createdAt: new Date(msg.createdAt),
    //     user: {
    //         _id: msg.sender,
    //         name: msg.senderName || "Unknown",
    //         avatar: avatar || "https://example.com/default-avatar.png"
    //     },
    // });