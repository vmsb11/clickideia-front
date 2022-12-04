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

const INIT_STATE = {
  toDoCards: [],
  doingCards: [],
  doneCards: [],
  metrics: [0, 0, 0, 0],
  selectedCard: null
};

/**
 * Função que configura o estado da aplicação do módulo de gerenciamento de cards sempre que uma action é executada
 * @param {*} state estado atual da aplicação
 * @param {*} action action que foi executada
 * @returns o novo estado da aplicação
 */
const cardReducer = (state = INIT_STATE, action) => {

  //nas linhas abaixo o estado da aplicação é atualizado dependendo da action que foi executada
  switch (action.type) {
    case GET_CARDS_METRICS:
      return {
        ...state,
        metrics: [0, 0, 0, 0]
      };

    case GET_CARDS_METRICS_SUCCESS:
      return {
        ...state,
        metrics: action.payload
      };

    case GET_CARDS_METRICS_FAIL:
      return {
        ...state,
        metrics: [0, 0, 0, 0]
      };

    case SEARCH_CARDS:
      return {
        ...state,
        toDoCards: [],
        doingCards: [],
        doneCards: [],
      };

    case SEARCH_CARDS_SUCCESS:
      return {
        ...state,
        toDoCards: action.payload.toDoCards,
        doingCards: action.payload.doingCards,
        doneCards: action.payload.doneCards,
      };

    case SEARCH_CARDS_FAIL:
      return {
        ...state,
        toDoCards: [],
        doingCards: [],
        doneCards: [],
      };

    case ADD_CARD:
      return {
        ...state,
        selectedCard: null
      };

    case ADD_CARD_SUCCESS:
      return {
        ...state,
        selectedCard: action.payload,
      };

    case ADD_CARD_FAIL:
      return {
        ...state,
        selectedCard: null
      };

    case UPDATE_CARD:
      return {
        ...state
      };

    case UPDATE_CARD_SUCCESS:
      return {
        ...state,
        selectedCard: action.payload,
      };

    case UPDATE_CARD_FAIL:
      return {
        ...state,
      };
    
    case DELETE_CARD:
      return {
        ...state
      };

    case DELETE_CARD_SUCCESS:
      return {
        ...state,
        selectedCard: action.payload,
      };

    case DELETE_CARD_FAIL:
      return {
        ...state,
      };

    case SELECT_CARD:
      return {
        ...state,
        selectedCard: action.payload
      };

    default:
      return state;
  }
};

export default cardReducer;
