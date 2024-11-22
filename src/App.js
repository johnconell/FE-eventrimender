import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import UserList from './UserList';
import PrivateRoute from './PrivateRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/users" element={
                    <PrivateRoute>
                        <UserList />
                    </PrivateRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;

