const api = {
  auth: {
    signup: "api/users/signup",
    login: "api/users/signin",
    logout: "api/users/logout",
    me: "api/users/me",
    view: (slug) => `api/users/viewProfile/${slug}`,
    follow: (userId) => `api/users/follow/${userId}`,
    unFollow: (userId) => `api/users/unfollow/${userId}`,
  },
  tweet: {
    create: "api/tweets/add",
    getAll: (page) => `api/tweets/all?page=${page}`,
    getAllByUser: (slug) => `api/tweets/${slug}`,
    getAllLikedTweetsByUser: (slug) => `api/tweets/liked/${slug}`,
    like: (tweetId) => `api/tweets/like/me/${tweetId}`,
    disLike: (tweetId) => `api/tweets/dislike/me/${tweetId}`,
    delete: (tweetId) => `api/tweets/delete/me/${tweetId}`,
  },
};

export default api;
