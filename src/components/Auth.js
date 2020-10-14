import React from 'react';
import Form from './Form';
import MaterialSnackbar from './MaterialSnackbar';
import {connect} from 'react-redux';
import { logIn } from '../actions/auth';
import { showError } from '../actions/showError';
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
        if(this.props.message !== prevProps.message) {
            this.setState({ buttonSubmit: false });
        }
    }


    onSubmit = (formValues) => {
        this.setState({ buttonSubmit: true });
        this.props.logIn(formValues).catch((error) => this.props.showError(error));
    }
    
    render() {
        return (

            <div >
                <Form onSubmit={this.onSubmit} buttonSubmit={this.state.buttonSubmit} />
                <MaterialSnackbar message={this.props.message} />
            </div>
        );
    }
    
}

const mapStateToProps = (state) => {
    return { 
        message: state.error.errorMessage
    };
}

export default connect(mapStateToProps, {logIn, showError})(Auth);