import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManage.scss'
import * as actions from '../../../store/actions'

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: []
        }
    }

    async componentDidMount() {
        this.props.fetchUserRedux();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUser !== this.props.listUser) {
            this.setState({
                usersRedux: this.props.listUser
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteAUser(user);
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParentKey(user);        
    }

    render() {
        let arrUsers = this.state.usersRedux;
        return (
            <table id="customers">
                <tbody>
                    <tr>
                        <th>Email</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Address</th>
                        <th>Action </th>
                    </tr>
                    {arrUsers && arrUsers.length > 0 &&
                        arrUsers.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td className='btn-action'>
                                        <button onClick={() => this.handleEditUser(item)} className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
                                        <button onClick={() => this.handleDeleteUser(item.id)} className='btn-delete'><i className="fas fa-trash" ></i></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUser: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsers()),
        deleteAUser: (userId) => dispatch(actions.deleteAUser(userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
