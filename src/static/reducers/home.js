import {
    HOME_VIDEOS_FETCHED
} from '../constants';

const initialState = {
    homeVideos: null,
};

export default function dataReducer(state = initialState, action) {
    switch (action.type) {
        case HOME_VIDEOS_FETCHED:
            return Object.assign({}, state, {
                homeVideos: action.payload.data,
            });

        default:
            return state;
    }
}
