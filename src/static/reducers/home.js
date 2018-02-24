import {
    HOME_VIDEOS_FETCHED,
    REQUEST_LIVESTREAWM,
    HOME_LIVESTREAM_FETCHED,
    RECOMMENDED_LIVESTREAM_FETCHED,
    VIDEO_FETCHED
} from '../constants';

const initialState = {
    homeVideos: null,
    livestreamRequested: null,
    recommendedVideos: null,
    fetchedVideo:null
};

export default function homeReducer(state = initialState, action) {
    switch (action.type) {
        case HOME_VIDEOS_FETCHED:
            return Object.assign({}, state, {
                homeVideos: action.payload.data,
            });
        case REQUEST_LIVESTREAWM:
            return Object.assign({}, state, {
                livestreamRequested: action.payload.data,
            });
        case HOME_LIVESTREAM_FETCHED:
            return Object.assign({}, state, {
                upcomingStreams: action.payload.data,
            });
        case RECOMMENDED_LIVESTREAM_FETCHED:
            return Object.assign({}, state, {
                recommendedVideos: action.payload.data,
            });
        case VIDEO_FETCHED:
            return Object.assign({}, state, {
                fetchedVideo: action.payload.data,
            });
        default:
            return state;
    }
}
