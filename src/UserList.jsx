import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Container, Button, Pagination } from '@mui/material';
import api from './api'; // Import the centralized Axios instance

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);  // State to manage current page
    const [totalPages, setTotalPages] = useState(1);    // State to manage total pages

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get(`/users?page=${currentPage}`); // Fetch paginated data
                setUsers(response.data.data);  // 'data' contains the users for the current page
                setTotalPages(response.data.last_page); // 'last_page' from Laravel pagination response
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [currentPage]);  // Refetch users when the page changes

    const handlePageChange = (event, value) => {
        setCurrentPage(value); // Update current page state when pagination changes
    };

    return (
        <Container 
            maxWidth="md" 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                minHeight: '100vh',
                gap: 2
            }}
        >
            <Paper 
                sx={{
                    width: '100%',
                    maxWidth: 600, // Limit the width of the table
                    marginBottom: 2,
                    padding: 2,
                    overflowX: 'auto',
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            <Pagination 
                count={totalPages} 
                page={currentPage} 
                onChange={handlePageChange} 
                color="primary" 
                sx={{ display: 'flex', justifyContent: 'center' }}
            />
        </Container>
    );
};

export default UserList;
