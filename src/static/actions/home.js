import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { HOME_LIVESTREAM_FETCHED, REQUEST_LIVESTREAWM, HOME_VIDEOS_FETCHED } from '../constants';


export function homeVideosFetched(data) {
    return {
        type: HOME_VIDEOS_FETCHED,
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


export function requestLivestreamSent(data) {
    return {
        type: REQUEST_LIVESTREAWM,
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
