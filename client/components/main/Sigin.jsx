import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router';
import toastr from 'toastr';
import SigninForm from './SigninForm';
import * as userActions from '../../actions/UserActions';

/**
 * @desc component used to display the login component
 * @class Signin
 * @extends {Component}
 */
class Signin extends Component {
  /**
   * Creates an instance of Signin.
   * @param {any} props property of component
   * @param {any} context property of component
   * @returns {*} no return value
   * @memberof Signin
   */
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.updateUserState = this.updateUserState.bind(this);

    this.state = {
      user: Object.assign({}, props.user),
      errors: {},
      isLoading: false,
      redirect: false,
    };
  }

  /**
   * @desc handles the triggering of the necessary action
   * @returns {null} returns no value
   */
  // componentWillMount() {
  //   if (this.props.user) {
  //     this.setState({ redirect: true });
  //   }
  // }

  /**
   * @desc handles user login
   * @param {any} event html event
   * @returns {*} no return value
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({
      errors: {},
      isLoading: true,
    });
    this.props.userActions.login(this.state.user)
    .then(() => {
      this.setState({ isLoading: false });
      toastr.success(this.props.message);
      this.setState({ redirect: true });
    })
    .catch(() => {
      this.setState({ isLoading: false });
      toastr.error(this.props.message);
      this.setState({ redirect: false });
    });
  }

  /**
   * @desc handles form element changes
   * @param {any} event html event
   * @returns {*} no return value
   */
  updateUserState(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    return this.setState({ user });
  }

  /**
   * @desc Renders the Signin component
   * @return {*} html
   */
  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div>
        <div className="container">
          <div className="row">
            <SigninForm
              user={this.state.user}
              onChange={this.updateUserState}
              onSubmit={this.onSubmit}
              loading={this.state.isLoading}
              errors={this.state.errors}
            />
          </div>
        </div>
      </div>
    );
  }
}

/**
 * @desc Set the PropTypes
 */
Signin.propTypes = {
  user: PropTypes.object,
  message: PropTypes.string,
  // isAuthenticated: PropTypes.bool.isRequired,
  userActions: PropTypes.object.isRequired,
};

/**
 *  map state to props
 *
 * @param {state} state
 * @returns {*} props
 */
const mapStateToProps = state => ({
  message: state.message,
  user: state.isAuth.loggedInUser,
  isAuthenticated: state.isAuth.isAuthenticated,
});

/**
 * @param {any} dispatch
 * @returns {any} actions
 */
const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
