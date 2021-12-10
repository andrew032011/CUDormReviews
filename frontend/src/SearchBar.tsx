import { Checkbox, TextField } from '@mui/material';
import { borderRadius, width } from '@mui/system';
import { ChangeEventHandler } from 'react';
import styles from './App.module.css';

type Props = {
  readonly searchQuery: string;
  readonly handleFilterTextChange: (t: string) => void;
}



const SearchBar = ({ searchQuery, handleFilterTextChange, 
}: Props) => {
  return (
    <div>
    <TextField
      sx={{ input: { color:"black"}, border: '2px solid gray', borderRadius: '7px'}}
      style = {{width: "80%"}}
      margin = "normal"
      
      
      type="text"
      placeholder="Search for a dorm..."
      value={searchQuery}
      onChange={(event) => handleFilterTextChange(event.target.value)}
    />
  </div>)
}

export default SearchBar;