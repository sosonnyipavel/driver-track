import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


class MaterialSnackbar extends React.Component{
    constructor(props) {
        super(props);
        this.state = { openSuccess: false, openError: false};
    }

    componentDidMount(){
      if(this.props.message === null){
        this.setState({ openSuccess: true });
      }
    }
  componentDidUpdate(prevProps){
    if(this.props.message !== prevProps.message){
      this.setState({ openError: true });
    }
  }

  handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
      this.setState({ openError: false });
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
      <Snackbar open={this.state.openError} autoHideDuration={6000} anchorOrigin={{horizontal: 'center', vertical: 'bottom'}} onClose={this.handleClose}>
        <Alert onClose={this.handleClose}  severity="error">{this.props.message}</Alert>
      </Snackbar>
    </div>
  );
}

}

export default MaterialSnackbar;