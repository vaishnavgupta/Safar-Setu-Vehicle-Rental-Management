import React, {useEffect, useState} from 'react';
import {Button, Chip, CircularProgress, InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import UsersStatsBox from "./UsersStatsBox.jsx";
import {formatDateTime} from "./constants.js";
import StatsCard from "../../components/StatsCard.jsx";
import DangerousIcon from "@mui/icons-material/Dangerous";
import {fetchAllUsers} from "../../services/userService.js";
import toast from "react-hot-toast";

const Users = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    const getAllUsers = async () => {
        setLoading(true);
        try {
            const response =await fetchAllUsers();
            setUsers(response.data);
        }
        catch (error) {
            console.error(error);
            toast.error("Unable to fetch users");
        }
        finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        getAllUsers();
    }, []);

  return (
      <div className="min-h-screen bg-white py-8">
          <div className="px-4 sm:px-8 lg:px-8" >
              <div className="mb-8 animate-fade-in-up flex items-center justify-between" >
                  <div className="flex flex-col">
                      <h1 className="text-4xl font-bold text-gray-800 mb-2" >Users Management</h1>

                      <p className="text-lg text-gray-600" >Manage user's accounts and permissions.</p>
                  </div>
              </div>

              {/* Users Stats Boxes */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {
                      [
                          {title:"Total Users", value:users.length},
                          {title: "Admin Users", value:users.filter(u => u.role === "ROLE_ADMIN").length},
                          {title: "Google Auth Users", value: users.filter(u => u.googleId !== null).length},
                          {title: "Github Auth Users", value: users.filter(u => u.githubId !== null).length},
                      ].map((item) => {
                          return <UsersStatsBox key={item.title} title={item.title} value={item.value} textClass="text-indigo-500" />
                      })
                  }
              </div>

              {/*  Filters  */}
              <div className="flex flex-wrap items-center gap-3 mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm">

                  {/*  Search Input  */}
                  <div className="flex-1 min-w-[220px]">
                      <TextField
                          fullWidth
                          placeholder="Search by email, phone or name..."
                          InputProps={{
                              startAdornment: (
                                  <InputAdornment position="start">
                                      <SearchIcon className="text-gray-400" />
                                  </InputAdornment>
                              ),
                          }}
                      />
                  </div>

                  <Button variant="outlined" color="error" size="medium" endIcon={<DangerousIcon/>}>
                      Clear
                  </Button>
              </div>

              {/*   Table Header     */}

              <div className="w-full overflow-x-auto rounded-xl shadow-sm border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                      <tr>
                          {["ID", "User", "Role", "Phone", "Auth Provider", "Last Login"].map((col) => (
                              <th
                                  key={col}
                                  className="px-4 py-3  text-center text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                              >
                                  {col}
                              </th>
                          ))}
                      </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100 text-center">
                      {
                          !loading && users.map((user) => {
                              return <tr key={user.id} >
                                  <td>
                                      <p className="font-bold font-mono">{user.id}</p>
                                  </td>
                                  <td>
                                      <StatsCard fullName={user.fullName} email={user.email} imageUrl={user.profileImageUrl} />
                                  </td>
                                  <td>
                                      <Chip variant="filled" color={user.role==="ROLE_USER" ? "primary" : "error"  } sx={{fontWeight:"bold"}} label={user.role} ></Chip>
                                  </td>
                                  <td>
                                      <p className="font-bold">{user.phone ? user.phone : "-"}</p>
                                  </td>
                                  <td>
                                      <Chip variant="filled" color={user.googleId ? "primary" : (user.githubId ? "warning" : "success")} sx={{fontWeight:"bold"}}  label={user.googleId ? "Google" : (user.githubId ? "Github" : "Local") }></Chip>
                                  </td>
                                  <td>
                                      <p className="font-bold">{formatDateTime(user.lastLogin)}</p>
                                  </td>
                              </tr>
                          })
                      }
                      </tbody>
                  </table>
                  {
                      loading && (
                          <div className="flex justify-center py-8">
                              <CircularProgress size="3rem"/>
                          </div>
                      )
                  }
              </div>

          </div>
      </div>
  );
};

export default Users;
