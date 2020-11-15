import { call, put, take, fork, select } from 'redux-saga/effects';

import * as actions from '../redux/actions.js';

function* HIDE_SIGN_UP() {
  while(true) {
    let { payload } = yield take(actions.HIDE_SIGN_UP);
    let state;
    
    yield put(actions.logTaskStarted(""));
    
    try {
      yield put(actions.setField('show_sign_up', false));
      
    } catch(error) {
            
    }
    
    yield put(actions.logTaskDone(""));
    
  }
}
function* SHOW_APP() {
  while(true) {
    let { payload } = yield take(actions.SHOW_APP);
    let state;
    
    yield put(actions.logTaskStarted(""));
    
    try {
      yield put(actions.setField('show_app', true));
      
    } catch(error) {
            
    }
    
    yield put(actions.logTaskDone(""));
    
  }
}
function* SHOW_SIGN_UP() {
  while(true) {
    let { payload } = yield take(actions.SHOW_SIGN_UP);
    let state;
    
    yield put(actions.logTaskStarted(""));
    
    try {
      yield put(actions.setField('show_sign_up', true));
      
    } catch(error) {
            
    }
    
    yield put(actions.logTaskDone(""));
    
  }
}

export default function* saga() {
  yield fork(HIDE_SIGN_UP);
  yield fork(SHOW_APP);
  yield fork(SHOW_SIGN_UP);
}