import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {connect} from 'react-redux';
import { hideSnackbar } from '../actions/snackbar';


class MaterialSnackbar extends React.Component{

  handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
      this.props.hideSnackbar();
  };

  render() {
  return (
    <div>
      <Snackbar open={this.props.snackbar.setSuccess} autoHideDuration={6000} anchorOrigin={{horizontal: 'center', vertical: 'bottom'}} onClose={this.handleClose}>
        <Alert onClose={this.handleClose} severity="success">
        Success operation
        </Alert>
      </Snackbar>
      <Snackbar open={this.props.snackbar.setError} autoHideDuration={6000} anchorOrigin={{horizontal: 'center', vertical: 'bottom'}} onClose={this.handleClose}>
        <Alert onClose={this.handleClose}  severity="error">{this.props.snackbar.errorMessage}</Alert>
      </Snackbar>
    </div>
  );
}

}


const mapStateToProps = (state) => {
  return { 
    snackbar: state.snackbar
  };
}

export default connect(mapStateToProps, { hideSnackbar })(MaterialSnackbar);