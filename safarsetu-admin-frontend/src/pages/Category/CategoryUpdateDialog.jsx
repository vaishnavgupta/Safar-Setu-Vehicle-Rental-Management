import React, {useEffect, useState} from 'react';
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {addCategory, fetchAllTopCategories, updateCategory} from "../../services/categoryService.js";
import toast from "react-hot-toast";
import {
    Backdrop,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    InputAdornment,
    MenuItem,
    TextField
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BadgeIcon from "@mui/icons-material/Badge";
import DescriptionIcon from "@mui/icons-material/Description";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import CategoryIcon from "@mui/icons-material/Category";
import Loader from "../../components/Loader.jsx";

const categoryUpdateSchema = z.object({
    code: z.string().min(3, "Minimum length is 3").max(20, "Maximum length is 20"),
    name: z.string().min(3, "Minimum length is 3").max(30, "Maximum length is 30"),
    description: z.string().min(5, "Minimum length is 5").max(50, "Maximum length is 50"),
    displayOrder: z.coerce.number().int().min(0),
    active: z.coerce.boolean().default(true),
    parentCategoryId: z.coerce.number().int().optional().nullable()
});

const CategoryUpdateDialog = ({open, onClose, category}) => {

    const [loading, setLoading] = useState(false);
    const [categoryLoading, setCategoryLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        resolver: zodResolver(categoryUpdateSchema),
        mode: 'onBlur',
    })

    const fetchTopLevelCategory = async () => {
        setCategoryLoading(true);
        try{
            const response = await fetchAllTopCategories();
            setCategories(response.data);
        }
        catch(error){
            console.error(error);
            toast.error("Error fetching categories");
            onClose()
        }
        finally {
            setCategoryLoading(false);
        }
    }

    const inputSx = {
        '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            fontSize: '0.9rem',
            '&:hover fieldset': { borderColor: '#374151' },
            '&.Mui-focused fieldset': { borderColor: '#111827', borderWidth: 1.5 },
        },
        '& label.Mui-focused': { color: '#111827' },
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await updateCategory(data, category.id);
            console.log(response.data)
            toast.success("Category updated successfully");
            reset({  name: '', description: '', displayOrder: 0, active: true, parentCategoryId: null });
            onClose()
        }
        catch (error) {
            console.error(error);
            toast.error("Error updating category");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTopLevelCategory();
    }, []);

    useEffect(() => {
        if (category && open) {
            reset({
                code:category.code,
                name: category.name,
                description: category.description,
                displayOrder: category.displayOrder,
                active: category.active,
                parentCategoryId: category.parentCategoryId ?? null,
            });
        }
    }, [category, open]);

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
                      <h2 className="text-lg font-bold text-gray-900 leading-tight">Update Category</h2>
                      <p className="text-sm text-gray-400 font-normal mt-0.5">Update the details below</p>
                  </div>
                  <IconButton onClick={onClose} size="small" sx={{ color: 'gray', mt: -0.5, mr: -1 }}>
                      <CloseIcon fontSize="small" />
                  </IconButton>
              </div>
          </DialogTitle>

          <Divider />

          {/*  Form Fields  */}
          <DialogContent sx={{ px: 3, py: 2.5 }}>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                      label="Category Name"
                      {...register("name")}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      fullWidth
                      size="small"
                      sx={inputSx}
                      slotProps={{
                          input: {
                              startAdornment: <InputAdornment position="start"><BadgeIcon/></InputAdornment>,
                          },
                      }}
                  />
                  <TextField
                      label="Category Description"
                      {...register("description")}
                      multiline
                      error={!!errors.description}
                      helperText={errors.description?.message}
                      fullWidth
                      size="small"
                      sx={inputSx}
                      slotProps={{
                          input: {
                              startAdornment: <InputAdornment position="start"><DescriptionIcon/></InputAdornment>,
                          },
                      }}
                  />
                  <TextField
                      select
                      label="Select display order"
                      {...register("displayOrder")}
                      error={!!errors.displayOrder}
                      helperText={errors.displayOrder?.message}
                      fullWidth
                      size="small"
                      sx={inputSx}
                      slotProps={{
                          input: {
                              startAdornment: <InputAdornment position="start"><SortByAlphaIcon/></InputAdornment>,
                          },
                      }}
                  >
                      <MenuItem value={0}>Ascending</MenuItem>
                      <MenuItem value={1}>Descending</MenuItem>
                  </TextField>
                  <TextField
                      select
                      label="Select activity status"
                      {...register("active")}
                      error={!!errors.active}
                      helperText={errors.active?.message}
                      fullWidth
                      size="small"
                      sx={inputSx}
                      slotProps={{
                          input: {
                              startAdornment: <InputAdornment position="start"><ToggleOffIcon/></InputAdornment>,
                          },
                      }}
                  >
                      <MenuItem value={true}>Active (ON)</MenuItem>
                      <MenuItem value={false}>Inactive (OFF)</MenuItem>
                  </TextField>
                  <TextField
                      select
                      label="Select parent category"
                      defaultValue={null}
                      {...register("parentCategoryId")}
                      error={!!errors.parentCategoryId}
                      helperText={errors.parentCategoryId?.message}
                      fullWidth
                      size="small"
                      sx={inputSx}
                      slotProps={{
                          input: {
                              startAdornment: <InputAdornment position="start"><CategoryIcon/></InputAdornment>,
                          },
                      }}
                  >
                      <MenuItem value={null}>None (Top Level)</MenuItem>
                      {
                          categories.map((category) => {
                              return <MenuItem key={category.id} value={category.id}>{`${category.name} - ${category.id}`}</MenuItem>
                          })
                      }
                  </TextField>

                  <Button variant="contained" color='primary' sx={{fontWeight: 'bold'}} type="submit">
                      Update Category
                  </Button>

              </form>
              {categoryLoading && (
                  <Backdrop
                      sx={{
                          color: '#6366f1', // Indigo-600
                          zIndex: (theme) => theme.zIndex.drawer + 1,
                          backgroundColor: 'rgba(255, 255, 255, 0.4)',
                          backdropFilter: 'blur(8px)',
                      }}
                      open={categoryLoading}>
                      <Loader  />
                  </Backdrop>
              )}
              {loading && (
                  <Backdrop
                      sx={{
                          color: '#6366f1', // Indigo-600
                          zIndex: (theme) => theme.zIndex.drawer + 1,
                          backgroundColor: 'rgba(255, 255, 255, 0.4)',
                          backdropFilter: 'blur(8px)',
                      }}
                      open={loading}>
                      <Loader text="Updating Vehicle Category..." />
                  </Backdrop>
              )}
          </DialogContent>

      </Dialog>
  );
};

export default CategoryUpdateDialog;
