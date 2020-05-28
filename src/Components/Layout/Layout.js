import React, { Component } from 'react'
import Aux from '../HOC/Aux'
import styles from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

/* This will be turned into a class component because SideDrawer MUST have a state to see if it has been toggled! */

class Layout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showSideDrawer: false
        }
    }

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        }, () => {console.log('i am closed')});
    }

    // sideDrawerOpenHandler = () => {
    //     this.setState({
    //         showSideDrawer: true
    //     }, () => {console.log('i am opened')});
    // } This is totally fine, how I approached it.

    // since we depend on the current state! .. using the state from this.state is UNSTABLE because of its async nature.
    sideDrawerOpenHandler = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        })
    
    }
    
    render () {

        const { children } = this.props;
        const { showSideDrawer } = this.state;

        return (
            <Aux>
                {/* {console.log(this.state.showSideDrawer)} */}

                <Toolbar 
                    drawerToggleClicked={this.sideDrawerOpenHandler}
                />

                 <SideDrawer 
                    closed={this.sideDrawerClosedHandler}
                    show={showSideDrawer}
                />
                
                {/* BurgerBuilder will be in this <main> tag */}
                {/* HTML Semantic Elements */}
                <main className={styles.Content}>
                    { children }
                </main>
            </Aux>
        );
    }
}
    
export default Layout;