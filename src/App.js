import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <ListaEscolha />
      </div>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <div className="container mt-4">
        <h1 className="display-1 text-center">---------</h1>
      </div>
    )
  }
}

class ListaEscolha extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pessoaEscolhida: "",
      pessoasDisponiveis: "",
      dataHoje: ""
    }
  }

  componentDidMount() {
    this.controleTempo();
    this.dataHoje();
  }

  dataHoje() {
    this.setState({
      dataHoje: new Date().toLocaleDateString()
    })
  }

  recuperaListagemPessoas() {
    fetch('https://queroboli.herokuapp.com/boli-listagem-pessoas-disponiveis', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then((res) => res.json())
    .then((res) => {
      let array = res.pessoas.map((pessoa) => {return pessoa.pessoa})
      this.setState({
        pessoasDisponiveis: array
      })
    })
  }

  recuperaPessoaEscolhida() {
    fetch('https://queroboli.herokuapp.com/boli-pessoa-escolhida', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then((res) => res.json())
    .then((res) => {
      let array = res.pessoa.map((pessoa) => {return pessoa.pessoa})
      this.setState({
        pessoaEscolhida: array
      })
    })
  }

  controleTempo() {
    this.recuperaListagemPessoas();
    this.recuperaPessoaEscolhida();

    setInterval(() => {
      this.recuperaListagemPessoas();
      this.recuperaPessoaEscolhida();
    }, 1000)
  }

  render() {
    return (
      <div className="container mt-4 text-center">
        <div>
          <p>Escolhido do dia <span className="azul-pogchamp">{this.state.dataHoje}</span></p>
          <h2 className="azul-main">{this.state.pessoaEscolhida}</h2>
        </div>
        <div className="mt-4">
          <p className="azul-pogchamp">Ainda não compraram nessa rodada:</p>
          <div>
            <CriaListagemAindaNaoCompraram4Head listagemPessoasDisponiveis={this.state.pessoasDisponiveis} />
          </div>
        </div>
      </div>
    )
  }
}

class CriaListagemAindaNaoCompraram4Head extends Component {
  ajustaListagemElementos() {
    let index = 0;
    if (!!this.props.listagemPessoasDisponiveis) {
      const pessoasDisponiveis = this.props.listagemPessoasDisponiveis.map((pessoa) =>
        <h5 key={index++}>{pessoa}</h5>
      );
      return pessoasDisponiveis;
    }
  }

  render() {
    return (
      <div>
        <div>{this.ajustaListagemElementos()}</div>
      </div>
    )
  }
}

export default App;
