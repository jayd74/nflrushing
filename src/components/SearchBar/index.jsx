import React from 'react'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { white } from 'ansi-colors';

const SearchBar = ({setStats, data}) => {

  const handleSearch = event => {
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
      label="Search player"
      variant="outlined"
      type="search"
      margin="normal"
      onChange={handleSearch}
    />
  )
}

export default SearchBar

export const CssTextField = withStyles({
  root: {
    '& .MuiInputLabel-root': {
      color: 'white'
    },
    '& label.Mui-focused': {
      color: '#0078fd',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#0078fd',
    },
    '& .MuiOutlinedInput-root': {
      'color': 'white',

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
