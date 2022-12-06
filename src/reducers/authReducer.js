const authReducer = (state = { authData: null, loading: false, error: false, updateLoading: false }, action) => {
    switch (action.type) {
        case "AUTH_START":
            return { ...state, loading: true, error: false };
        case "AUTH_COMPLETED":
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action.data, loading: false, error: false };
        case "AUTH_FAIL":
            return { ...state, loading: false, error: true };

        case "UPDATING_START":
            return { ...state, updateLoading: true, error: false };

        case "UPDATING_SUCCESS":
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action.data, updateLoading: false, error: false };

        case "UPDATING_FAIL":
            return { ...state, updateLoading: true, error: true };

        case "LOG_OUT":
            localStorage.clear();
            return { ...state, authData: null, loading: false, error: false, updateLoading: false };

        case "FOLLOW_USER":
            return { ...state, authData: { ...state.authData, user: { ...state.authData.user, following: [...state.authData.user.following, action.data] } } }

        case "UNFOLLOW_USER":
            return { ...state, authData: { ...state.authData, user: { ...state.authData.user, following: [...state.authData.user.following.filter((personId) => personId !== action.data)] } } }

        case "INCREASE_STARS":
            let newstars = state.authData.user.stars + action.data;
            return { ...state, authData: { ...state.authData, user: { ...state.authData.user, stars: newstars } } }

        case "DECREASE_STARS":
            let newstars2 = state.authData.user.stars - action.data;
            if (newstars2 < 0) {
                newstars2 = 0;
            }
            return { ...state, authData: { ...state.authData, user: { ...state.authData.user, stars: newstars2 } } }

        default:
            return state;
    }
};

export default authReducer;