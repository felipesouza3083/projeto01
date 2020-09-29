import React from 'react';

import * as services from '../services/clienteServices';
import * as formatters from '../shared/formatters';

class ConsultaCliente extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            idCliente: 0,
            nome: '', erros_nome: [],
            email: '', erros_email: [],
            mensagem: '',
            lista_clientes: []
        }

        this.consultarClientes = this.consultarClientes.bind(this);
        this.excluirCliente = this.excluirCliente.bind(this);
        this.obterCliente = this.obterCliente.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNome = this.handleNome.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
    }

    componentDidMount() {
        this.consultarClientes();
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

        services.put({
            idCliente: this.state.idCliente,
            nome: this.state.nome,
            email: this.state.email
        })
            .then(data => {
                this.setState(
                    {
                        mensagem: data.mensagem,
                        errors_nome: [],
                        errors_email: []
                    });

                this.consultarClientes();
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

    consultarClientes() {
        services.getAll()
            .then(
                data => {
                    this.setState({
                        lista_clientes: data
                    });
                }
            )
            .catch(
                error => {
                    console.log(error);
                });
    }

    excluirCliente(id) {
        if (window.confirm(alert('Deseja excluir o cliente selecionado?'))) {
            services.remove(id)
                .then(
                    data => {

                        this.consultarClientes();

                        var c = data.cliente;

                        var result = data.mensagem
                            + "\n"
                            + "\nCliente: " + c.nome
                            + "\nEmail: " + c.email
                            + "\nData de Cadastro: " + formatters.date(c.dataCadastro);

                        alert(result);
                    }
                )
                .catch(error => {
                    console.log(error);
                });
        }
    }

    obterCliente(id) {
        this.setState({
            mensagem:'',
            errors_email:[],
            errors_nome:[]
        })
        services.getById(id)
            .then(
                data => {
                    this.setState({
                        idCliente: data.idCliente,
                        nome: data.nome,
                        email: data.email
                    })
                }
            )
            .catch(
                error => {
                    console.log(error);
                }
            )
    }

    render() {
        var self = this;
        return (
            <div>
                <h4>Consulta de Clientes</h4>
                <p>Relação de clientes cadastrados no sistema.</p>

                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive">

                            <table className="table table-bordered table-condensed table-stripped table-hover">
                                <thead>
                                    <tr>
                                        <th>Nome do Cliente</th>
                                        <th>Email do Cliente</th>
                                        <th>Data de Cadastro</th>
                                        <th>Operações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        self.state.lista_clientes.map(
                                            function (item, i) {
                                                return (
                                                    <tr key={i}>
                                                        <td> {item.nome} </td>
                                                        <td> {item.email} </td>
                                                        <td>
                                                            {
                                                                formatters.date(item.dataCadastro)
                                                            }
                                                        </td>
                                                        <td width="18%" className="text-center">
                                                            <button className="btn btn-sm btn-primary mr-1"
                                                                data-target="#modal_edicao"
                                                                data-toggle="modal"
                                                                onClick={() => self.obterCliente(item.idCliente)}>
                                                                Atualizar
                                                            </button>
                                                            <button className="btn btn-sm btn-danger"
                                                                onClick={() => self.excluirCliente(item.idCliente)}
                                                            >
                                                                Excluir
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        )
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="4">
                                            Quantidade de registros:
                                            {self.state.lista_clientes.length}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>

                        </div>
                    </div>
                </div>

                <div id="modal_edicao" className="modal fade">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-primary">
                                <h5 className="modal-title text-white">
                                    Atualizar dados do Cliente
                                </h5>
                                <button type="button" className="close text-white" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form method="post" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label>Nome do Cliente:</label>
                                        <input type="text"
                                            className="form-control"
                                            placeholder="Nome do Cliente"
                                            onChange={self.handleNome}
                                            value={self.state.nome} />
                                        <ul className="text-danger">
                                            {
                                                self.state.erros_nome.map(
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
                                        <input type="text"
                                            className="form-control"
                                            placeholder="Email do Cliente"
                                            onChange={self.handleEmail}
                                            value={self.state.email} />
                                        <ul className="text-danger">
                                            {
                                                self.state.erros_email.map(
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
                                        <input type="submit" value="Salvar Alterações"
                                            className="btn btn-sm btn-success" />
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
                </div>
            </div>
        )
    }
}

export default ConsultaCliente;