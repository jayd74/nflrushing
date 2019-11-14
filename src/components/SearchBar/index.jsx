import React from 'react'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const SearchBar = ({setStats, data}) => {
  const handleSearch = event => {
    // Setting the inputs and results to lowerCase so that the search bar isn't case sensative.
    const searchParams = event.target.value.toLowerCase()
    const results = data.filter(result => {
      const playerName = result["Player"].toLowerCase()
      return playerName.includes(searchParams)
    })

    setStats(results)
  }

  return (
    <CssTextField
      id="standard-search"
      label="Filter players"
      variant="outlined"
      type="search"
      margin="normal"
      onChange={handleSearch}
    />
  )
}

export default SearchBar

const CssTextField = withStyles({
  root: {
    '& .MuiInputLabel-root': {
      color: 'white'
    },
    '& label.Mui-focused': {
      color: '#0078fd',
    },
    '& .MuiOutlinedInput-root': {
      color: 'white',
      width: '275px',
      marginRight: '10px',

      '& fieldset': {
        borderColor: '#0078fd',
      },
      '&:hover fieldset': {
        borderColor: '#0078fd',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#0078fd',
      },
    },
  },
})(TextField);
