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
          <MenuItem value={"Accessories"}>Accessories</MenuItem>
          <MenuItem value={"Tops"}>Tops</MenuItem>
          <MenuItem value={"Bottoms"}>Bottoms</MenuItem>
          <MenuItem value={"Shoes"}>Shoes</MenuItem>
        </Select>
      </FormControl>
    </Fragment>
  )
}
export default ClothesCategory;