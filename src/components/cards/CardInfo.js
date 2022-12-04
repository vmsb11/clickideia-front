import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  Col
} from 'reactstrap';

/**
 * Classe que renderiza um card com o total cadastrados de um status
 */
class CardInfo extends Component {

  constructor(props) {

    super(props);
  }

  /**
   * Função que renderiza um card
   * @returns card renderizado
   */
  render() {

    //obtém as informações do card a ser renderizado
    const { xl, sm, color, title, subtitle, icon, urlCard } = this.props;
    
    return (

    /**
     * Renderiza o card utilizando a biblioteca reactstrap
     */
    <React.Fragment>
      <Col sm={sm} xl={xl}>
        <Card color={color}>
          <CardBody>
            <Link to={urlCard}>
              <div className='d-flex flex-wrap'>
                <div className='me-3'>
                  <p className='text-white mb-2'>{title}</p>
                  <h5 className='mb-0 text-white'>{subtitle}</h5>
                </div>
                {
                  (icon) ?
                  <div className='avatar-sm ms-auto'>
                    <div className='avatar-title bg-light rounded-circle text-primary font-size-20'>
                      <i className={icon}></i>
                    </div>
                  </div>
                  : <></>
                }
              </div>
            </Link>
          </CardBody>
        </Card>
      </Col>
      </React.Fragment>
    );
  }
}

/**
 * Valida as propriedades do componente
 */
CardInfo.propTypes = {
  xl: PropTypes.any,
  sm: PropTypes.any,
  color: PropTypes.any,
  title: PropTypes.any,
  subtitle: PropTypes.any,
  urlCard: PropTypes.any,
  icon: PropTypes.any
};

export default CardInfo;