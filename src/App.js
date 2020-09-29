import React from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';

import CadastroCliente from './components/CadastroCliente';
import ConsultaCliente from './components/ConsultaCliente';

class App extends React.Component {


  render() {
    return (
      <HashRouter>
        <div className="container mt-2">
          <h3>Projeto React COTI Informática</h3>
          <ul>
            <li><NavLink to="/cadastro-cliente">Cadastrar Clientes</NavLink></li>
            <li><NavLink to="/consulta-cliente">Consultar Clientes</NavLink></li>
          </ul>
          <hr />

          <Route path="/cadastro-cliente" component={CadastroCliente} />
          <Route path="/consulta-cliente" component={ConsultaCliente} />

        </div>
      </HashRouter>
    )
  }
}

export default App;