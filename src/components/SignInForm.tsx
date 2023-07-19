import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { useState, useContext, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { UserContext } from '../contexts/userContext';
import { ISignIn } from 'src/types/ISignIn';
import { GET_TOKEN } from 'src/services/queries/userQueries';

// YUP SCHEMA
const schema = yup
  .object({
    email: yup
      .string()
      .email('Please enter a valid email.')
      .required('Please enter an email.'),
    password: yup
      .string()
      .required('Please enter a password.')
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?\\"()\\[\]-]{8,25}$/,
        'Should have one uppercase letter, one lowercase letter, one number. Should have min 8 and max 25 characters.'
      ),
  })
  .required();

export const SignInForm = () => {
  // SHOW - HIDE PASSWORD
  const [passwordShown, setPasswordShown] = useState(false);
  const [verificationError, setVerificationError] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleShowPassword = () => {
    setPasswordShown(!passwordShown);
  };

  // // ADD NAVIGATION TO THE PREVIOUS PAGE
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  // MUTATION - SUBMISSION
  const [login] = useLazyQuery(GET_TOKEN, {
    onCompleted(data) {
      if (data.getToken.userFromDB.isVerified === false) {
        setVerificationError(true);
      } else {
        localStorage.setItem('token', data.getToken.token);
        localStorage.setItem('user', JSON.stringify(data.getToken.userFromDB));
        setUser(data.getToken.userFromDB);
        navigate(-1);
      }
    },
    onError(error: any) {
      console.log(error);
      setAuthError('Identifiant incorrect');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignIn>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ISignIn> = async (data: any) => {
    login({
      variables: data,
    });
  };

  return (
    <>
      <div className="text-gray-300 font-luckiest tracking-widest text-center text-xl md:text-2xl lg:text-2xl mb-10 mt-6">
        SE CONNECTER
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full p-3">
        <div className="flex flex-col mb-8">
          <input
            type="email"
            id="email"
            {...register('email')}
            placeholder="Email"
            onChange={() => setAuthError('')}
            className="text-lg rounded bg-white text-white bg-opacity-5 px-3 py-2 sm:mt-0 w-full focus:outline-none"
          />
          {errors.email && (
            <span className="text-sm text-red-600">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col mb-6 relative">
          <input
            type={passwordShown ? 'text' : 'password'}
            id="password"
            {...register('password')}
            placeholder="Mot de passe"
            onChange={() => setAuthError('')}
            className="text-lg rounded bg-white text-white bg-opacity-5 px-3 py-2 sm:mt-0 w-full focus:outline-none"
          />
          <i onClick={handleShowPassword} className="absolute top-1/3 right-4">
            {passwordShown ? (
              <FaEye color="#D1D5DB" />
            ) : (
              <FaEyeSlash color="#D1D5DB" />
            )}
          </i>{' '}
          {errors.password && (
            <span className="text-sm text-red-600">
              {errors.password.message}
            </span>
          )}
        </div>
        {verificationError && (
          <div className="text-red-600 mb-4">
            Veuillez confirmer votre email
          </div>
        )}
        {authError && <div className="text-red-600 mb-4">{authError}</div>}
        <div className="flex flex-col mb-6">
          <Link
            to="#"
            className="font-light text-base underline underline-offset-2 text-[#2EA44F]"
          >
            Mot de passe oublié ?
          </Link>
        </div>
        <div className="flex flex-col mb-7">
          <button
            type="submit"
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-sm w-full font-secondary text-white text-[1rem] text-center font-semibold h-10 mt-2"
          >
            CONTINUER
          </button>
          <div className="font-light text-base text-white font-secondary leading-140 text-center mt-8 text-light px-2 opacity-80 w-full">
            Créer votre compte CityGuide !
            <br />
            <Link
              to="/signup"
              className="underline underline-offset-2 text-[#2EA44F]"
            >
              Inscription gratuite
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};
