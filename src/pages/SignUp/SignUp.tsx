import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useState, useContext } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { UserContext } from '../../contexts/userContext';
import { ISignUp, IDecodedToken } from 'src/types/ISignUp';
import signup from '../../asset/img/bg-signup.jpg';
import { CREATE_USER } from 'src/services/mutations/userMutations';
// import jwtDecode from 'jwt-decode';

// YUP SCHEMA
const schema = yup.object({
  username: yup
    .string()
    .required('Merci de renseigner un identifiant.')
    .matches(
      /^[aA-zZ\s]+$/,
      `Veuillez n'utiliser que des lettres de l'alphabet.`
    ),

  email: yup
    .string()
    .email('Veuillez renseigner un email valide.')
    .required('Veuillez renseigner un email valide.'),

  password: yup
    .string()
    .required('Veuillez renseigner un mot de passe.')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?\\"()\\[\]-]{8,25}$/,
      'Doit contenir une majuscule, une minuscule, un nombre et au minimum et faire entre 8 et 25 caractères.'
    ),

  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      'Les mots de passe doivent être identiques.'
    )
    .required(),
});

const SignUp = () => {
  // SHOW - HIDE PASSWORD
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordConfirmShown, setPasswordConfirmShown] = useState(false);
  const handleShowPassword = () => {
    setPasswordShown(!passwordShown);
  };
  const handleConfirmShowPassword = () => {
    setPasswordConfirmShown(!passwordConfirmShown);
  };

  const navigate = useNavigate();

  const [signUp] = useMutation(CREATE_USER, {
    onCompleted(data) {
      // const token = data.createUser.token;
      // const decodedToken = jwtDecode(token) as IDecodedToken;
      // const userDataWithRole = {
      //   ...data.createUser.userFromDB,
      //   role: decodedToken.role,
      // };
      localStorage.setItem('token', data.createUser.token);
      localStorage.setItem('user', JSON.stringify(data.createUser.userFromDB));
      // setUser(userDataWithRole);
      navigate('/confirmation-email-sent');
    },
    onError(error: any) {
      console.log(error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ISignUp> = async (fields: {
    username: string;
    email: string;
    password: string;
  }) => {
    signUp({
      variables: {
        username: fields.username,
        email: fields.email,
        password: fields.password,
      },
    });
  };

  return (
    <>
      <div className="bg-blue-900 h-[90vh] w-screen relative">
        <div className="text-black w-full h-full flex flex-col justify-center items-center bg-primary-dark">
          <img
            src={signup}
            alt="icon site"
            className="absolute object-cover h-full w-full"
          />
          <div className="row-span-2 col-span-1 relative w-3/4 md:w-2/3 lg:w-1/3">
            <div className="bg-deep-blue rounded-lg px-6 py-6 mx-auto z-10 flex flex-col items-center lg:w-4/5 lg:mb-8 lg:px-12 lg:py-12">
              <span className="box-sizing:border-box;display:inline-block;overflow:hidden;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0;position:relative;max-width:100%"></span>
              <div className="text-gray-300 font-luckiest tracking-widest text-center text-xl md:text-2xl lg:text-2xl mb-10 mt-6">
                Create Account
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="w-full p-3">
                <div className="flex flex-col mb-8">
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    placeholder="Email"
                    className="text-lg rounded bg-white text-white bg-opacity-5 px-3 py-2 sm:mt-0 w-full focus:outline-none"
                  />
                  {errors.email && (
                    <span className="text-sm text-red-600">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col mb-8 relative">
                  <input
                    type="text"
                    id="username"
                    {...register('username')}
                    placeholder="Identifiant"
                    className="text-lg rounded bg-white text-white bg-opacity-5 px-3 py-2 sm:mt-0 w-full focus:outline-none"
                  />
                  {errors.username && (
                    <span className="text-sm text-red-600">
                      {errors.username.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col mb-8 relative">
                  <input
                    type={passwordShown ? 'text' : 'password'}
                    id="password"
                    {...register('password')}
                    placeholder="Mot de passe"
                    className="text-lg rounded bg-white text-white bg-opacity-5 px-3 py-2 sm:mt-0 w-full focus:outline-none"
                  />
                  <i
                    onClick={handleShowPassword}
                    className="absolute top-1/3 right-4"
                  >
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
                <div className="flex flex-col mb-8 relative">
                  <input
                    type={passwordConfirmShown ? 'text' : 'password'}
                    id="confirmPassword"
                    {...register('confirmPassword')}
                    placeholder="Confirmer le mot de passe"
                    className="text-lg rounded bg-white text-white bg-opacity-5 px-3 py-2 sm:mt-0 w-full focus:outline-none"
                  />
                  {errors.confirmPassword && (
                    <span className="text-sm text-red-600">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                  {}
                  <i
                    onClick={handleConfirmShowPassword}
                    className="absolute top-1/3 right-4"
                  >
                    {passwordConfirmShown ? (
                      <FaEye color="#D1D5DB" />
                    ) : (
                      <FaEyeSlash color="#D1D5DB" />
                    )}
                  </i>
                </div>
                <div className="flex flex-col mb-5">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-sm w-full font-secondary text-white text-[1rem] text-center font-semibold h-10 mt-2"
                  >
                    S'ISNCRIRE
                  </button>
                  <div className="font-light text-base text-white font-secondary leading-140 text-center mt-8 text-light px-2 opacity-80 w-full">
                    Vous avez déjà un compte CityGuide ?
                    <br />
                    <Link
                      to="/signin"
                      className="underline underline-offset-2 text-[#2EA44F]"
                    >
                      Se connecter
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
