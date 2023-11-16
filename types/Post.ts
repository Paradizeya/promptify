type Post = {
  _id: string;
  userId: string;
  prompt: string;
  tag: string;
  creator: {
    _id: string;
    username: string;
    email: string;
    image: string;
  };
};

export default Post;
