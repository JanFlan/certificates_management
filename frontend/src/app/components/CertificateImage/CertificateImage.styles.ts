import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles<Theme>((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    padding: theme.spacing(3),
    borderRadius: 12,
    border: '2px solid #ddd',
    boxShadow: '3',
    maxWidth: '100%',
    overflow: 'hidden',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: 12,
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

export default useStyles;
