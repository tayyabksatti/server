import * as PostsApi from '../api/PostRequest'


export const getTimelinePosts = (id) => async (dispatch) => {
    dispatch({ type: "RETRIEVING_START" });
    try {
        const { data } = await PostsApi.getTimelinePosts(id);
        dispatch({ type: "RETRIEVEING_SUCCESFULL", data: data });
    } catch (error) {
        dispatch({ type: "RETRIEVING_FAILED" });
        console.log(error);
    }
};


export const clearPosts = () => async (dispatch) => {
    dispatch({ type: "CLEAR_POSTS" });
}
