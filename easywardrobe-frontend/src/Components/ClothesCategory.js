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
          defaultValue={"All"}
          onChange={handleCategoryChange}
          displayEmpty
        >
          <MenuItem value={"Accessories"}>Accessories</MenuItem>
          <MenuItem value={"Top"}>Top</MenuItem>
          <MenuItem value={"Bottoms"}>Bottoms</MenuItem>
          <MenuItem value={"Shoes"}>Shoes</MenuItem>
        </Select>
      </FormControl>
    </Fragment>
  )
}
export default ClothesCategory;