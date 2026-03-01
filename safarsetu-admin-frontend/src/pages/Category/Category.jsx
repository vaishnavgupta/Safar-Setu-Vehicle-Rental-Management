import React, {useEffect, useState} from 'react';
import UsersStatsBox from "../Users/UsersStatsBox.jsx";
import {Button, Chip, CircularProgress, IconButton, InputAdornment, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DangerousIcon from "@mui/icons-material/Dangerous";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import CategoryDialog from "./CategoryDialog.jsx";
import {getAllCategory} from "../../services/categoryService.js";
import CategoryUpdateDialog from "./CategoryUpdateDialog.jsx";
import CategoryDeleteDialog from "./CategoryDeleteDialog.jsx";

const Category = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [categoryArray, setCategoryArray] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updateDialog, setUpdateDialog] = useState({ open: false, category: {} });
    const [deleteDialog, setDeleteDialog] = useState({ open: false, category: {} });
    const [statsData, setStatsData] = useState([
        {title: "Root Category", value: 0},
        {title: "Total Category", value: 0},
        {title: "Active Category", value: 0},
    ]);

    const fetchAllCategories = async () => {
        setLoading(true);
        try {
            const response = await getAllCategory();
            setCategoryArray(response.data);
            updateStatsData(response.data);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    const selectCategoryForUpdate = (category) => {
        setUpdateDialog({ open: true, category });
    }

    const deleteCategoryForUpdate = (category) => {
        setDeleteDialog({ open: true, category });
    }

    const updateStatsData = (data) => {
        const totCat = data.length;
        let rootCat = 0;
        let actCat = 0;
        for(const category of data) {
            if(category.parentCategoryId === null) {
                rootCat++;
            }
            if(category.active === true) {
                actCat++;
            }
        }
        setStatsData([
            { title: "Root Category", value: rootCat },
            { title: "Total Category", value: totCat },
            { title: "Active Category", value: actCat },
        ]);
    }

    useEffect(() => {
        fetchAllCategories()
    }, [dialogOpen, updateDialog.open, deleteDialog.open]);

  return (
      <div className="min-h-screen bg-white py-8">
          <div className="px-4 sm:px-8 lg:px-8" >
              <div className="mb-8 animate-fade-in-up flex items-center justify-between" >
                  <div className="flex flex-col">
                      <h1 className="text-4xl font-bold text-gray-800 mb-2" >Vehicle Category Management</h1>
                      <p className="text-lg text-gray-600" >Manage vehicle categories and sub-categories.</p>
                  </div>
                  <Button
                      variant="contained"
                      startIcon={<AddIcon/>}
                      onClick={() => setDialogOpen(true)}
                  >
                      Add New Category
                  </Button>
              </div>

              {/*Dialog When Add New Button Clicked*/}
              <CategoryDialog
                  open={dialogOpen}
                  onClose={() => setDialogOpen(false)}
              />
              {/* Dialog when update new category is clicked */}
              <CategoryUpdateDialog
                  open={updateDialog.open}
                  onClose={() => setUpdateDialog({ open: false, category: null })}
                  category={updateDialog.category}
              />
              <CategoryDeleteDialog
                open={deleteDialog.open}
                onClose={() => setDeleteDialog({ open: false, category: null })}
                category={deleteDialog.category}
              />

              {/* Users Stats Boxes */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {
                      statsData.map((item) => {
                          return <UsersStatsBox key={item.title} title={item.title} value={item.value} textClass="text-indigo-500" />
                      })
                  }
              </div>

              {/*  Filters  */}
              <div className="flex flex-wrap items-center justify-end gap-3 mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm">
                  {/*  Search Input  */}
                  <div className="flex-1 min-w-[220px]">
                      <TextField
                          fullWidth
                          placeholder="Search category by name or code..."
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

              <div className="w-full overflow-x-auto rounded-xl shadow-sm border border-gray-200 text-center py-2">
                  <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                      <tr>
                          {["Category", "Description", "Parent Category", "Vehicles", "Status", "Actions"].map((col) => (
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
                          !loading && categoryArray.map((category) => {
                              return <tr>
                                  <td>
                                      <div className="flex gap-2 mt-3 mb-3">
                                          <FolderOpenIcon className="ms-6" sx={{color:"blue"}} />
                                          <h4 className="font-bold justify-center">{category.name}</h4>
                                      </div>
                                  </td>
                                  <td>
                                      <p className="font-bold">{category.description}</p>
                                  </td>
                                  <td>
                                      <Chip variant="filled" color="secondary" sx={{fontWeight:'bold'}} label={category.parentCategoryId ? category.parentCategoryName : "Root"} />
                                  </td>
                                  <td>
                                      <Chip variant="outlined" color="primary" sx={{fontWeight:'bold'}} label={category.vehicleCount ? category.vehicleCount : "0" } />
                                  </td>
                                  <td>
                                      <Chip variant="filled" color={category.active ? "success" : "error"} sx={{fontWeight:'bold'}} label={category.active ? "Active" : "Not Active"} />
                                  </td>
                                  <td>
                                      <div className="flex gap-1 items-center justify-center mb-2 mt-2">
                                          <IconButton color="success" onClick={() => selectCategoryForUpdate(category)}><EditIcon/></IconButton>
                                          <IconButton color="error" onClick={() => deleteCategoryForUpdate(category)}><DeleteIcon/></IconButton>
                                      </div>
                                  </td>
                              </tr>
                          })
                      }
                      </tbody>
                  </table>
                  {
                      loading && <div>
                          <CircularProgress enableTrackSlot size="3rem"  />
                      </div>
                  }
              </div>

          </div>
      </div>
  );
};

export default Category;
