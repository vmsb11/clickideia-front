import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Card,
  CardBody,
  Col,
  Container,
  Row
} from 'reactstrap'
import CardForm from '../forms/CardForm';

/**
 * Classe que renderiza um componente responsável pelo painel dos cards
 */
class CardPanel extends Component {

  constructor(props) {

    super(props);
  }

  /**
   * Método que renderiza o componente
   * @returns componente renderizado
   */
  render() {

    //obtém as informações do card a ser renderizado
    const { cardStore } = this.props;
    const { selectedCard } = cardStore;
    
    return (
      <React.Fragment>
        <Container fluid={true}>
          <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                  {/** renderiza o formulário de cadastro/edição de um card */}
                  <CardForm
                    mode={(selectedCard !== null) ? 'edit' : 'new'}/>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

/**
 * Valida as propriedades do componente
 */
CardPanel.propTypes = {
  cardStore: PropTypes.any,
  interfaceStore: PropTypes.any
};

/**
 * Mapeia o estado dos cards da aplicação controlado pelo redux com a página
 * @param {*} state estado dos cards
 * @returns o estado dos cards
 */
const mapStateToProps = (state) => {
  return ({
    cardStore: state.cardStore,
    interfaceStore: state.interfaceStore
  });
};

//conect o componente com o redux
export default connect(mapStateToProps)(CardPanel);
