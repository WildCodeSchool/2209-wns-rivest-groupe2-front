import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { gql, useLazyQuery } from '@apollo/client';
import { useState, useContext } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { UserContext } from '../../contexts/userContext';
import { ISignIn } from 'src/types/ISignIn';
import signin from '../../asset/img/bg-signin.jpg';
import jwtDecode from 'jwt-decode';
import { IDecodedToken } from 'src/types/ISignUp';
import { SignInForm } from 'src/components/SignInForm';

// // MUTATION APOLLO
// export const GET_TOKEN = gql`
//   query Query($password: String!, $email: String!) {
//     getToken(password: $password, email: $email) {
//       token
//       userFromDB {
//         id
//         email
//         username
//         firstname
//         lastname
//         profilePicture
//       }
//     }
//   }
// `;

// // YUP SCHEMA
// const schema = yup
//   .object({
//     email: yup
//       .string()
//       .email('Please enter a valid email.')
//       .required('Please enter an email.'),
//     password: yup
//       .string()
//       .required('Please enter a password.')
//       .matches(
//         /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?\\"()\\[\]-]{8,25}$/,
//         'Should have one uppercase letter, one lowercase letter, one number. Should have min 8 and max 25 characters.'
//       ),
//   })
//   .required();

const SignIn = () => {
  // // SHOW - HIDE PASSWORD
  // const [passwordShown, setPasswordShown] = useState(false);
  // const handleShowPassword = () => {
  //   setPasswordShown(!passwordShown);
  // };

  // // ADD NAVIGATION TO THE PREVIOUS PAGE
  // const navigate = useNavigate();
  // const { setUser } = useContext(UserContext);

  //   // MUTATION - SUBMISSION
  // const [login] = useLazyQuery(GET_TOKEN, {
  //   onCompleted(data) {
  //     const token = data.getToken.token;
  //     const decodedToken = jwtDecode(token) as IDecodedToken;
  //     const userDataWithRole = {
  //       ...data.getToken.userFromDB,
  //       role: decodedToken.role
  //     };
  //     localStorage.setItem('token', token);
  //     localStorage.setItem('user', JSON.stringify(userDataWithRole));
  //     setUser(userDataWithRole);
  //     navigate(-1)
  //   },
  //   onError(error: any) {
  //     console.log(error);
  //   },
  // });

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<ISignIn>({
  //   resolver: yupResolver(schema),
  // });

  // const onSubmit: SubmitHandler<ISignIn> = async (data: any) => {
  //   login({
  //     variables: data,
  //   });
  // };

  return (
    <>
      <div className="bg-gray-200 h-[90vh] w-screen relative overflow-hidden">
        <div className="text-black w-full h-full flex flex-col justify-center items-center bg-primary-dark">
          <img
            src={signin}
            alt="icon site"
            className="absolute object-cover h-full w-full"
          />
          <div className="row-span-2 col-span-1 relative w-3/4 md:w-2/3 lg:w-1/3">
            <div className="bg-deep-blue rounded-lg px-6 py-6 mx-auto z-10 flex flex-col items-center lg:w-4/5 lg:mb-8 lg:px-12 lg:py-12">
              <span className="box-sizing:border-box;display:inline-block;overflow:hidden;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0;position:relative;max-width:100%"></span>
              <SignInForm />
            </div>
          </div>
          {/* 
          <div className="row-span-2 col-span-1 relative w-3/4 md:w-2/3 lg:w-1/3 ">
            <div className="bg-deep-blue rounded-lg px-6 py-6 mx-auto z-10 flex flex-col items-center lg:w-4/5 lg:mb-8 lg:px-12 lg:py-12">
              <span className="box-sizing:border-box;display:inline-block;overflow:hidden;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0;position:relative;max-width:100%"></span>
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
                    className="text-lg rounded bg-white text-white bg-opacity-5 px-3 py-2 sm:mt-0 w-full focus:outline-none"
                  />
                  {errors.email && (
                    <span className="text-sm text-red-600">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col mb-6 relative">
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
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default SignIn;
