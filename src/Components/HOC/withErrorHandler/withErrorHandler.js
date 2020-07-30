import React, { Component } from 'react'
import Modal from '../../UI/Modal/Modal'
import Aux from '../Aux'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props){
            super(props);

            this.state = {
                error: null
            }

            // Global Listeners -- interceptors
            // use must wrtie like this though you don't need to use req variable

            /* interceptors, you MUST return the responses */
            this.reqInterceptor = axios.interceptors.request.use(req => {
                /* this CLEARS the error at hand */
                this.setState({
                    error: null
                })
                return req;
            })

            // error is coming from Firebase
            // res => res is just returning the response, this is a MUST
            // - it is the shortest way to return something
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({
                    error: error
                })
                // return error;
            })
            
        }

        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }


        // componentDidMount() {
        //     // use must wrtie like this though you don't need to use req variable
        //     axios.interceptors.request.use(req => {
        //         this.setState({
        //             error: null
        //         })
        //         return req;
        //     })

        //     // error is coming from Firebase
        //     // res => res is just return the response
        //     // - it is the shortest way to return something
        //     axios.interceptors.response.use(res => res, error => {
        //         this.setState({
        //             error: error
        //         })
        //     })
        // }

        errorConfirmHandler = () => {
            this.setState({
                error: null
            })
        }

        render () {
            return ( 
            <Aux>
                <Modal 
                    show={this.state.error}
                    decline={this.errorConfirmHandler} >
                    {/* The message is from Firebase endpoint */}
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props} />
            </Aux>)
        }
    } 
}

export default withErrorHandler;