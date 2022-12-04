/**
 * Arquivo responsável por implementar as actions do reducer
 */
import {
  ADD_CARD,
  ADD_CARD_SUCCESS,
  ADD_CARD_FAIL,
  UPDATE_CARD,
  UPDATE_CARD_SUCCESS,
  UPDATE_CARD_FAIL,
  DELETE_CARD,
  DELETE_CARD_SUCCESS,
  DELETE_CARD_FAIL,
  GET_CARDS_METRICS,
  GET_CARDS_METRICS_SUCCESS,
  GET_CARDS_METRICS_FAIL,
  SEARCH_CARDS,
  SEARCH_CARDS_FAIL,
  SEARCH_CARDS_SUCCESS,
  SELECT_CARD
} from './actionTypes';

/**
 * Action responsável por buscar os cards na base de dados
 * @param {*} userId id do usuário responsável pelo card
 * @param {*} token token de segurança gerado na autenticação
 */
export const searchCards = (userId, token) => ({
  type: SEARCH_CARDS,
  payload: {
    userId, 
    token
  },
});

/**
 * Action responsável por sinalizar que a busca de cards foi realizada com sucesso
 * @param {*} cards lista de encontradas
 */
export const searchCardsSuccess = (cards) => ({
  type: SEARCH_CARDS_SUCCESS,
  payload: cards,
});

/**
 * Action responsável por sinalizar que a busca de cards não foi realizada com sucesso
 */
export const searchCardsFail = () => ({
  type: SEARCH_CARDS_FAIL
});

/**
 * Action responsável por selecionar um card
 * @param {*} card card a ser selecionado
 */
export const selectCard = (card) => ({
  type: SELECT_CARD,
  payload: card,
});

/**
 * Action responsável por buscar a quantidade de cards criados de cada tipo
 * @param {*} userId id do usuário responsável pelos cards
 * @param {*} token token de segurança gerado na autenticação
 */
export const getCardsMetrics = (userId, token) => ({
  type: GET_CARDS_METRICS,
  payload: { userId, token },
});

/**
 * Action responsável por sinalizar que a busca da quantidade de cards criados foi executada com sucesso
 * @param {*} cardsIndicators informações dos cards encontrados
 */
export const getCardsMetricsSuccess = (cardsIndicators) => ({
  type: GET_CARDS_METRICS_SUCCESS,
  payload: cardsIndicators,
});

/**
 * Action responsável por sinalizar que a busca da quantidade de cards criados não foi executada com sucesso
 * @param {*} card card a ser  cadastrado
 * @param {*} history objeto que controla o histórico de navegação
 */
export const getCardsMetricsFail = () => ({
  type: GET_CARDS_METRICS_FAIL
});

/**
 * Action responsável por criar um novo card
 * @param {*} card card a ser cadastrado
 * @param {*} token token de segurança gerado na autenticação
 */
export const addNewCard = (card, token) => ({
  type: ADD_CARD,
  payload: { card, token },
});

/**
 * Action responsável por sinalizar que o cadastro do card foi realizado
 * @param {*} card card cadastrado
 */
export const addCardSuccess = (card) => ({
  type: ADD_CARD_SUCCESS,
  payload: card,
});

/**
 * Action responsável por sinalizar que o cadastro do card não foi realizado
 */
export const addCardFail = () => ({
  type: ADD_CARD_FAIL
});

/**
 * Action responsável por alterar um card
 * @param {*} card card a ser alterado
 * @param {*} token token de segurança gerado na autenticação
 */
export const updateCard = (card, token) => ({
  type: UPDATE_CARD,
  payload: { card, token },
});

/**
 * Action responsável por sinalizar que o cadastro do card foi alterado
 * @param {*} card card alterado
 */
export const updateCardSuccess = (card) => ({
  type: UPDATE_CARD_SUCCESS,
  payload: card,
});

/**
 * Action responsável por sinalizar que o cadastro do card não foi alterado
 */
export const updateCardFail = () => ({
  type: UPDATE_CARD_FAIL
});

/**
 * Action responsável por deletar um card
 * @param {*} card card a ser deletado
 * @param {*} token token de segurança gerado na autenticação
 */
export const deleteCard = (card, token) => ({
  type: DELETE_CARD,
  payload: { card, token },
});

/**
 * Action responsável por sinalizar que o cadastro do card foi deletado
 * @param {*} card card a ser  cadastrado
 */
export const deleteCardSuccess = (card) => ({
  type: DELETE_CARD_SUCCESS,
  payload: card,
});

/**
 * Action responsável por sinalizar que o cadastro do card não foi deletado
 */
export const deleteCardFail = () => ({
  type: DELETE_CARD_FAIL
});