import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

interface CustomButtonProps {
  href: string;
  text: string;
}

const CustomButton = ({ href, text }: CustomButtonProps): JSX.Element => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Link
      href={href}
      underline="none"
      sx={{
        mx: 1.5,
        display: 'inline-block',
        fontWeight: 600,
        letterSpacing: 0.5,
        color: isDark ? '#00ffff' : '#333',
        textShadow: isDark
          ? '0 0 5px #00ffff, 0 0 10px #00ffff'
          : '0 0 3px rgba(0,0,0,0.2)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          color: isDark ? '#ffffff' : '#000000',
          textShadow: isDark
            ? '0 0 10px #00ffff, 0 0 20px #00ffff'
            : '0 0 6px rgba(0,0,0,0.4)',
        },
        '&:active': {
          color: isDark ? theme.palette.primary.main : theme.palette.success.dark,
        },
      }}
    >
      {text}
    </Link>
  );
};

export default CustomButton;
