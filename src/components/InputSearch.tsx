import * as React from "react";
import Input from './Input'

class InputSearch extends React.Component{
  public render() {
    return (
      <span>
        <Input />
        <button>search</button>
      </span>
    );
  }
}

export default InputSearch;
