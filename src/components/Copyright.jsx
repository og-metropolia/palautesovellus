import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useTranslation } from 'react-i18next';

export default function Copyright(props) {
  const { t } = useTranslation();

  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {t('copyright.prefix')}
      <Link color="inherit" href="/">
        {t('copyright.name')}
      </Link>{' '}
      {t('copyright.suffix').replace('{YYYY}', new Date().getFullYear())}
    </Typography>
  );
}
