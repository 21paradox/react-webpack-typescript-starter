import * as React from "react";

const reactLogo = require("./../assets/img/react_logo.svg");
import "./../assets/scss/App.scss";
import InputSearch from "./InputSearch";
import Tab from './Tab'

class App extends React.Component<Record<string, unknown>, undefined> {
  public render() {
    return (
      <div className="app">
        <h1>Hello World!</h1>
        <p>Foo to the barz</p>
        <img src={reactLogo.default} height="480" />


        <InputSearch></InputSearch>
        <Tab></Tab>
      </div>
    );
  }
}

// declare let module: Record<string, unknown>;

export default App;
