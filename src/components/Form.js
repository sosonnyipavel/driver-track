import React from 'react';
import { Field, reduxForm } from 'redux-form';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';

class Form extends React.Component{
    constructor(props) {
        super(props);
        this.state = { showPassword: false};
    }
    handleClickShowPassword = (event) => {
        event.preventDefault();
        this.setState({ showPassword: !this.state.showPassword });
      };
    renderError({ touched, error  }) {
        if (touched && error) {
            return (
                {touched} && {error} && <span>{error}</span>
            );
        }
    }

    renderInput = ({ input, label, type, meta}) => {
        return (
          <div style={{ margin: 15 }}>
          <InputLabel style={{color: meta.error && meta.touched ? 'red': '#000'}}>{label}</InputLabel>
          <OutlinedInput
          {...input}
            type={type === 'email' ? 'email' : this.state.showPassword ? 'text' : 'password' }
            error={meta.error && meta.touched ? true: false}
            endAdornment={ type === 'email' ? null :
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            fullWidth
          />
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }


    render() {
        
        return (
            <form autoComplete="off">
                <Field name="email" type="email" component={this.renderInput} label="Enter Login" />
                <Field name="password" type="password" component={this.renderInput} label="Enter Password" />
                <Button size="large" style={{ margin: 15 }} variant="outlined" color="primary" disabled={this.props.buttonSubmit} onClick={this.props.handleSubmit(this.onSubmit)}>Submit</Button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors ={};
    if(!formValues.email) {
        errors.email = 'Required';
    } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,13}$/i.test(formValues.email)) {
        errors.email = 'Invalid email address'
    }

    if(!formValues.password) {
        errors.password = 'Required';
    } 
    return errors;
};

export default reduxForm({
    form: 'userForm',
    validate
}) (Form);