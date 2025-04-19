import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';

// Material UI Components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';

// Material Icons
import EmailIcon from '@mui/icons-material/Email';
import LocationIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import SendIcon from '@mui/icons-material/Send';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TelegramIcon from '@mui/icons-material/Telegram';
import YouTubeIcon from '@mui/icons-material/YouTube';

// 3D Globe Component
import Globe from 'react-globe.gl';

interface ContactData {
  id: number;
  address: string;
  email: string;
  phone: string;
  latitude: string;
  longitude: string;
}

interface EmailForm {
  name: string;
  email: string;
  message: string;
}

interface PointData {
  lat: number;
  lng: number;
  size?: number;
  color?: string;
}

const Contact = (): JSX.Element => {
  const theme = useTheme();
  const [contact, setContact] = useState<ContactData | null>(null);
  const [emailData, setEmailData] = useState<EmailForm>({
    name: '',
    email: '',
    message: ''
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  
  // Globe states
  const globeRef = useRef<any>();
  const [pointData, setPointData] = useState<PointData[]>([]);
  const [pointColor, setPointColor] = useState<string>('');
  const [pointSize, setPointSize] = useState(0.4);
  const globeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get<ContactData[]>('https://api.pritechvior.co.tz/contact/');
        const contactData = response.data[0];
        setContact(contactData);
        
        setPointData([{
          lat: parseFloat(contactData.latitude),
          lng: parseFloat(contactData.longitude),
          size: 0.5,
        }]);
        
        setPointColor(
          theme.palette.mode === 'dark'
            ? theme.palette.primary.main
            : theme.palette.success.dark
        );
      } catch (error) {
        console.error('Error fetching contact info:', error);
        const fallbackData = {
          id: 1,
          address: 'Tanzania Mbeya',
          email: 'info@pritechvior.co.tz',
          phone: '+255 627 147 681',
          latitude: '-8.937770',
          longitude: '33.401050'
        };
        setContact(fallbackData);
        setPointData([{
          lat: parseFloat(fallbackData.latitude),
          lng: parseFloat(fallbackData.longitude),
          size: 0.5,
        }]);
      }
    };

    fetchContact();
  }, [theme.palette]);

  useEffect(() => {
    if (globeRef.current && contact) {
      globeRef.current.pointOfView(
        {
          lat: parseFloat(contact.latitude),
          lng: parseFloat(contact.longitude),
          altitude: 2,
        },
        1500
      );
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
    }
  }, [contact]);

  // Pulsing point animation
  useEffect(() => {
    let animationFrameId: number;
    let pulseDirection = 1;

    const animatePoint = () => {
      setPointSize(prevSize => {
        const newSize = prevSize + 0.01 * pulseDirection;
        if (newSize > 0.6) pulseDirection = -1;
        if (newSize < 0.4) pulseDirection = 1;
        return newSize;
      });
      animationFrameId = requestAnimationFrame(animatePoint);
    };

    animatePoint();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleSendEmail = () => {
    if (!emailData.name || !emailData.email || !emailData.message) {
      setSnackbarMessage('Please fill all fields');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    setSnackbarMessage('Message sent successfully!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
    setEmailData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEmailData(prev => ({ ...prev, [name]: value }));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (!contact) return <div>Loading...</div>;

  return (
    <div id='contact'>
      {/* Main Container with relative positioning */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: 'transparent',
        }}
      >
        {/* Globe Background - Scoped to this component only */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            opacity: 0.3,
            pointerEvents: 'none', // Allows clicks to pass through to content
          }}
        >
          <Globe
            ref={globeRef}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            pointsData={pointData}
            pointLat={(d) => (d as PointData).lat}
            pointLng={(d) => (d as PointData).lng}
            pointColor={() => pointColor}
            pointAltitude={() => 0.01}
            pointRadius={() => pointSize}
            width={window.innerWidth}
            height={window.innerHeight}
            onGlobeReady={() => {
              if (globeRef.current) {
                globeRef.current.controls().autoRotate = true;
                globeRef.current.controls().autoRotateSpeed = 0.5;
              }
            }}
          />
        </Box>

        {/* Content Container */}
        <Container
          sx={{
            position: 'relative',
            zIndex: 1,
            py: 8,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
              backdropFilter: 'blur(8px)',
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Box textAlign="center" mb={4}>
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{ fontWeight: 700 }}
              >
                Contact Us
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                We'd love to hear from you
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box mb={4}>
                  <Box
                    component={ListItem}
                    disableGutters
                    sx={{ px: 0, py: 1, alignItems: 'flex-start' }}
                  >
                    <PhoneIcon sx={{ color: theme.palette.primary.main, mr: 2, mt: 0.5 }} />
                    <ListItemText
                      primary="Phone"
                      secondary={contact.phone}
                      primaryTypographyProps={{ fontWeight: 600 }}
                    />
                  </Box>
                  <Box
                    component={ListItem}
                    disableGutters
                    sx={{ px: 0, py: 1, alignItems: 'flex-start' }}
                  >
                    <EmailIcon sx={{ color: theme.palette.primary.main, mr: 2, mt: 0.5 }} />
                    <ListItemText
                      primary="Email"
                      secondary={contact.email}
                      primaryTypographyProps={{ fontWeight: 600 }}
                    />
                  </Box>
                  <Box
                    component={ListItem}
                    disableGutters
                    sx={{ px: 0, py: 1, alignItems: 'flex-start' }}
                  >
                    <LocationIcon sx={{ color: theme.palette.primary.main, mr: 2, mt: 0.5 }} />
                    <ListItemText
                      primary="Address"
                      secondary={contact.address}
                      primaryTypographyProps={{ fontWeight: 600 }}
                    />
                  </Box>
                </Box>

                <Box textAlign="center" mt={4}>
                  <Typography variant="h6" gutterBottom>
                    Follow Us
                  </Typography>
                  <Box display="flex" justifyContent="center" gap={2}>
                    <IconButton
                      href="https://instagram.com/pritechvior"
                      target="_blank"
                      sx={{
                        color: theme.palette.mode === 'dark' ? '#C13584' : '#E1306C',
                        '&:hover': { transform: 'scale(1.2)' },
                        transition: 'transform 0.3s',
                      }}
                    >
                      <InstagramIcon fontSize="large" />
                    </IconButton>
                    <IconButton
                      href="https://linkedin.com/company/pritechvior"
                      target="_blank"
                      sx={{
                        color: theme.palette.mode === 'dark' ? '#0A66C2' : '#0077B5',
                        '&:hover': { transform: 'scale(1.2)' },
                        transition: 'transform 0.3s',
                      }}
                    >
                      <LinkedInIcon fontSize="large" />
                    </IconButton>
                    <IconButton
                      href="https://t.me/pritechvior"
                      target="_blank"
                      sx={{
                        color: theme.palette.mode === 'dark' ? '#0088CC' : '#229ED9',
                        '&:hover': { transform: 'scale(1.2)' },
                        transition: 'transform 0.3s',
                      }}
                    >
                      <TelegramIcon fontSize="large" />
                    </IconButton>
                    <IconButton
                      href="https://youtube.com/pritechvior"
                      target="_blank"
                      sx={{
                        color: theme.palette.mode === 'dark' ? '#FF0000' : '#FF0000',
                        '&:hover': { transform: 'scale(1.2)' },
                        transition: 'transform 0.3s',
                      }}
                    >
                      <YouTubeIcon fontSize="large" />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    backgroundColor: theme.palette.mode === 'dark'
                      ? 'rgba(0, 0, 0, 0.3)'
                      : 'rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 2,
                    p: 3,
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                    Send us a message
                  </Typography>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={emailData.name}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={emailData.email}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    value={emailData.message}
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                    multiline
                    rows={4}
                  />
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={<SendIcon />}
                      onClick={handleSendEmail}
                      sx={{
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 5px 8px 2px rgba(33, 203, 243, .4)',
                        },
                        transition: 'all 0.3s',
                      }}
                    >
                      Send Message
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Contact;