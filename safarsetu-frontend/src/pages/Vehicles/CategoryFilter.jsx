import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import {Button} from "@mui/material";

const CategoryFilter = ({categories, selectedCategoryId, onCategorySelect}) => {
  return (
      <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100" >
        {/*  Category Header    */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-300" >
              <h3 className="text-lg font-bold text-gray-900">Categories</h3>
              {selectedCategoryId && (
                  <Button variant='text' size="medium" sx={{fontWeight: 'bold'}}>
                      Clear
                  </Button>
              )}
          </div>
          {/*  All Categories Option  */}
          <div
              className={`flex items-center space-x-2 py-2 px-3 mb-2 rounded-1g cursor-pointer transition-all
                  duration-200 ${
                  !selectedCategoryId
                      ? "bg-indigo-50 text-indigo-700 font-semibold"
                      : 'hover:bg-gray-50 text-gray-700'
              }`}
                  onClick={() => onCategorySelect()}
            >
              {!selectedCategoryId ? (
                  <Radio checked={true} sx={{ fontSize: 16, color: '#4F46E5' }} />
          ) : (
          <Radio checked={false} sx={{ fontSize: 16 }} />
              )}
          <span className="text-sm">All Genres</span>
      </div>
          {/* Categories List */}
          <div className="space-y-1 pl-15 max-h-96 overflow-y-auto custom-scrollbar" >
              <FormControl>
                  <RadioGroup
                      aria-labelledby="category-radio-labels"
                      defaultValue="1"
                      name="radio-buttons-group"
                      onChange={onCategorySelect}
                  >
                      {
                          categories.map((category) => {
                              return <FormControlLabel value={category.id} control={<Radio/>} label={category.name} key={category.id}/>
                          })
                      }

                  </RadioGroup>
              </FormControl>
          </div>

      </div>
    );
};

export default CategoryFilter;
