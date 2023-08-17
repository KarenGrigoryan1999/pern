import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import AuthForm from '../../components/AuthForm/AuthForm';
import { authSelector } from '../../store/selectors/auth';

function AuthPage() {
  const navigate = useNavigate();
  const { token } = useSelector(authSelector);

  useEffect(() => {
    if (token.toString() !== '') {
      navigate('/');
    }
  }, [token]);

  return <AuthForm />;
}

export default AuthPage;
