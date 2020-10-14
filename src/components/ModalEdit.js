import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { editEquipments } from '../actions/equipments';
import { hideModal } from '../actions/editModal';
import { showError } from '../actions/showError';
import MaterialSnackbar from './MaterialSnackbar';

class ModalEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            userFirstName: '',
            userLastName: '',
            userEmail: '',
            userPhone: ''
        };
    }

    
    componentDidUpdate(prevProps) {
        if(this.props.showModal !== prevProps.showModal) {
            this.setState({
                userFirstName: this.props.equipments.userFirstName,
                userLastName: this.props.equipments.userLastName,
                userEmail: this.props.equipments.userEmail,
                userPhone: this.props.equipments.userPhone
            });
        }
    }

    handleChange = (event) => {
        switch(event.target.name){
            case 'first-name': return this.setState({userFirstName: event.target.value });
            case 'last-name': return this.setState({userLastName: event.target.value });
            case 'email': return this.setState({userEmail: event.target.value });
            case 'phone': return this.setState({userPhone: event.target.value });
            default: return this.state;
        }
    }

    handleSubmitYes = () => {
        if(this.state.userFirstName !== this.props.equipments.userFirstName || 
            this.state.userLastName !== this.props.equipments.userLastName ||
            this.state.userEmail !== this.props.equipments.userEmail ||
            this.state.userPhone !== this.props.equipments.userPhone) 
            {
                const token = localStorage.getItem('token');
                this.props.editEquipments(token, this.state).catch((error) => this.props.showError(error));
            }
        this.props.hideModal();
    }

    handleSubmitNo = () => {
        this.props.hideModal();
    }
    render() {
        return ReactDOM.createPortal(
            <div className="ui dimmer modals visible active" style={{display: this.props.showModal}} >
                <div className="ui small basic modal visible active" >
                    <div className="content">
                        <div className="ui form">
                            <div className="three fields">
                                <div className="field">
                                    <label>First name</label>
                                    <input type="text" name="first-name" value={this.state.userFirstName} onChange={this.handleChange}/>
                                </div>
                                <div className="field">
                                    <label>Last name</label>
                                    <input type="text" name="last-name" value={this.state.userLastName} onChange={this.handleChange}/>
                                </div>
                                <div className="field">
                                    <label>Email</label>
                                    <input type="email" name="email" value={this.state.userEmail} onChange={this.handleChange}/>
                                </div>
                                <div className="field">
                                    <label>Phone</label>
                                    <input type="text" name="phone" value={this.state.userPhone} onChange={this.handleChange}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="actions">
                        <p>Submit changes?</p>
                        <button onClick={this.handleSubmitNo}  className="ui red basic cancel inverted button">
                        <i className="remove icon"></i>
                        No
                        </button>
                        <button onClick={this.handleSubmitYes} className="ui green ok inverted button">
                        <i className="checkmark icon"></i>
                        Yes
                        </button>
                    </div>
                    <MaterialSnackbar message={this.props.message} />
                </div>
            </div>, document.querySelector('#modal')       
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        showModal: state.modal.show,
        message: state.error.errorMessage
    };
}


export default connect(mapStateToProps, { editEquipments, hideModal, showError })(ModalEdit);