// components/UserTable.js

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import styles from "./UserTable.module.css";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(1);
  };

  const handleDelete = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  return (
    <div className={styles.tableContainer}>
      <TextField
        label="Search users..."
        variant="outlined"
        className={styles.searchField}
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={styles.tableHeader}>Name</TableCell>
              <TableCell className={styles.tableHeader}>Email</TableCell>
              <TableCell className={styles.tableHeader}>Username</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers
              .slice((page - 1) * rowsPerPage, page * rowsPerPage)
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell className={styles.tableCellName}>
                    {user.name}
                  </TableCell>
                  <TableCell className={styles.tableCellEmail}>
                    {user.email}
                  </TableCell>
                  <TableCell className={styles.tableCellusername}>
                    {user.username}
                  </TableCell>
                  <TableCell className={styles.end}>
                    <button
                      className={styles.btnDelete}
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={styles.paginationButton}
        >
          Previous
        </button>
        <select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          className={styles.rowsPerPage}
        >
          {[5, 10, 15, 20].map((rows) => (
            <option key={rows} value={rows}>
              {rows}
            </option>
          ))}
        </select>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page * rowsPerPage >= filteredUsers.length}
          className={styles.paginationButton}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;
