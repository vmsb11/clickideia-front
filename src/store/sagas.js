import { all, fork } from 'redux-saga/effects';

import AuthSaga from './auth/login/saga';
import LayoutSaga from './layout/saga';
import cardSaga from './cards/saga';

/**
 * Método que combina todos os "sagas" criados
 * O redux-saga permite executar ações assíncronas (ex: chamada a uma requisição HTTP)
 */
export default function* rootSaga() {
  yield all([
    fork(AuthSaga),
    fork(LayoutSaga),
    fork(cardSaga),
  ]);
}