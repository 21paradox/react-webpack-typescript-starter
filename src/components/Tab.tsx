import css from './tab.module.css'
import * as React from "react";

class Tab extends React.Component {
  public render() {
    return (
      <div className={css.tab}>
        <ul>
          <li>tab1</li>
          <li>tab2</li>
        </ul>

        <div>tab1</div>
        <div>tab2</div>
      </div>
    );
  }
}

export default Tab;
