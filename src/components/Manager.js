import React from 'react';
import { connect } from 'react-redux';
import { getEquipments, deleteEquipment } from '../actions/equipments';
import { logOut } from '../actions/auth';
import { showError, showSuccess } from '../actions/snackbar';
import MaterialSnackbar from './MaterialSnackbar';
import history from '../history';
import EquipmentsList from './EquipmentsList';
import Button from '@material-ui/core/Button';

class Manager extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = { buttonLogOut: false };
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            this.props.getEquipments()
                .then( () => this.props.showSuccess() )
                .catch( (error) => this.props.showError(error) );
        } else {
            history.push('/signin');
        }
    }
    
    componentDidUpdate(prevProps){
        if(this.props.snackbar.errorMessage !== prevProps.snackbar.errorMessage) {
            this.setState({ buttonLogOut: false });
        }
    }

    signOutClick = () => {
        this.setState({ buttonLogOut: true });
        this.props.logOut()
            .then( () => {
                this.props.showSuccess();
                history.push('/signin')
            })
            .catch((error) => this.props.showError(error));
    }

    checkEquipments(){
        if(this.props.paginationData.count !== 0){
            return(
                <EquipmentsList 
                    equipmentsData={this.props.equipmentsData}
                    paginationData={this.props.paginationData}
                    deleteEquipment={this.props.deleteEquipment}
                    error={this.props.showError}
                    success={this.props.showSuccess}                 
                />
            );
        }
    }
    
    render() {
        return (
            <div style={{ margin: 150}}>
                {this.checkEquipments()}
                <div style={{marginTop: 20, textAlign: 'center'}}>
                    <Button 
                        onClick={this.signOutClick}
                        type="button" 
                        disabled={this.state.buttonLogOut}
                        variant="outlined" color="secondary"
                        size="large"
                        style={{ margin: 10}} 
                        >
                        Log Out
                    </Button>
                </div>
                <MaterialSnackbar/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        equipmentsData: state.equipments.equipmentsData,
        paginationData: state.equipments.paginationData,
        snackbar: state.snackbar
    };
}


export default connect(mapStateToProps, { getEquipments, deleteEquipment, logOut, showError, showSuccess })(Manager);