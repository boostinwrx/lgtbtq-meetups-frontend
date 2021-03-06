
import React from "react";
import NavBar from "./NavBar";
import {connect} from "react-redux";
import {getProfileFetch, getUser, getUsers, loginUser, saveUser} from "../actions/user";
import {MDBCard, MDBCardBody, MDBCardHeader, MDBCardTitle} from "mdbreact";
export default class UserProfilePage extends React.Component {
    state = {

    }
    componentDidMount() {


    }

    render() {
        console.log(this.props.currentUser)
        return (
            <div id='profile main-container'>
                <MDBCard id='home-card'>
                    <MDBCardTitle className='card-header text-lg-left' align='center' id='home-card header'><h2>My
                        Profile</h2></MDBCardTitle>
                    <MDBCardHeader className='card-header'>{`Welcome ${this.props.currentUser.name}`}</MDBCardHeader>
                    <MDBCardBody className='card-body'>
                        <p>

                        </p>
                    </MDBCardBody>
                </MDBCard>
                {/*<button onClick={() => this.state.getUsers()}>Get Users</button>*/}


            </div>

        )
    }
}
//
const mapStateToProps = (state) => {
    return {
       currentUser: state.currentUser.userInfo
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        getUser: (currentUser) => {
            dispatch(getUser(currentUser))
        }
    }
}


connect(mapDispatchToProps, mapStateToProps)(UserProfilePage)