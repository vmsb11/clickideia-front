import React, { Component } from "react";
import {
  Container,
  Row,
  Col
} from "reactstrap";
import CardsMetrics from "pages/cards/CardsMetrics";
import CardsManagement from "pages/cards/CardsManagement";

/**
 * Classe responsável por renderizar todo o painel kanban
 */
class KanbanPanel extends Component {

  constructor(props) {
    super(props);
  }

  /**
   * Método que renderiza o painel
   * @returns painel renderizad
   */
  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Row>
              <Col xl="12">
                <Row>
                  {/** renderiza o componente que exibe a quantidade de cards criados */}
                  <CardsMetrics/>  
                </Row>
              </Col>
            </Row>
            <Row>
              <Col xl="12">
                {/** renderiza o componente que exibe os quadros criados pra cada tipo */}
                <CardsManagement/>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default KanbanPanel;
