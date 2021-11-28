import { makeStyles } from '@material-ui/core/styles';

export const useNoContentStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '35px 0px',
    fontWeight: 'bold',
    height: '100%',
    fontSize: '1.3rem',
  },
}));
export default useNoContentStyles;
