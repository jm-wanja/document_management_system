import React, { PropTypes } from 'react';

/**
 * @desc component used to display the user action bar
 */
const UserActionBar = ({ onRoleChange, onSearchChange, clearSearch }) =>
  (<div className="row">

    <div className="col l8 m8 s12">
      <form>
        <div className="input-field">
          <input
            id="search"
            type="search"
            onKeyUp={onSearchChange}
            placeholder="Search for users"
          />
          <label className="label-icon" htmlFor="search">
            <i className="material-icons">search</i>
          </label>
          <i className="material-icons" onClick={clearSearch}>close</i>
        </div>
      </form>
    </div>

    <div className="input-field col l4 m4 s12">
      <form action="#">
        <h6>Filter by Role:</h6>

        <input
          onClick={onRoleChange}
          className="with-gap"
          name="role"
          value="1"
          type="radio"
          id="1"
        />
        <label htmlFor="admin">Admin Users</label>

        <span>
          <input
            onClick={onRoleChange}
            className="with-gap"
            name="role"
            value="2"
            type="radio"
            id="2"
          />
          <label htmlFor="regular">Regular Users</label>
        </span>
      </form>
    </div>
  </div>)
;

/**
 * @desc Set the PropTypes
 */
UserActionBar.propTypes = {
  onRoleChange: PropTypes.func,
  clearSearch: PropTypes.func,
  onSearchChange: PropTypes.func,
};

export default UserActionBar;