import React from 'react';
import { connect } from 'react-redux';
import { showError } from '../actions/error';
import { editEquipment } from '../actions/equipments';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import MaterialSnackbar from './MaterialSnackbar';

class ModalEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            open: false,
            name: '',
            id: ''
        };
    }

    componentDidUpdate(prevProps){
      if(this.props.modalEdit !== prevProps.modalEdit){
        this.setState({
          open: true, 
          name: this.props.selectedRow.name,
          id: this.props.selectedRow.id
        })
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
        if(this.state.name !== this.props.selectedRow.name){
          this.props.editEquipment(this.state)
            .then( this.setState({ name: '' }))
            .catch((error) => this.props.showError(error));
        }
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
            <MaterialSnackbar/>
          </div>
        );
    }
}


export default connect(null, {  showError, editEquipment })(ModalEdit);