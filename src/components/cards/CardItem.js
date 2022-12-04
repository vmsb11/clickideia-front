import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
  Card, 
  CardBody, 
  CardTitle,
  CardText
} from 'reactstrap';
import CardOptions from '../options/CardOptions';
import { formatDatetime } from 'helpers/dates_helpers';

/**
 * Classe que renderiza um card do painel kanban com todas as informações do mesmo
 */
class CardItem extends Component {
  
  constructor(props) {
    super(props);
  }

  /**
   * Função que renderiza um card
   * @returns card renderizado
   */
  render() {
    
    //recebe o card a ser renderizado via props
    const { card, backgroundColor, icon } = this.props;
   
    /**
     * Renderiza o card utilizando a biblioteca reactstrap
     */
    return (
      <React.Fragment>
        <Card color={backgroundColor} className="text-white-50">
          <CardBody>
            <CardTitle className="h5 mt-0 mb-4 text-white">
              <i className={icon}></i> {card.title}
            </CardTitle>
            <CardText style={{color: 'white'}}>
              {card.content}
            </CardText>
            <p style={{color: 'white'}} className="card-text">
              <b>Criado em: </b>{formatDatetime(card.createdAt)}
              <br/>
              <b>Atualizado em: </b>{formatDatetime(card.updatedAt)}
            </p>
            <CardOptions card={card}/>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

/**
 * Valida as propriedades do componente
 */
CardItem.propTypes = {
  card: PropTypes.any,
  backgroundColor: PropTypes.any,
  icon: PropTypes.any
};

export default CardItem;