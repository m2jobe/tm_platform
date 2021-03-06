import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { TRIGGER_LIKE_FEEDBACK,VIDEO_LIKED_DATA,VIDEO_FETCHED, RECOMMENDED_LIVESTREAM_FETCHED, HOME_LIVESTREAM_FETCHED, REQUEST_LIVESTREAWM, HOME_VIDEOS_FETCHED } from '../constants';


export function homeVideosFetched(data) {
    return {
        type: HOME_VIDEOS_FETCHED,
        payload: {
            data
        }
    };
}

export function recommendedVideosFetched(data) {
    return {
        type: RECOMMENDED_LIVESTREAM_FETCHED,
        payload: {
            data
        }
    };
}

export function homeLivestreamFetched(data) {
    return {
        type: HOME_LIVESTREAM_FETCHED,
        payload: {
            data
        }
    };
}

export function videoFetched(data) {
    return {
        type: VIDEO_FETCHED,
        payload: {
            data
        }
    };
}


export function requestLivestreamSent(data) {
    return {
        type: REQUEST_LIVESTREAWM,
        payload: {
            data
        }
    };
}

export function triggerLikeFeedback(data) {
    return {
        type: TRIGGER_LIKE_FEEDBACK,
        payload: {
          data
        }
    };
}

export function videoLikedData(data) {
    return {
        type: VIDEO_LIKED_DATA,
        payload: {
            data
        }
    };
}


function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


export function getVideoLikes(videoID, user_email) {
    return (dispatch, state) => {
      return fetch(`${SERVER_URL}/api/v1/content/getVideoLikes/`, {
          method: 'post',
          credentials: "same-origin",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              //"X-CSRFToken": getCookie("csrftoken"),
          },
          body: JSON.stringify({videoID: videoID, user_email: user_email})
      })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
              dispatch(videoLikedData(response));
            })
            .catch((error) => {
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}


export function triggerLike(videoID, user_email) {
    return (dispatch, state) => {
      return fetch(`${SERVER_URL}/api/v1/content/triggerLike/`, {
          method: 'post',
          credentials: "same-origin",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              //"X-CSRFToken": getCookie("csrftoken"),
          },
          body: JSON.stringify({videoID: videoID, user_email: user_email})
      })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
              //alert("Gotcha!");
                dispatch(triggerLikeFeedback(response));
            })
            .catch((error) => {
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

export function fetchVideo(videoID) {
    return (dispatch, state) => {
      return fetch(`${SERVER_URL}/api/v1/content/fetchVideo/`, {
          method: 'post',
          credentials: "same-origin",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              //"X-CSRFToken": getCookie("csrftoken"),
          },
          body: JSON.stringify({videoID: videoID})
      })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(videoFetched(response));
            })
            .catch((error) => {
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}


export function fetchHomeVideos() {
    return (dispatch, state) => {
      return fetch(`${SERVER_URL}/api/v1/content/fetchHomeVideos/`, {
          method: 'post',
          credentials: "same-origin",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              //"X-CSRFToken": getCookie("csrftoken"),
          }
      })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(homeVideosFetched(response));
            })
            .catch((error) => {
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

export function fetchRecommendations(videoID, numberofVidstofetch) {
    return (dispatch, state) => {
      return fetch(`${SERVER_URL}/api/v1/content/fetchRecommendations/`, {
          method: 'post',
          credentials: "same-origin",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              //"X-CSRFToken": getCookie("csrftoken"),
          }
      })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(recommendedVideosFetched(response));
            })
            .catch((error) => {
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

export function fetchHomeLivestream() {
    return (dispatch, state) => {
      return fetch(`${SERVER_URL}/api/v1/content/fetchHomeLivestream/`, {
          method: 'post',
          credentials: "same-origin",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              //"X-CSRFToken": getCookie("csrftoken"),
          }
      })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(homeLivestreamFetched(response));
            })
            .catch((error) => {
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

export function requestLivestream(artistName, userEmail, eventDate, eventLocation) {
    return (dispatch, state) => {
      return fetch(`${SERVER_URL}/api/v1/content/requestLivestream/`, {
          method: 'post',
          credentials: "same-origin",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              //"X-CSRFToken": getCookie("csrftoken"),
          },
          body: JSON.stringify({artistName: artistName, userEmail: userEmail, eventDate: eventDate, eventLocation: eventLocation})
      })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(requestLivestreamSent(response));
            })
            .catch((error) => {
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}
