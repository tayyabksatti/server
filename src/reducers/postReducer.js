const postReducer = (state = { posts: [], loading: false, error: false, uploading: false }, action
) => {
    switch (action.type) {
        case "UPLOAD_START":
            return { ...state, uploading: true, error: false };
        case "UPLOAD_SUCCESS":
            return { ...state, posts: [action.data, ...state.posts], uploading: false, error: false };
        case "UPLOAD_FAIL":
            return { ...state, uploading: false, error: true };
        case "RETRIEVING_START":
            return { ...state, loading: true, error: false };
        case "RETRIEVEING_SUCCESFULL":
            return { ...state, posts: action.data, loading: false, error: false };
        case "RETRIEVING_FAILED":
            return { ...state, loading: false, error: true };
        case "CLEAR_POSTS":
            return { ...state, posts: [] };
        case "INVITING_SUCCESS":
            return { ...state, posts: state.posts.map((post) => post._id === action.data._id ? action.data : post), loading: false, error: false, uploading: false };
        default:
            return state;
    }
}

export default postReducer;