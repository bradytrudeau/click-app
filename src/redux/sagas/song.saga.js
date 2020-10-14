import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addSong(action) {
    console.log('addSong Action:', action);

    let response = yield axios({
        method: 'POST',
        url: '/songs',
        data: action.payload
    });
    console.log('GET songs response', response);
    // Send our song data to the reducer
    yield put({
        type: 'FETCH_SONGS',
        payload: response.data
    })
}

function* fetchSongs(action) {
    console.log('fetchSongs Action:', action);
    let response = yield axios({
      method: 'GET',
      url: '/songs'
    });  
    console.log('List of Songs:', response.data);
    yield put({
      type: 'SET_SONGS',
      payload: response.data
    });
  }

function* deleteSong(action) {
    console.log('deleteSong Action:', action);

    let response = yield axios({
        method: 'DELETE',
        url: `/songs/${action.payload}`,
        data: action.payload
    });
    console.log('DELETE songs response', response);
    // Send our song data to the reducer
    yield put({
        type: 'FETCH_SONGS',
        payload: response.data
    });
}

function* editSong(action) {
    console.log('editSong Action:', action);

    let response = yield axios({
        method: 'PUT',
        url: `/songs/${action.payload.id}`,
        data: action.payload
    });
    console.log('PUT songs response', response);
    // Send our song data to the reducer
    yield put({
        type: 'FETCH_SONGS',
        payload: response.data
    });
}

function* songSaga() {
  yield takeLatest('ADD_SONG', addSong);
  yield takeLatest('FETCH_SONGS', fetchSongs);
  yield takeLatest('DELETE_SONG', deleteSong);
  yield takeLatest('EDIT_SONG', editSong);

}

export default songSaga;