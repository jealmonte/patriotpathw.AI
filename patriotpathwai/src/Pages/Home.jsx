import React, { useEffect, useRef } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box 
} from '@mui/material';
import { styled } from '@mui/system';

const StyledAppBar = styled(AppBar)({
  background: 'transparent',
  boxShadow: 'none',
  zIndex: 3,
});

const GradientBackground = styled(Box)({
  background: 'linear-gradient(to bottom, #1a3a2a, #0a0a0a)',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
});

const GridOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
  `,
  backgroundSize: '50px 50px', // Increased from 20px to 50px
  opacity: 1,
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, rgba(26, 42, 58, 0) 0%, rgba(10, 10, 10, 0.8) 100%)',
    pointerEvents: 'none',
  },
});

const ContentContainer = styled(Container)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  color: 'white',
  zIndex: 2,
});

const Title = styled(Typography)({
  fontSize: '4rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
});

const Subtitle = styled(Typography)({
  fontSize: '1.2rem',
  maxWidth: '800px',
  marginBottom: '2rem',
});

const AnimatedDots = styled('canvas')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1,
});

const GetStartedButton = styled(Button)(({ theme }) => ({
  '--color': '#139F59',
  fontFamily: 'inherit',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '8.5em',
  height: '2.6em',
  lineHeight: '2.5em',
  margin: '20px',
  position: 'relative',
  cursor: 'pointer',
  overflow: 'hidden',
  border: `2px solid var(--color)`,
  transition: 'color 0.5s, border-color 0.5s',
  zIndex: 1,
  fontSize: '17px',
  borderRadius: '6px',
  fontWeight: 500,
  color: 'var(--color)',

  '&:before': {
    content: '""',
    position: 'absolute',
    zIndex: -1,
    backgroundColor: 'var(--color)',
    height: '150px',
    width: '200px',
    borderRadius: '50%',
    top: '100%',
    left: '100%',
    transition: 'all 0.7s',
  },

  '&:hover': {
    color: '#fff !important', 
    borderColor: '#139F59 !important', 

    '&:before': {
      top: '-30px',
      left: '-30px',
    },
  },

  '&:active': {
    '&:before': {
      backgroundColor: '#139F59', 
      transition: 'background-color 0s',
    },
  },
}));

const LearnMoreButton = styled(Button)(({ theme }) => ({
  '--color': '#FFCC33',
  fontFamily: 'inherit',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '8.5em',
  height: '2.6em',
  lineHeight: '2.5em',
  margin: '20px',
  position: 'relative',
  cursor: 'pointer',
  overflow: 'hidden',
  border: `2px solid var(--color)`,
  transition: 'color 0.5s',
  zIndex: 1,
  fontSize: '17px',
  borderRadius: '6px',
  fontWeight: 500,
  color: 'var(--color)',
  
  '&:before': {
    content: '""',
    position: 'absolute',
    zIndex: -1,
    backgroundColor: 'var(--color)',
    height: '150px',
    width: '200px',
    borderRadius: '50%',
    top: '100%',
    left: '100%',
    transition: 'all 0.7s',
  },

  '&:hover': {
    color: '#fff',
    border: `2px solid var(--color) !important`,

    '&:before': {
      top: '-30px',
      left: '-30px',
    },
  },

  '&:active': {
    '&:before': {
      backgroundColor: '#FFCC33',
      transition: 'background-color 0s',
    },
  },
}));

function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();

        particle.y -= particle.speed;

        if (particle.y + particle.radius < 0) {
          particle.y = canvas.height + particle.radius;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleLogin = () => {
    window.location.href = 'https://59746679014.propelauthtest.com/login';
  };

  const handleSignUp = () => {
    window.location.href = 'https://59746679014.propelauthtest.com/signup';
  };

  return (
    <GradientBackground>
      <GridOverlay />
      <AnimatedDots ref={canvasRef} />
      <StyledAppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 , letterSpacing: 3}}>
            PatriotPath
          </Typography>
          <Button color="inherit">Features</Button>
          <Button color="inherit">About</Button>
          <Button color="inherit">Contact</Button>
          <Button color="inherit" variant="outlined" sx={{ ml: 2 }} onClick={handleLogin}>
            Login
          </Button>
          <Button color="inherit" variant="outlined" sx={{ ml: 2 }} onClick={handleSignUp}>
            Sign Up
          </Button>
        </Toolbar>
      </StyledAppBar>
      <ContentContainer>
        <Typography variant="h3">
          Unleash the power of career planning with
        </Typography>
        <Title variant='h1' style={{letterSpacing: 4}}>
          PatriotPath
        </Title>
        <Subtitle variant="h2" color='#D3D3D3'>
          Say goodbye to the outdated career planning tools. Every student and career professional,
          regardless of the background, can now take control of their own careers. Simple.
          Intuitive. Effective.
        </Subtitle>
        <Box>
          <GetStartedButton>
            Get Started
          </GetStartedButton>
          <LearnMoreButton>
            Learn More
          </LearnMoreButton>
        </Box>
      </ContentContainer>
    </GradientBackground>
  );
}

export default Home;
