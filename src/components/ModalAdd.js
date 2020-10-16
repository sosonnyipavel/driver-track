import React from 'react';
import { connect } from 'react-redux';
import { showError } from '../actions/showError';
import { addEquipmets } from '../actions/equipments';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import MaterialSnackbar from './MaterialSnackbar';

class ModalAdd extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            open: false,
            name: ''
        };
    }

    componentDidUpdate(prevProps){
      if(this.props.modalAdd !== prevProps.modalAdd){
        this.setState({ open: true });
      }
    }
    
    handleChange = (event) => {
      switch(event.target.id){
          case 'name': return this.setState({name: event.target.value });
          default: return this.state;
      }
  }
    handleClose = () => {
        this.setState({open: false });
      };

    handleSubmitYes = () => {
      const token = localStorage.getItem('token');
      this.props.addEquipmets(token, this.state).catch((error) => this.props.showError(error));
      this.handleClose();
    }


    bodyModal() { 
        return (
        <div style={{
          position: 'absolute',
          width: 600,
          backgroundColor: '#696969',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          <form style={{textAlign: 'center'}}  autoComplete="off">
            <TextField style={{backgroundColor: '#fff', margin:'20px'}}  id="name" value={this.state.name} onChange={this.handleChange} label="Name" variant="outlined" />
            <Button size="large" style={{ transform: 'translate(30%, 50%)' }} onClick={this.handleSubmitYes} variant="contained" color="primary">Submit</Button>
          </form>
        </div>
        );
    }
    render() {
        return (
            <div>
            <Modal
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              {this.bodyModal()}
            </Modal>
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


export default connect(mapStateToProps, {  showError, addEquipmets })(ModalAdd);