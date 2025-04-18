import { useState, useEffect } from 'react';
import axios from 'axios';

// Material UI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';

import HeroButtons from './HeroButtons';
import Spacer from './Spacer';

interface HeroProps {
  title: number;
  description: string;
}

const Hero = (): JSX.Element => {
  const theme = useTheme();

  const [hero, setHero] = useState<HeroProps[]>([]);

  const fetchHero = () => {
    axios
      .get<HeroProps[]>('https://api.pritechvior.co.tz/hero', {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((response) => {
        setHero(response.data);
      })
      .catch((error) => console.log(error));
  };
// Addded thhe Logic To add the Hero section to the Home  component 

  useEffect(() => {
    fetchHero();
  }, []);

  return (
    <div id='home'>
      <Box
        sx={{
          paddingY: 10,
          paddingX: 2,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        {hero.slice(0, 1).map((item, i) => (
          <Container
            key={i}
            maxWidth='md'
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box marginBottom={2}>
              <Typography
                align='center'
                color={theme.palette.text.primary}
                variant='h3'
                sx={{ fontWeight: 700 }}
                gutterBottom
              >
                {item.title}
              </Typography>
            </Box>
            <Box marginBottom={3}>
              <Typography
                variant='h6'
                component='p'
                color={theme.palette.text.secondary}
                sx={{ fontWeight: 400 }}
              >
                {item.description}
              </Typography>
            </Box>
            <HeroButtons />
          </Container>
        ))}
      </Box>
      <Spacer sx={{ paddingTop: 6 }} />
    </div>
  );
};

export default Hero;
