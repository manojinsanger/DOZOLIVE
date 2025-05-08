export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI5NzRhOGE4MS1mNzIyLTQ0YTgtODc1NC04YzNjMTZkZGQwOTIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTczODc1NzQwNiwiZXhwIjoxNzQxMzQ5NDA2fQ.JpoUqsjZt7RNbGp0OeqhH-zXgxCU8wM-gc5aQtXI7zw";


export const createStream = async ({ token }) => {
    const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
        method: "POST",
        headers: {
            authorization: `${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
    });
    //Destructuring the streamId from the response
    const { roomId: streamId } = await res.json();
    return streamId;
};