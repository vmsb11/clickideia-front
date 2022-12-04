import { 
  SHOW_CARD_PANEL,
  HIDE_CARD_PANEL,
  SHOW_ERROR_ALERT, 
  HIDE_ERROR_ALERT, 
  SHOW_SUCCESS_ALERT, 
  HIDE_SUCCESS_ALERT, 
  SHOW_LOADING_MODAL, 
  HIDE_LOADING_MODAL 
} from './actionTypes';

const INIT_STATE = {
  cardPanel: {
    activeTab: '',
    title: '',
    status: 'TO-DO',
    showPanel: false,
  },
  alerts: {
    title: '',
    showErrors: false,
    showSuccess: false,
    error: {
      code: 0,
      type: '',
      message: '',
      date: ''
    },
    successMessage: '',
  },
  modals: {
    loading: {
      showModal: false,
      title: '',
      message: '',
    },
  },
};

/**
 * Função que configura o estado da aplicação do módulo de gerenciamento das interfaces sempre que uma action é executada
 * @param {*} state estado atual da aplicação
 * @param {*} action action que foi executada
 * @returns o novo estado da aplicação
 */
const interfaceReducer = (state = INIT_STATE, action) => {

  //nas linhas abaixo o estado da aplicação é atualizado dependendo da action que foi executada
  let modals = null;

  switch (action.type) {
    case SHOW_CARD_PANEL:
      return {
        ...state,
        cardPanel: {
          activeTab: action.payload.tab,
          title: action.payload.title,
          status: action.payload.status,
          showPanel: true,
        },
      };

    case HIDE_CARD_PANEL:
      return {
        ...state,
        cardPanel: {
          activeTab: '',
          showPanel: false,
          status: 'TO-DO',
        },
      };
    case SHOW_ERROR_ALERT:
      return {
        ...state,
        alerts: {
          title: action.payload.title,
          showErrors: true,
          showSuccess: false,
          error: action.payload.errorMessage,
          successMessage: '',
        },
      };

    case HIDE_ERROR_ALERT:
      return {
        ...state,
        alerts: {
          title: '',
          showErrors: false,
          showSuccess: false,
          error: {
            code: 0,
            type: '',
            message: '',
            date: ''
          },
          successMessage: '',
        },
      };

    case SHOW_SUCCESS_ALERT:
      return {
        ...state,
        alerts: {
          title: action.payload.title,
          showErrors: false,
          showSuccess: true,
          error: {
            code: 0,
            type: '',
            message: '',
            date: ''
          },
          successMessage: action.payload.successMessage,
        },
      };

    case HIDE_SUCCESS_ALERT:
      return {
        ...state,
        alerts: {
          title: '',
          showErrors: false,
          showSuccess: false,
          error: {
            code: 0,
            type: '',
            message: '',
            date: ''
          },
          successMessage: '',
        },
      };

    case SHOW_LOADING_MODAL:
      modals = {
        ...state.modals,
        loading: {
          showModal: true,
          title: action.payload.title,
          message: action.payload.message,
        },
      };

      return {
        ...state,
        modals,
      };

    case HIDE_LOADING_MODAL:
      modals = {
        ...state.modals,
        loading: {
          showModal: false,
          title: '',
          message: '',
        },
      };

      return {
        ...state,
        modals,
      };

    default:
      return state;
  }
};

export default interfaceReducer;
