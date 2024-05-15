import React from 'react';
import { Link } from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
  return (
    <div className="admin-page">
      <div className="admin-container">
        <Link to="/users" className="admin-option-link">
          <div className="admin-option">
            <h2>See Users</h2>
            <p>View and manage all users.</p>
          </div>
        </Link>
        <Link to="/restaurant-owners" className="admin-option-link">
          <div className="admin-option">
            <h2>See Restaurant Owners</h2>
            <p>View and manage all restaurant owners.</p>
          </div>
        </Link>
        <Link to="/reservations" className="admin-option-link">
          <div className="admin-option">
            <h2>See Reservations</h2>
            <p>View and manage all reservations.</p>
          </div>
        </Link>
        <Link to="/orders" className="admin-option-link">
          <div className="admin-option">
            <h2>See Orders</h2>
            <p>View and manage all orders.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AdminPage;
