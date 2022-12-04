import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Card,
  Button,
  Row,
  CardBody,
  Col
} from 'reactstrap';
import CardItem from './CardItem';
import { showCardPanel, selectCard } from '../../store/actions';

class CardList extends Component {

  constructor(props) {

    super(props);

    this.newCard = this.newCard.bind(this);
  }

  newCard() {
    const { selectCard, showCardPanel, status } = this.props;

    selectCard(null);
    showCardPanel('EDIT_CARD', 'NOVO CARD', status);
  };

  renderCards() {

    const { cards, backgroundColor, icon } = this.props;

    if(cards.length > 0) {

      const cardList = cards.map((card, key) => <CardItem card={card} backgroundColor={backgroundColor} icon={icon} key={key}/>);

      return (
        <Row>
          {cardList}
        </Row>
      );
    }

    return (      
      <Card>
        <CardBody>
          <div className="text-center">
            <h5 className="my-0">Sem cards para exibir</h5>
          </div>
        </CardBody>
      </Card>       
    );

  }

  render() {

    const { xl, sm, icon, title } = this.props;

    return (

    <React.Fragment>
      <Col sm={sm} xl={xl}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}>          
          <i
            style={{
              fontSize: 32
            }} 
            className={icon}/>
          <h5>
            {title}
          </h5>           
        </div>
        {this.renderCards()}
        <div className='text-center'>
          <Button type="button" color="primary" onClick={this.newCard}>
            <i className="bx bx-plus me-1" /> Novo Card
          </Button>
        </div>
      </Col>
    </React.Fragment>
    );
  }
}

/**
 * Valida as propriedades do componente
 */
CardList.propTypes = {
  selectCard: PropTypes.func,
  showCardPanel: PropTypes.func,
  xl: PropTypes.any,
  sm: PropTypes.any,
  backgroundColor: PropTypes.any,
  title: PropTypes.any,
  status: PropTypes.any,
  cards: PropTypes.any,
  icon: PropTypes.any
};

const mapDispatchToProps = {
  showCardPanel,
  selectCard,
};

export default connect(null, mapDispatchToProps)(CardList);