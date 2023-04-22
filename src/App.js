import React, { Component } from 'react'
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"; // npm i react-router-dom@5
import Newscomponent from "./components/Newscomponent";
import LoadingBar from "react-top-loading-bar"; // npm i react-top-loading-bar

export class App extends Component {

  state = {
    progress: 10,
    mode:'light'
  }
  setProgress = (progress) => {
    this.setState({ progress: progress })
  }

  toggleMode=()=>{
    if(this.state.mode==='light'){
      this.setState({mode:'dark'});
      document.body.style.backgroundColor='#141619';
    }
    else{
      this.setState({mode:'light'});
      document.body.style.backgroundColor='white';
    }
  }
  render() {
    return (
      <>
        <Router>
          <Navbar toggleMode={this.toggleMode} mode={this.state.mode}/>
          {/* <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          /> */}
          <Switch>
            <Route exact path="/"><Newscomponent setProgress={this.setProgress} mode={this.state.mode} key="general" category={"general"} /></Route>
            <Route exact path="/business"><Newscomponent setProgress={this.setProgress} mode={this.state.mode} key="business" category={"business"} /></Route>
            <Route exact path="/entertainment"><Newscomponent setProgress={this.setProgress} mode={this.state.mode} key="entertainment" category={"entertainment"} /></Route>
            <Route exact path="/general"><Newscomponent setProgress={this.setProgress} mode={this.state.mode} key="general" category={"general"} /></Route>
            <Route exact path="/health"><Newscomponent setProgress={this.setProgress} mode={this.state.mode} key="health" category={"health"} /></Route>
            <Route exact path="/science"><Newscomponent setProgress={this.setProgress} mode={this.state.mode} key="science" category={"science"} /></Route>
            <Route exact path="/sports"><Newscomponent setProgress={this.setProgress} mode={this.state.mode} key="sports" category={"sports"} /></Route>
            <Route exact path="/technology"><Newscomponent setProgress={this.setProgress} mode={this.state.mode} key="technology" category={"technology"} /></Route>
          </Switch>
        </Router>
      </>
    )
  }
}

export default App
