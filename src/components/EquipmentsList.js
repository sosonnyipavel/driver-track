import React from 'react';
import { connect } from 'react-redux';
import { getEquipments } from '../actions/equipments';
import { logOut } from '../actions/auth';
import { showError } from '../actions/showError';
import { showModal } from '../actions/editModal';
import ModalEdit from './ModalEdit';
import MaterialSnackbar from './MaterialSnackbar';
import history from '../history';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class EquipmentsList extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = { buttonLogOut: false };
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            this.props.getEquipments(token);
        } else {
            history.push('/signin');
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.message !== prevProps.message) {
            this.setState({ buttonLogOut: false });
        }
    }


    userTable() {
        if(this.props.equipmentsList){
        return this.props.equipmentsList.map((equipment) => {
            return(
            <TableRow key={equipment.id}>
              <TableCell align="left">{equipment.id}</TableCell>
              <TableCell align="left">{equipment.name}</TableCell>
              <TableCell align="left">{ new Date(Date.parse(equipment.created_at)).toLocaleString()}</TableCell>
              <TableCell align="left">{new Date(Date.parse(equipment.updated_at)).toLocaleString()}</TableCell>
            </TableRow>
            );
        });
        }
    }

    signOutClick = () => {
        this.setState({ buttonLogOut: true });
        const token = localStorage.getItem('token');
        this.props.logOut(token).catch((error) => this.props.showError(error));
    }

    buttonEdit = () => {
        this.props.showModal(true);
    }
    
    render() {
        return (
            <div style={{ marginTop: 30}}>
            <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">ID</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Created at:</TableCell>
                  <TableCell align="left">Updated at:</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { this.userTable() }
                {console.log(this.props.equipmentsList)}
              </TableBody>
            </Table>
          </TableContainer>
                <div style={{marginTop: 20}}>
                <Button 
                    onClick={this.signOutClick}
                    type="button" 
                    disabled={this.state.buttonLogOut}
                    variant="outlined" color="secondary"
                    size="large"
                    style={{ margin: 10 }} 
                    >
                    Log Out
                </Button>
                <Button onClick={ this.buttonEdit } variant="contained" size="large" style={{ margin: 10 }}  > Edit </Button>
                </div>
                <ModalEdit />
                <MaterialSnackbar message={this.props.message} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        equipmentsList: state.equipments.equipmentsData,
        message: state.error.errorMessage
    };
}


export default connect(mapStateToProps, { getEquipments, logOut, showModal, showError })(EquipmentsList);