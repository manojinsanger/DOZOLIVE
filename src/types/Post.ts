import { PostResponse } from "@/store/features/Post_related/createPostServices";

export type RootStackParamList = {
    Explore: undefined;
    PostDetail: { postId: string };
    UpdatePost: { post: PostResponse };

  };
  