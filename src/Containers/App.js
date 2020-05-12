import React, { Component } from 'react';
import styles from '../Containers/App.module.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalprice: 0,
      ingredients: {

      },
      purchased: false
    };
  }



  render () {
    return (
      <div className={styles.App}>
        Hello World.
      </div>
    );
  }
}
