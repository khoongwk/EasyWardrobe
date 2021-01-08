import React, { Fragment } from 'react'
import { FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';

const ClothesCategory = ({ handleCategoryChange }) => {
  return (
    <Fragment>
      <FormControl >
        <InputLabel shrink id="category-label">
          Category
            </InputLabel>
        <Select
          labelId="category-label"
          id="category-select-label"
          defaultValue={"Accessories"}
          onChange={handleCategoryChange}
          displayEmpty
        >
          <MenuItem value={"accessories"}>Accessories</MenuItem>
          <MenuItem value={"tops"}>Tops</MenuItem>
          <MenuItem value={"bottoms"}>Bottoms</MenuItem>
          <MenuItem value={"shoes"}>Shoes</MenuItem>
        </Select>
      </FormControl>
    </Fragment>
  )
}
export default ClothesCategory;