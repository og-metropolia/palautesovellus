import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import routes from '../constants/routes.mjs'

export default function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {'Tekijänoikeudet © '}
      <Link color="inherit" href='/'>
        Palautepomppu
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
