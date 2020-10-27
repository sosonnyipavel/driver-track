import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {connect} from 'react-redux';
import { hideError } from '../actions/error';


class MaterialSnackbar extends React.Component{
    constructor(props) {
        super(props);
        this.state = { openSuccess: false};
    }

    componentDidMount(){
      if(this.props.error.setError === false){
        this.setState({ openSuccess: true });
      }
    }

  handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
      this.props.hideError();
      this.setState({ openSuccess: false });
  };

  render() {
  return (
    <div>
      <Snackbar open={this.state.openSuccess} autoHideDuration={6000} anchorOrigin={{horizontal: 'center', vertical: 'bottom'}} onClose={this.handleClose}>
        <Alert onClose={this.handleClose} severity="success">
        Success operation
        </Alert>
      </Snackbar>
      <Snackbar open={this.props.error.setError} autoHideDuration={6000} anchorOrigin={{horizontal: 'center', vertical: 'bottom'}} onClose={this.handleClose}>
        <Alert onClose={this.handleClose}  severity="error">{this.props.error.errorMessage}</Alert>
      </Snackbar>
    </div>
  );
}

}


const mapStateToProps = (state) => {
  return { 
      error: state.error
  };
}

export default connect(mapStateToProps, { hideError })(MaterialSnackbar);