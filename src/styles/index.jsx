import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
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
  },
  tableHeader: {
    backgroundColor: '#1e1f21',
    color: 'rgba(249, 249, 249, 0.65)',
    border: 'none'
  }
}));
