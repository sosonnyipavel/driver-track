import React from 'react';
import { connect } from 'react-redux';
import { getEquipments, deleteEquipments} from '../actions/equipments';
import { logOut } from '../actions/auth';
import { showError } from '../actions/showError';
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

    signOutClick = () => {
        this.setState({ buttonLogOut: true });
        const token = localStorage.getItem('token');
        this.props.logOut(token).catch((error) => this.props.showError(error));
    }

    buttonEdit = () => {
        this.props.showModal(true);
    }

    checkEquipments(){
        if(this.props.equipmentsData){
            return(
                <EquipmentsList 
                    equipmentsData={this.props.equipmentsData}
                    paginationData={this.props.paginationData}
                    deleteEquipments={this.props.deleteEquipments}
                />
            );
        }
    }
    
    render() {
        return (
            <div style={{ margin: 100}}>
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
                <MaterialSnackbar message={this.props.message} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        equipmentsData: state.equipments.equipmentsData,
        paginationData: state.equipments.paginationData,
        message: state.error.errorMessage
    };
}


export default connect(mapStateToProps, { getEquipments, deleteEquipments, logOut, showError })(Manager);