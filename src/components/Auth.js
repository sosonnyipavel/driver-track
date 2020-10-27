import React from 'react';
import Form from './Form';
import MaterialSnackbar from './MaterialSnackbar';
import {connect} from 'react-redux';
import { logIn } from '../actions/auth';
import { showError } from '../actions/error';
import history from '../history';

class Auth extends React.Component{

    constructor(props) {
        super(props);
        this.state = { buttonSubmit: false};
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            history.push('/');
        } 
    }

    componentDidUpdate(prevProps) {
        if(this.props.error.errorMessage !== prevProps.error.errorMessage) {
            this.setState({ buttonSubmit: false });
        }
    }


    onSubmit = (formValues) => {
        this.setState({ buttonSubmit: true });
        this.props.logIn(formValues)
            .then( () => history.push('/') )
            .catch( (error) => {this.props.showError(error) });
    }
    
    render() {
        return (

            <div style={{ margin: 150}} >
                <Form onSubmit={this.onSubmit} buttonSubmit={this.state.buttonSubmit} />
                <MaterialSnackbar/>
            </div>
        );
    }
    
}

const mapStateToProps = (state) => {
    return { 
        error: state.error
    };
}

export default connect(mapStateToProps, {logIn, showError})(Auth);