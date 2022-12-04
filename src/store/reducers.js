import { combineReducers } from 'redux';
import Layout from './layout/reducer';
import loginStore from './auth/login/reducer';
import interfaceStore from './interfaces/reducer';
import cardStore from './cards/reducer';

/**
 * Método que combina todos os reducers utilizados na aplicação gerando um reducer "raiz"
 */
const rootReducer = combineReducers({
  Layout,
  loginStore,
  interfaceStore,
  cardStore,
});

//exporta o reducer combinado
export default rootReducer;
