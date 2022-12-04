import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Card,
  CardBody,
  Col,
  Container,
  Row
} from 'reactstrap';
import { Formik, Field, Form } from 'formik';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import { MenuItem } from '@material-ui/core';
import SelectFormik from 'components/inputs/SelectFormik';
import * as Yup from 'yup';
import {
  addNewCard,
	updateCard
} from '../../store/actions';

/**
 * Classe responsável por renderizar o formulário de cadastro de cards
 */
class CardForm extends Component {
  
  constructor(props) {
    
    super(props);

    //faz o "bind" das funções
    this.createCard = this.createCard.bind(this);
		this.editCard = this.editCard.bind(this);
  }

  /**
   * Função que cadastra um card
   * @param {*} values informações do card
   */
  createCard(values) {

    const { loginStore } = this.props;
    const { token } = loginStore;

    //invoca a action que realiza o cadastro
    this.props.addNewCard(values, token);
  }

  /**
   * Função que altera o cadastro de um card
   * @param {*} values informações do card a ser alterado
   */
	editCard(values) {

    const { loginStore } = this.props;
    const { token } = loginStore;

    //invoca a action que realiza a alteração do cadastro
    this.props.updateCard(values, token);
  }

  /**
   * Método que faz a renderização do formulário
   * @returns formulário renderizado
   */
	render() {
    
    //obtém as informações do card e do usuário logado
    const { loginStore, interfaceStore } = this.props;
    const { user } = loginStore;
    const { cardPanel } = interfaceStore;
    const { selectedCard } = this.props.cardStore;
    const { mode } = this.props;
    
    //renderiza o formulário de cadastro
    return (
      <React.Fragment>
        <Container fluid>
          <Row>
            <Col xs='12'>
              <Card>
                <CardBody>
                  <Row className='mb-2'>
                    <Formik
                      enableReinitialize={true}
                      initialValues={{
                        cardId: 
                          (mode === 'edit' && selectedCard && selectedCard.cardId) || '',
                        title:
                          (mode === 'edit' && selectedCard && selectedCard.title) || '',
                        status:
                          (mode === 'edit' && selectedCard && selectedCard.status) || cardPanel.status,
                        content:
                          (mode === 'edit' && selectedCard && selectedCard.content) || '',
                      }}
                      //valida as informações do formulário
                      validationSchema={Yup.object().shape({
                        title: Yup.string().required(
                          'Por favor, informe o título do card'
                        ),
                        content: Yup.string().required(
                          'Por favor, informe o conteúdo do card'
                        ),
                        status: Yup.string().required(
                          'Por favor, informe o status do card'
                        ),
                      })}
                      onSubmit={values => {
                      
                        //ao submeter o formulário verifica o modo do formulário (novo cadastro ou edição e invoca a função correspondente)
                        values.userId = user.userId;

                        if (mode === 'edit') {
                          
                          this.editCard(values);
                        }
                        else {
                          
                          this.createCard(values);
                        }
                      }}>
                      {({ isSubmitting, values, handleChange, errors, touched, setFieldValue }) => (
                        <Form>
                          <Row>
                            <Col lg='12'>
                              <h5>
                                <span>
                                  Informe as informações do card e clique em <b>SALVAR</b> para finalizar a operação
                                </span>
                              </h5>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg='8'>
                              <TextField
                                fullWidth
                                className='mt-2'
                                id="title"
                                name="title"
                                label="Título*"
                                type="text"
                                value={values.title}
                                onChange={handleChange}
                                error={touched.title && Boolean(errors.title)}
                                helperText={touched.title && errors.title}/>
                            </Col>
                            <Col lg='4'>
                              <InputLabel htmlFor="status">Status*</InputLabel>
                              <Field 
                                fullWidth
                                name="status" 
                                component={SelectFormik}>
                                <MenuItem value={"TO-DO"}>TO-DO</MenuItem>
                                <MenuItem value={"DOING"}>DOING</MenuItem>
                                <MenuItem value={"DONE"}>DONE</MenuItem>
                              </Field>  
                            </Col>
                          </Row>
                          <Row>
                            <Col lg='12'>
                              <TextField
                                fullWidth
                                id="content"
                                name="content"
                                label="Conteúdo do card*"
                                type="content"
                                multiline
                                minRows={4}
                                value={values.content}
                                error={touched.content && Boolean(errors.content)}
                                helperText={touched.content && errors.content}
                                onChange={handleChange}/>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className='text-end mt-3'>
                                <button
                                  type='submit'
                                  className='btn btn-primary'>
                                  <i className='bx bx-save' /> Salvar
                                </button>
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      )}
                    </Formik>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

/**
 * Valida as propriedades do componente
 */
CardForm.propTypes = {
  cardStore: PropTypes.any,
  loginStore: PropTypes.any,
  interfaceStore: PropTypes.any,
  mode: PropTypes.any,
  addNewCard: PropTypes.func,
	updateCard: PropTypes.func,
  className: PropTypes.any,
};

/**
 * Mapeia o estado da aplicação controlado pelo redux com o componente
 * @param {*} state estado da aplicação
 * @returns o estado da aplicação
 */
const mapStateToProps = (state) => ({
  cardStore: state.cardStore,
  loginStore: state.loginStore,
  interfaceStore: state.interfaceStore
});

/**
 * Mapeia com o componente as actions necessárias para o cadastro e alteração
 */
const mapDispatchToProps = {
  addNewCard,
	updateCard
};

//conect o componente com o redux
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CardForm));