import {
    HOME_VIDEOS_FETCHED,
    REQUEST_LIVESTREAWM,
    HOME_LIVESTREAM_FETCHED
} from '../constants';

const initialState = {
    homeVideos: null,
    livestreamRequested: null
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
        default:
            return state;
    }
}
