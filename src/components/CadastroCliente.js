import React from 'react';

import * as services from '../services/clienteServices';

class CadastroCliente extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            nome: '', errors_nome: [],
            email: '', errors_email: [],
            mensagem: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNome = this.handleNome.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleNome(e) {
        this.setState({ nome: e.target.value });
    };

    handleEmail(e) {
        this.setState({ email: e.target.value });
    };

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ mensagem: 'Processando requisição...' });

        services.post({
            nome: this.state.nome,
            email: this.state.email
        })
            .then(data => {
                this.setState(
                    {
                        mensagem: data.mensagem,
                        nome: '',
                        errors_nome: [],
                        email: '',
                        errors_email: []
                    });
            })
            .catch(error => {

                var e = error.response;

                switch (e.status) {
                    case 400:
                        this.setState({
                            mensagem: '',
                            errors_nome: e.data.Nome || [],
                            errors_email: e.data.Email || []
                        })
                        break;
                    default:
                        console.log(e)
                        break;
                }
            });
    }

    handleReset(e) {
        this.setState({
            mensagem: '',
            nome: '',
            errors_nome: [],
            email: '',
            errors_email: []
        })
    }

    render() {
        return (
            <div>
                <h4>Cadastro de Clientes</h4>
                <p>Preencha os campos do formulário:</p>

                <div className="row">
                    <div className="col-md-4">
                        <form method="post" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Nome do Cliente:</label>
                                <input type="text" className="form-control"
                                    placeholder="Nome do Cliente"
                                    autoComplete="off"
                                    onChange={this.handleNome}
                                    value={this.state.nome} />
                                <ul className="text-danger">
                                    {
                                        this.state.errors_nome.map(
                                            function (item, i) {
                                                return (
                                                    <li key={i}>{item}</li>
                                                )
                                            }
                                        )
                                    }
                                </ul>
                            </div>

                            <div className="form-group">
                                <label>Email do Cliente:</label>
                                <input type="text" className="form-control"
                                    placeholder="Email do Cliente"
                                    autoComplete="off"
                                    onChange={this.handleEmail}
                                    value={this.state.email} />
                                <ul className="text-danger">
                                    {
                                        this.state.errors_email.map(
                                            function (item, i) {
                                                return (
                                                    <li key={i}>{item}</li>
                                                )
                                            }
                                        )
                                    }
                                </ul>
                            </div>

                            <div className="form-group">
                                <input type="submit" value="Cadastrar Cliente" className="btn btn-success btn-sm mr-1" />
                                <input type="button" value="Limpar"
                                    className="btn btn-secondary btn-sm"
                                    onClick={this.handleReset} />
                            </div>

                            <div className="form-group">
                                <span>
                                    <strong>{this.state.mensagem}</strong>
                                </span>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

export default CadastroCliente;