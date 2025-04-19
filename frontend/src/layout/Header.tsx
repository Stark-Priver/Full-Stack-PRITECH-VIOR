import { useContext } from 'react';

// MUI Core
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

// MUI Icons
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';

// Custom Components & Context
import CustomButton from '../components/CustomButton';
import ColorModeContext from '../utils/ColorModeContext';

// Logo
import logo from '../assets/logo/logo.png';

interface Props {
  onSidebarOpen: () => void;
}

const Header = ({ onSidebarOpen }: Props): JSX.Element => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const isDark = theme.palette.mode === 'dark';

  return (
    <AppBar
      color="transparent"
      position="sticky"
      sx={{
        top: 0,
        zIndex: 100,
        padding: '10px 0',
        marginBottom: '5px',
        backdropFilter: 'blur(12px)',
        backgroundColor: isDark
          ? alpha(theme.palette.background.default, 0.4)
          : 'rgba(255, 255, 255, 0.5)',
        boxShadow: isDark
          ? '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
          : '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
        border: isDark
          ? '1px solid rgba(255, 255, 255, 0.18)'
          : '1px solid rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar sx={{ minHeight: 70 }}>
        <Link href="/" sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <img
            src={logo}
            alt="Pritech Logo"
            style={{
              height: 40,
              width: 40,
              objectFit: 'contain',
              marginRight: 10,
            }}
          />
          <Typography
            variant="h6"
            sx={{
              display: { xs: 'none', md: 'block' },
              fontWeight: 'bold',
              textTransform: 'uppercase',
              background: 'linear-gradient(45deg, #00ffff, #ff00ff, #00ffcc, #ffcc00)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
              animation: 'shine 8s linear infinite',
              backgroundSize: '400% 400%',
              filter: isDark ? 'drop-shadow(0 0 2px #00ffff)' : 'drop-shadow(0 0 1px #666)',
            }}
          >
            Pritech
          </Typography>
        </Link>

        <Box sx={{ flexGrow: 1 }} />

        <Box
          sx={{
            alignItems: 'center',
            display: { lg: 'flex', md: 'none', xs: 'none' },
          }}
        >
          <CustomButton href="#products" text="Products" />
          <CustomButton href="#services" text="Services" />
          <CustomButton href="#pricing" text="Pricing" />
          <CustomButton href="#about" text="About" />
          <CustomButton href="#contact" text="Contact" />
        </Box>

        <Divider
          orientation="vertical"
          sx={{
            height: 32,
            marginX: 2,
            display: { lg: 'flex', md: 'none', xs: 'none' },
          }}
        />

        <Box sx={{ display: 'flex' }}>
          <IconButton
            onClick={colorMode.toggleColorMode}
            aria-label="Theme Mode"
            color={isDark ? 'warning' : 'default'}
          >
            {isDark ? (
              <Tooltip title="Turn on the light">
                <LightModeIcon fontSize="medium" />
              </Tooltip>
            ) : (
              <Tooltip title="Turn off the light">
                <DarkModeIcon fontSize="medium" />
              </Tooltip>
            )}
          </IconButton>
        </Box>

        <Box sx={{ display: { md: 'block', lg: 'none' } }} alignItems="center">
          <Button
            onClick={onSidebarOpen}
            aria-label="Menu"
            variant="outlined"
            sx={{
              borderRadius: 0,
              minWidth: 'auto',
              padding: 1,
              borderColor: alpha(theme.palette.divider, 0.2),
            }}
          >
            <MenuIcon
              sx={{
                color: isDark ? theme.palette.primary.main : theme.palette.success.dark,
              }}
            />
          </Button>
        </Box>
      </Toolbar>

      {/* Animation for text shine */}
      <style>{`
        @keyframes shine {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </AppBar>
  );
};

export default Header;
