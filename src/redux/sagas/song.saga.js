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

function* songSaga() {
  yield takeLatest('ADD_SONG', addSong);
  yield takeLatest('FETCH_SONGS', fetchSongs);

}

export default songSaga;