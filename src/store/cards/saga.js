/**
 * Arquivo onde estão implementadas as funções através do redux-saga que executam funções assíncronas como as requisições a API
 */
import { put, takeEvery } from 'redux-saga/effects';
import { post, get, put as put2, del, getRequestErrorMessage } from '../../helpers/api_helper';
import { 
  ADD_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  GET_CARDS_METRICS, 
  SEARCH_CARDS 
} from './actionTypes';
import {
  getCardsMetrics,
  getCardsMetricsSuccess,
  getCardsMetricsFail,
  searchCards,
  searchCardsSuccess,
  searchCardsFail,
  hideCardPanel,
  selectCard,
  addCardSuccess,
  addCardFail,
  updateCardSuccess,
  updateCardFail,
  deleteCardSuccess,
  deleteCardFail,
  showErrorAlert,
  showSuccessAlert,
  showLoadingModal,
  hideLoadingModal
} from '../actions';

/**
 * Função que busca os cards de um usuário na base de dados
 * @param {*} payload informações da busca
 */
function* fetchCardsByParameter({ payload: { userId, token } }) {
  yield put(showLoadingModal('Click Ideia - Kanban', 'Aguarde...'));

  //realiza a requisição a API
  const { response, error } = yield get(`/cards`, {
    params: {
      userId
    },
    headers: { Authorization: `Bearer ${token}` }
  });
  
  //se recebeu uma resposta válida
  if (response) {

    //invoca a action que grava os cards buscados no estado da aplicação
    yield put(searchCardsSuccess(response.data));
  }
  //em caso de erro 
  else {
    //exibe a mensagem de erro ao usuário
    const errorMessage = getRequestErrorMessage(error);

    yield put(searchCardsFail());
    yield put(showErrorAlert(errorMessage, 'Cards'));
  }

  yield put(hideLoadingModal());
}

/**
 * Função que busca as informações do total de cards de um usuário na base de dados
 * @param {*} payload informações da busca
 */
function* fetchCardsMetrics({ payload: { userId, token } }) {
  
  yield put(showLoadingModal('Click Ideia - Kanban', 'Aguarde...'));

  //realiza a requisição a API
  const { response, error } = yield get(`/cards/tasks/count`, {
    params: {
      userId
    },
    headers: { Authorization: `Bearer ${token}` }
  });

  //se obteve uma resposta válida
  if (response) {

    //invoca a action que grava as informações do total de cards buscados no estado da aplicação
    yield put(getCardsMetricsSuccess(response.data));
  }
  //em caso de erro 
  else {
    //exibe a mensagem de erro ao usuário
    const errorMessage = getRequestErrorMessage(error);

    yield put(getCardsMetricsFail());
    yield put(showErrorAlert(errorMessage, 'Cards'));
  }

  yield put(hideLoadingModal());
}

/**
 * Função que cadastra um novo card
 * @param {*} payload informações do card a ser cadastrado
 */
function* onAddNewCard({ payload: { card, token } }) {
  
  yield put(showLoadingModal('Click Ideia - Kanban', 'Aguarde...'));

  //realiza a requisição a API
  const { response, error } = yield post(`/cards`, card, { headers: { Authorization: `Bearer ${token}` }});
  
  //se obteve uma resposta válida
  if (response) {

    const { userId } = response.data;
    //sinaliza que o cadastro foi realizado
    yield put(showSuccessAlert('Card cadastrado com sucesso', 'Cards'));
    yield put(addCardSuccess(response.data));
    yield put(selectCard(null));
    //busca novamente os cards na base de dados
    yield put(searchCards(userId, token));
    yield put(getCardsMetrics(userId, token));
    yield put(hideCardPanel());
  } 
  //em caso de erro
  else {
    //exibe a mensagem de erro ao usuário
    const errorMessage = getRequestErrorMessage(error);
    yield put(addCardFail());
    yield put(showErrorAlert(errorMessage, 'Cards'));
  }

  yield put(hideLoadingModal());
}

/**
 * Função que altera o cadastro do card
 * @param {*} payload informações do card a ser alterado
 */
function* onUpdateCard({ payload: { card, token } }) {
  
  yield put(showLoadingModal('Click Ideia - Kanban', 'Aguarde...'));

  const { cardId, userId } = card;
  //realiza a requisição a API
  const { response, error } = yield put2(`/cards/${cardId}`, card, { headers: { Authorization: `Bearer ${token}` }});
  
  //se obteve uma resposta válida
  if (response) {

    //sinaliza que o cadastro foi alterado
    yield put(updateCardSuccess(response.data));
    yield put(selectCard(null));
    //busca novamente os cards na base de dados
    yield put(searchCards(userId, token));
    yield put(getCardsMetrics(userId, token));
    yield put(hideCardPanel());
  } 
  //em caso de erro
  else {
    //exibe a mensagem de erro ao usuário
    const errorMessage = getRequestErrorMessage(error);
    yield put(updateCardFail());
    yield put(showErrorAlert(errorMessage, 'Cards'));
  }

  yield put(hideLoadingModal());
}

/**
 * Função que remove o cadastro do card
 * @param {*} payload informações do card a ser removido
 */
function* onDeleteCard({ payload: { card, token } }) {
  
  yield put(showLoadingModal('Click Ideia - Kanban', 'Aguarde...'));

  const { cardId, userId } = card;
  //realiza a requisição a API
  const { response, error } = yield del(`/cards/${cardId}`, { headers: { Authorization: `Bearer ${token}` } });
  
  //se obteve uma resposta válida
  if (response) {
  
    //sinaliza que o cadastro foi removido com sucesso
    yield put(showSuccessAlert('Card removido com sucesso', 'Cards'));
    yield put(deleteCardSuccess(response.data));
    //busca novamente os cards na base de dados
    yield put(searchCards(userId, token));
    yield put(getCardsMetrics(userId, token));
  } 
  //em caso de erro
  else {
    //exibe a mensagem de erro ao usuário
    const errorMessage = getRequestErrorMessage(error);
    yield put(deleteCardFail());
    yield put(showErrorAlert(errorMessage, 'Cards'));
  }

  yield put(hideLoadingModal());
}

/**
 * Função que configura o redux-saga associando para cada action criada a função responsável por executar de forma assíncrona
 */
function* cardSaga() {
  yield takeEvery(SEARCH_CARDS, fetchCardsByParameter);
  yield takeEvery(GET_CARDS_METRICS, fetchCardsMetrics);
  yield takeEvery(ADD_CARD, onAddNewCard);
  yield takeEvery(UPDATE_CARD, onUpdateCard);
  yield takeEvery(DELETE_CARD, onDeleteCard);
}

export default cardSaga;
