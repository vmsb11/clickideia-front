import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DeleteModal from 'components/modals/DeleteModal';
import { 
  selectCard, 
  showCardPanel,
  updateCard,
  deleteCard
} from '../../store/actions';

/**
 * Função que renderiza um quadro com opções de gerenciamento de um card
 */
class CardOptions extends Component {

  constructor(props) {

    super(props);

    this.state = {
      showDeleteModal: false
    };

    //faz o "bind" das funções
    this.editCard = this.editCard.bind(this);
    this.moveCard = this.moveCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
  }

  /**
   * Função que exibe/oculta o modal de confirmação de exclusão de card
   */
  toggleDeleteModal() {
    this.setState({showDeleteModal: !this.state.showDeleteModal});
  }

  /**
   * Função que edita o cadastro de um card
   */
  editCard() {
    //obtém as informações do card
    const { card, selectCard, showCardPanel } = this.props;

    selectCard(card);
    //exibe o formulário de edição
    showCardPanel('CARD_DETAIL', `EDITAR CARD ${card.title}`);
  };

  /**
   * Função que move um card para outra lista no painel
   * @param {*} moveType tipo de movimento (para esquerda ou direita)
   */
  moveCard(moveType) {
    //obtém as informações do card
    const { card, updateCard, loginStore } = this.props;
    const { token } = loginStore;
    let status = card.status;
    
    //verifica o tipo de movimento e atualiza o status do card
    switch(moveType) {

      case 'previous':

        if(status == 'DONE') {
          
          status = 'DOING';
        }
        else {
          
          status = 'TO-DO';
        }
      break;
      case 'next':

        if(status == 'TO-DO') {
          
          status = 'DOING';
        }
        else {
          
          status = 'DONE';
        }
      break;
    }

    card.status = status;
    //invoca a action que move o card
    updateCard(card, token);
  };

  /**
   * Função que deleta o cadastro do card
   */
  deleteCard() {

    //obtém as informações do card
    const { card, deleteCard, loginStore } = this.props;
    const { token } = loginStore;

    //invoca a action que deleta o cadastro do card
    deleteCard(card, token);
  };

  /**
   * Método que faz a renderização do formulário
   * @returns formulário renderizado
   */
  render() {

    //obtém as informações do card
    const { card } = this.props;
    const { showDeleteModal } = this.state;
    
    //renderiza o componente
    return (
      <React.Fragment>
        <div className='text-center'>
          {
            (card.status !== 'TO-DO') ?
            <Link to='#' onClick={() => this.moveCard('previous')} className='text-primary'>
              <i
                style={{
                  color: 'white',
                  fontSize: 32
                }} 
                className='mdi mdi-arrow-left'/>
            </Link>
            : <></>
          }
          <Link to='#' onClick={() => this.editCard()} className='text-primary'>
            <i
              style={{
                color: 'white',
                fontSize: 32
              }} 
              className='mdi mdi-clipboard-edit'/>
          </Link>
          <Link to='#' onClick={() => this.toggleDeleteModal()} className='text-primary'>
            <i
              style={{
                color: 'white',
                fontSize: 32
              }} 
              className='mdi mdi-delete'/>
          </Link>
          {
            (card.status !== 'DONE') ?
            <Link to='#' onClick={() => this.moveCard('next')} className='text-primary'>
              <i
                style={{
                  color: 'white',
                  fontSize: 32
                }} 
                className='mdi mdi-arrow-right'/>
            </Link>
            : <></>
          }
        </div>
        <DeleteModal 
          isOpen={showDeleteModal}
          toggle={this.toggleDeleteModal}
          question={`Deseja remover o card selecionado ?`}
          onDeleteClick={this.deleteCard}/>
      </React.Fragment>
    )
  }
}

/**
 * Valida as propriedades do componente
 */
CardOptions.propTypes = {
  cardStore: PropTypes.any,
  loginStore: PropTypes.any,
  card: PropTypes.any,
  selectCard: PropTypes.func,
  showCardPanel: PropTypes.func,
  updateCard: PropTypes.func,
  deleteCard: PropTypes.func,
  history: PropTypes.any
};

/**
 * Mapeia o estado da aplicação controlado pelo redux com o componente
 * @param {*} state estado da aplicação
 * @returns o estado da aplicação
 */
const mapStateToProps = (state) => ({
  cardStore: state.cardStore,
  loginStore: state.loginStore
});

/**
 * Mapeia com o componente as actions necessárias para o cadastro e alteração
 */
const mapDispatchToProps = {
  selectCard,
  showCardPanel,
  updateCard,
  deleteCard
};

//conect o componente com o redux
export default connect(mapStateToProps, mapDispatchToProps)(CardOptions);