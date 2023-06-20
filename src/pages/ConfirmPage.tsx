import { useContext, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { CONFIRM_USER_MUTATION } from 'src/services/mutations/userMutations';
import Typography from '@mui/material/Typography';
import { Box, CircularProgress, Container } from '@mui/material';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { UserContext } from 'src/contexts/userContext';

const ConfirmUserPage = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [confirmUser, { data, loading, error }] = useMutation(
    CONFIRM_USER_MUTATION
  );

  const { setUser } = useContext(UserContext);

  useEffect(() => {
    confirmUser({ variables: { uuid } });
  }, [uuid, confirmUser]);

  useEffect(() => {
    if (data?.confirmUser) {
      setUser(data.confirmUser);
      const timer = setTimeout(() => {
        navigate('/point-of-interest/list');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [data, navigate, setUser]);

  return (
    <Container maxWidth="sm">
      <Box my={4} display="flex" flexDirection="column" alignItems="center">
        {loading && (
          <>
            <CircularProgress />
            <Typography variant="h6">En cours de confirmation...</Typography>
          </>
        )}
        {error && (
          <>
            <ErrorOutlineIcon
              color="error"
              style={{ fontSize: 60, width: '50%' }}
            />
            <Typography variant="h6">Une erreur est survenue...</Typography>
          </>
        )}
        {data?.confirmUser && (
          <>
            <CheckCircleIcon
              color="primary"
              style={{ fontSize: 60, width: '50%' }}
            />
            <Typography variant="h6">Email validé avec succès !</Typography>
            <Typography variant="h6">Bienvenue sur City Guide !</Typography>
            <br />
            <Typography variant="h6">
              Vous allez être redirigé(e) dans 5 secondes...
            </Typography>
          </>
        )}
      </Box>
    </Container>
  );
};

export default ConfirmUserPage;
