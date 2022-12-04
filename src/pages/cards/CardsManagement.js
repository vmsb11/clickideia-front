import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { 
  Card, 
  CardBody, 
  CardTitle, 
  Row
} from "reactstrap";
import CardList from "components/cards/CardList";
import { searchCards } from '../../store/actions';

/**
 * Classe responsável por implementar o componente de gerenciamento de cards
 */
class CardsManagement extends Component {

  constructor(props) {
    super(props);
  }

  /**
   * Método invocado quando o componente é montado
   */
  componentDidMount() {

    //obtém as informações do usuário logado
    const { searchCards, loginStore } = this.props;
    const { user } = loginStore;
    const { userId } = user;
    const { token } = loginStore;

    //invoca a action que busca os cards na base de dados
    searchCards(userId, token);
  }

  /**
   * Método que renderiza o componente
   * @returns componente renderizado
   */
  render() {

    //obtém os cards encontrados na busca
    const { cardStore } = this.props;
    const { toDoCards, doingCards, doneCards } = cardStore;
    
    //renderiza o componente
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <CardTitle className="mb-4 h4">PAINEL - KANBAN</CardTitle>
            <Row>
              {/** renderiza as listas dos cards encontrados de cada tipo */}
              <CardList
                xl={4} 
                sm={6}
                backgroundColor={"danger"}
                title={"TO-DO"}
                cards={toDoCards}
                status={"TO-DO"}
                icon={'mdi mdi-pencil me-3'}/>
              <CardList
                xl={4} 
                sm={6}
                backgroundColor={"warning"}
                title={"DOING"}
                cards={doingCards}
                status={"DOING"}
                icon={'mdi mdi-clock-time-five me-3'}/>
              <CardList
                xl={4} 
                sm={6}
                backgroundColor={"success"}
                title={"DONE"}
                cards={doneCards}
                status={"DONE"}
                icon={'mdi mdi-check-all me-3'}/>
            </Row>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

/**
 * Valida as propriedades do componente
 */
CardsManagement.propTypes = {
  cardStore: PropTypes.any,
  loginStore: PropTypes.any,
  searchCards: PropTypes.func,
  toDoCards: PropTypes.any,
  doingCards: PropTypes.any,
  doneCards: PropTypes.any
};

/**
 * Mapeia o estado dos cards da aplicação controlado pelo redux com a página
 * @param {*} state estado dos cards
 * @returns o estado dos cards
 */
const mapStateToProps = (state) => ({
  cardStore: state.cardStore,
  loginStore: state.loginStore
});

/**
 * Mapeia com a página as actions necessárias para o componente
 */
const mapDispatchToProps = {
  searchCards
};

//conect o componente com o redux
export default connect(mapStateToProps, mapDispatchToProps)(CardsManagement);
