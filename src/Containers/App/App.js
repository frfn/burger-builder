import React, { Component } from 'react';
import Layout from '../../Components/Layout/Layout'
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder';


export default class App extends Component {
  render () {
    return (
      <Layout>
        <BurgerBuilder />
      </Layout>
    );
  }
}

