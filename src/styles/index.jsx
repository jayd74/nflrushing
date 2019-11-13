import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  header :{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& h1': {
      color: '#fff'
    }
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: '#0078fd',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#3290fc'
    }
  },
  buttonText: {
    textDecoration: 'none'
  },
  table: {
    backgroundColor: '#000',
    color: '#fff',
    borderColor: '#1e1f21',

    '& .MuiSelect-select:not([multiple]) option, .MuiSelect-select:not([multiple]) optgroup': {
      backgroundColor: '#000',
      color: '#fff'
    }
  },
  tableHeader: {
    backgroundColor: '#1e1f21',
    color: '#f9f9f9',
    border: 'none',
    textTransform: 'uppercase',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: '#0078fd',
    },

    '& .MuiSvgIcon-root': {
      verticalAlign: 'middle'
    }
  }
}));
