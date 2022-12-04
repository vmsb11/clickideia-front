import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import CardInfo from "../../components/cards/CardInfo";
import {
  getCardsMetrics
} from '../../store/actions';

/**
 * Classe que renderiza um componente que exibe a quantidade de quadros criados pra cada tipo
 */
class CardsMetrics extends Component {

  constructor(props) {

    super(props);
  }

  /**
   * Método invocado quando o componente é montado
   */
  componentDidMount() {

    //obtém as informações sobre o usuário logado e o token de autenticação
    const { getCardsMetrics, loginStore } = this.props;
    const { user } = loginStore;
    const { userId } = user;
    const { token } = loginStore;

    //invoca a action que retorna a quantidade de cards criados
    getCardsMetrics(userId, token);
  }

  /**
   * Método que faz a renderização das informações dos cards
   * @returns 
   */
  renderCardsMetrics() {

    //obtém as informações sobre a quantidade de cards criados
    const { metrics } = this.props.cardStore;
    //monta um vetor com as informações sobre o total de cards criados pra cada tipo
    const metricsData = [
      { 
        title: "Cards", 
        iconClass: "bx bx-list-ul",
        color: "primary",
        description: `${metrics[3]}`
      },
      {
        title: "To-Do",
        color: "danger",
        iconClass: "bx bx-list-ul",
        description: `${metrics[0]}`
      },
      {
        title: "Doing",
        color: "warning",
        iconClass: "bx bx-list-ul",
        description: `${metrics[2]}`
      },
      {
        title: "Done",
        color: "success",
        iconClass: "bx bx-list-ul",
        description: `${metrics[1]}`
      }
    ]

    //pra cada tipo de card, renderiza o componente que exibe as informações sobre o total criado de cada tipo
    return metricsData.map((metric, index) => (
      <CardInfo 
        key={index} 
        xl={3} 
        sm={6} 
        color={metric.color} 
        title={metric.title} 
        subtitle={metric.description} 
        icon={`bx ${metric.iconClass}`} 
        urlCard="#"/>
    ));
  }

  /**
   * Método que renderiza o componente 
   * @returns componente renderizado
   */
  render() {
    return (
      <React.Fragment>
        {this.renderCardsMetrics()}  
      </React.Fragment>
    );
  }
}

/**
 * Valida as propriedades do componente
 */
CardsMetrics.propTypes = {
  getCardsMetrics: PropTypes.func,
  cardStore: PropTypes.any,
  loginStore: PropTypes.any
}

/**
 * Mapeia o estado dos cards e o usuário logado da aplicação controlado pelo redux com o componente
 * @param {*} state estado dos cards da aplicação
 * @returns o estado dos cards da aplicação
 */
const mapStateToProps = (state) => ({
  cardStore: state.cardStore,
  loginStore: state.loginStore
});

/**
 * Mapeia com a página as actions necessárias para o componente
 */
const mapDispatchToProps = {
  getCardsMetrics
}

//conecta o componente com o redux
export default connect(mapStateToProps, mapDispatchToProps)(CardsMetrics);
