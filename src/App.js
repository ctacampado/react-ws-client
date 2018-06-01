import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      client_address:'test',
      wss: WebSocket,
      wsstate:'closed',
      wsdata: ''
    };

    this.updateSocketState = this.updateSocketState.bind(this);
  }

  updateSocketState(state){
    this.setState((state) => (state.wsstate = state))
  }

  componentDidMount(){
    var ws = new WebSocket('ws://localhost:6001')
    this.setState((state) => (state.wss = ws))
    ws.onopen = evt => {
      this.setState((state) => (state.wsstate = evt.type))
    }
    ws.onclose = evt => {
      this.setState((state) => (state.wsstate = evt.type))
    }

    ws.onmessage = evt => {
      this.setState((state) => (state.wsdata = evt.data))
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React, {this.state.wsdata}!</h1>
          <h2 className="App-title">curent state is {this.state.wsstate}!</h2>
        </header>
      </div>
    );
  }
}

export default App;
