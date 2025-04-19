import { Link } from 'react-router-dom';

// Material UI
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import CustomButton from '../components/CustomButton';
import logo from '../assets/logo/logo.png';

interface Props {
  onClose: () => void;
  open: boolean;
}

const Sidebar = ({ open, onClose }: Props): JSX.Element => {
  const theme = useTheme();

  return (
    <>
      <Drawer
        anchor='left'
        onClose={() => onClose()}
        open={open}
        variant='temporary'
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.default,
            width: 256,
          },
        }}
      >
        <Box height='100%'>
          <Box width={1} padding={2} display="flex" flexDirection="column" alignItems="center">
            {/* Logo Section */}
            <Link to='/' style={{ textDecoration: 'none' }}>
              <Box width="100%" textAlign="center" marginBottom={3}>
                <img src={logo} alt="Pritech Vior Logo" style={{ width: '150px', height: 'auto' }} />
                <Typography
                  variant='h6'
                  sx={{
                    color: theme.palette.text.primary,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    marginTop: 1,
                  }}
                >
                  Pritech Vior
                </Typography>
              </Box>
            </Link>
          </Box>

          {/* Sidebar Links */}
          <Box paddingX={2}>
            <Box paddingY={2}>
              <CustomButton href='#products' text='Products' />
              <Box paddingY={1}>
                <CustomButton href='#services' text='Services' />
              </Box>
              <Box paddingY={1}>
                <CustomButton href='#pricing' text='Pricing' />
              </Box>
              <Box paddingY={1}>
                <CustomButton href='#about' text='About' />
              </Box>
              <Box paddingY={1}>
                <CustomButton href='#contact' text='Contact' />
              </Box>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
