import React, { Component } from 'react';
import './App.css';
import Moment from 'moment'

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
    this.recuperaListagemPessoas();
    this.controleTempo();
    this.dataHoje();
  }

  dataHoje() {
    this.setState({
      dataHoje: new Date().toLocaleDateString()
    })
  }

  recuperaListagemPessoas() {
    const listagemPessoasGodQueVaoTrazerBoloPogChamp = [
      'Renan Verissimo',
      'Phills Bad man',
      'Eric KappaPride',
      'Leo Pederasta',
      'Nogueira 4Head',
      'Vitin BacknoKibe'
    ];

    this.setState({
      pessoasDisponiveis: listagemPessoasGodQueVaoTrazerBoloPogChamp
    })
  }

  controleTempo() {
    var aguardaHorario = setInterval(() =>{
      if (Moment(new Date()).hour() === 8) {
        clearInterval(aguardaHorario);

        setInterval(() => {
          this.escolhePessoa(this.state.pessoasDisponiveis);
          this.dataHoje();
        }, 24*60*60*1000)
      }

      this.escolhePessoa(this.state.pessoasDisponiveis);
      this.dataHoje();
    }, 3000)
  }

  escolhePessoa(pessoasDisponiveis) {
    if (pessoasDisponiveis.length !== 0) {
      let index = Math.floor(Math.random() * pessoasDisponiveis.length);
      let _pessoasDisponiveisTemp = pessoasDisponiveis;
      let escolhida = _pessoasDisponiveisTemp.splice(index, 1);

      this.setState({
        pessoaEscolhida: escolhida,
        pessoasDisponiveis: _pessoasDisponiveisTemp
      })
    } else {
      this.recuperaListagemPessoas();
      this.escolhePessoa(this.state.pessoasDisponiveis);
    }
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
