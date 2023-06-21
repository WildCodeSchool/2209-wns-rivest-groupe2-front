import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Box, Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EmailSentConfirmationPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/point-of-interest/list');
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Container maxWidth="sm">
      <Box my={4} display="flex" flexDirection="column" alignItems="center">
        <CheckCircleIcon
          color="primary"
          style={{ fontSize: 60, width: '50%' }}
        />
        <Typography variant="h6">
          Un email vous a été envoyé à l'adresse indiquée !
        </Typography>
        <br />
        <Typography variant="h6">
          Vous allez être redirigé(e) sur une page de notre site...
        </Typography>
      </Box>
    </Container>
  );
};

export default EmailSentConfirmationPage;
