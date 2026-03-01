import React, {useState} from 'react';
import {Backdrop, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Loader from "../../components/Loader.jsx";
import {permanentlyDeleteCategory} from "../../services/categoryService.js";
import toast from "react-hot-toast";

const CategoryDeleteDialog = ({open, onClose, category}) => {
    const [loading, setLoading] = useState(false);

    const deleteCategory = async () => {
        setLoading(true);
        try {
            const response = await permanentlyDeleteCategory(category?.id);
            toast.success("Category deleted successfully.");
            onClose();
        }
        catch (error) {
            toast.error("Error deleting category");
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }

  return (
      <Dialog
          open={open}
          onClose={onClose}
          maxWidth="sm"
          fullWidth
          PaperProps={{
              sx: { borderRadius: 3, boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }
          }}
      >
          {/*  Title  */}
          <DialogTitle  sx={{ px: 3, pt: 3, pb: 1 }} >
              <div className="flex items-start justify-between">
                  <div>
                      <h2 className="text-lg font-bold text-gray-900 leading-tight">Delete Category</h2>
                      <p className="text-sm text-gray-400 font-normal mt-0.5">
                          Permanently delete category{' '}
                          <span className="font-bold text-red-600">{category?.name}</span>
                      </p>
                  </div>
                  <IconButton onClick={onClose} size="small" sx={{ color: 'gray', mt: -0.5, mr: -1 }}>
                      <CloseIcon fontSize="small" />
                  </IconButton>
              </div>
          </DialogTitle>

          <Divider />

          {/*  Form Fields  */}
          <DialogContent sx={{ px: 3, py: 2.5 }}>
              This action cannot be undone. It will permanently delete the category
              Are you sure you want to delete this category?
              {loading && (
                  <Backdrop
                      sx={{
                          color: '#6366f1', // Indigo-600
                          zIndex: (theme) => theme.zIndex.drawer + 1,
                          backgroundColor: 'rgba(255, 255, 255, 0.4)',
                          backdropFilter: 'blur(8px)',
                      }}
                      open={loading}>
                      <Loader text="Deleting Vehicle Category..." />
                  </Backdrop>
              )}
          </DialogContent>

          <DialogActions>
              <Button onClick={onClose}>Disagree</Button>
              <Button onClick={deleteCategory} autoFocus>
                  Agree
              </Button>
          </DialogActions>

      </Dialog>
  );
};

export default CategoryDeleteDialog;
