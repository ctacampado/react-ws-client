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

		/*
		type CampaignInfo struct {
  		CID            string     `json:"CID, omitempty"`
  		COID           string     `json:"COID"`
  		CampaignName   string     `json:"CampaignName"`
  		Description    string     `json:"Description"`
  		CampStartDate  time.Time  `json:"CampStartDate"`
  		CampEndDate    time.Time  `json:"CampEndDate"`
  		CampCompDate   time.Time  `json:"CampCompDate, omitempty"`
  		Status         CampStatus `json:"Status"`
  		CampaignAmount float64    `json:"CampaignAmount"`
  		DonatedAmount  float64    `json:"DonatedAmount, omitempty"`
  		TransAmount    float64    `json:"TransAmount, omitempty"`
		}
		*/

    ws.onopen = evt => {
      this.setState((state) => (state.wsstate = evt.type))
			
			var addparms = JSON.stringify({
			  COID: "789redcrossph789",
				CampaignName: "XB Concert: A Fund-raising Event",
				Description: "Funds raised will be used for new facilities",
				CampStartDate: "2018-06-20T18:55:05Z08:00",
				CampEndDate: "2018-09-20T18:55:05Z08:00",
				Status: 1,
				CampaignAmount: 1000000
			})

			var queryparms = JSON.stringify({
			    COID: "789redcrossph789",
					Status: 1
			})

      var msg = JSON.stringify({
				//type: "addCampaign",
				AID: "789redcrossph789",
				Type: "getCOCampaigns",
        //params:addparms
				parms: queryparms
      })
      ws.send(msg)
    }

    ws.onclose = evt => {
      this.setState((state) => (state.wsstate = evt.type))
    }
    
    ws.onmessage = evt => {
      this.setState((state) => (state.wsdata = JSON.stringify(evt.data)))
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-data">{this.state.wsdata}!</h1>
          <h2 className="App-state">curent state is {this.state.wsstate}!</h2>
        </header>
      </div>
    );
  }
}




export default App;
