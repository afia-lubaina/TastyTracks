import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Users.css';


const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/user/get');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);


 /*  private long user_id;
  private String email;
  private String firstName;
  private String lastName;
  private String password;

  private String phone;
  private String address;
  private String img_url;
  private LocalDateTime accCreated;

  private String gender;
 */
  return (
    <div className='user-page'>
      <h1>Users</h1>
      <div className="user-container">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <h2>{user.user_id}</h2>
            <p>Email: {user.email}</p>
            <p>Role: {user.firstName}</p>
            <p>Role: {user.lastName}</p>
            <p>Role: {user.phone}</p>
            <p>Role: {user.address}</p>
            <p>Role: {user.accCreated}</p>
            <button>Remove User</button>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
