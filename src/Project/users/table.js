import {  Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import * as client from "./client";
import { BsTrash3Fill, BsFillCheckCircleFill, BsPencil, BsPlusCircleFill } from "react-icons/bs";

function UserTable() {
    const [users, setUsers] = useState([]);
    const fetchUsers = async () => {
        const temp = await client.findAllUsers();
        console.log(temp);
        setUsers(temp);
    };
    const [user, setUser] = useState({ username: "", password: "", role: "USER" });
    const createUser = async () => {
        try {
            const newUser = await client.createUser(user);
            setUsers([newUser, ...users]);
        } catch (err) {
            console.log(err);
        }
    };
    const selectUser = async (user) => {
        try {
            const u = await client.findUserById(user._id);
            setUser(u);
        } catch (err) {
            console.log(err);
        }
    };
    const updateUser = async () => {
        try {
            const status = await client.updateUser(user);
            setUsers(users.map((u) => (u._id === user._id ? user : u)));
        } catch (err) {
            console.log(err);
        }
    };
    const deleteUser = async (user) => {
        try {
            await client.deleteUser(user);
            setUsers(users.filter((u) => u._id !== user._id));
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => { fetchUsers(); }, []);
    return (
        <div>
            <br></br>
            <h1>User List</h1>
            <h3>Note that this screen can only be viewed on a laptop as it is too easy to accidentally remove users on small screens.</h3>
            <table className="table">
            <thead>
                    <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Role</th>
                        <th>Add/Remove</th>
                    </tr>
                    <tr>
                    <td>
                        <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                        <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                    </td>
                    <td>
                        <input value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
                    </td>
                    <td>
                        <input value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
                    </td>
                    <td>
                        <select value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })}>
                            <option value="USER">User</option>
                            <option value="MODERATOR">Moderator</option>
                        </select>
                    </td>
                    <td className="text-nowrap">
                            <BsPlusCircleFill onClick={createUser}
                                className="text-primary fs-1 text" />
                            <BsFillCheckCircleFill onClick={updateUser}
                                className="me-2 text-success fs-1 text" />
                        </td>
                   
                </tr>
                </thead>
                <tbody>
                    {users.map((us) => (
                        <tr key={us?._id}>
                            <td> <Link to={"/profile/"+us._id}>
                            {us.username}
                        </Link></td>
                            <td>{us.firstName}</td>
                            <td>{us.lastName}</td>
                            <td></td>
                            <td className="text-nowrap">
                            <button className="btn btn-warning me-2">
                                    <BsPencil onClick={() => selectUser(us)} />
                                </button>
                                <button onClick={() => deleteUser(us)}>
                                    <BsTrash3Fill />
                                </button>
                            </td>
                        </tr>))}
                </tbody>
            </table>
        </div>
    );
}
export default UserTable;