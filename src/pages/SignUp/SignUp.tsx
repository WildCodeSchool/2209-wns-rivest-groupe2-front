import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

/* --------------------MUTATION-------------------- */
const CREATE_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    createUser(email: $email, password: $password)
  }
`;

/* --------------------INTERFACE-------------------- */
interface ISignUp {
  email: string;
  password: string;
}

/* --------------------YUP-------------------- */
const schema = yup
  .object({
    email: yup
      .string()
      .email('Please enter a valid email.')
      .required('Please enter an email.'),
    password: yup.string().required('Please enter a password.'),
    // .matches(
    //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?\\"()\\[\]-]{8,25}$/,
    //   'Should have one uppercase letter, one lowercase letter, one number. Should have min 8 and max 25 characters.'
    // ),
  })
  .required();

const SignUp = () => {
  
  const navigate = useNavigate();

  const [signUp, { error }] = useMutation(CREATE_USER, {
    onCompleted(data: { createUser: string }) {
      localStorage.setItem('token', data.createUser);
      navigate('/');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ISignUp> = async (fields) => {
    signUp({
      variables: {
        email: fields.email,
        password: fields.password,
      },
    });
  };

  return (
    <>
      <div className="bg-blue-900 h-screen w-screen">
        <div className="text-black w-full h-full flex flex-col justify-center items-center bg-primary-dark">
          <div className="row-span-2 col-span-1 relative w-3/4 md:w-1/2 lg:w-2/5">
            <div className="bg-slate-800 rounded-lg px-6 py-4 mx-auto lg:mt-0 z-10 flex flex-col items-center lg:w-4/5">
              <span className="box-sizing:border-box;display:inline-block;overflow:hidden;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0;position:relative;max-width:100%"></span>
              <p className="font-secondary font-normal text-xsm text-center text-gray-500 my-2">
                Sign up with
              </p>
              <div className="flex items-center my-4 space-x-8 w-full">
                <hr className="grow w-full h-px bg-gray-500 border-none" />
                <div className="text-gray-500 text-center text-xsm">or</div>
                <hr className="grow w-full h-px bg-gray-500 border-none" />
              </div>
              <div className="text-gray-500 text-center text-xsm mb-6">
                Create Account
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="w-full p-3">
                <div className="flex flex-col mb-6">
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    placeholder="E-mail"
                    className="rounded bg-white text-white bg-opacity-5 px-3 py-2 sm:mt-0 w-full focus:outline-none text-sm "
                  />
                  {errors.email && (
                    <span className="text-sm text-red-600">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col mb-6">
                  <input
                    type="password"
                    id="password"
                    {...register('password')}
                    placeholder="Password"
                    className="font-secondary rounded bg-white text-white bg-opacity-5 px-3 py-2 sm:mt-0 w-full focus:outline-none text-sm "
                  />
                  {errors.password && (
                    <span className="text-sm text-red-600">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col mb-5">
                  <button
                    type="submit"
                    className="bg-green-600 rounded-sm w-full font-secondary text-white text-[1rem] text-center font-semibold h-10 mt-2"
                  >
                    CREATE ACCOUNT
                  </button>
                  <div className="font-light text-xs text-white font-secondary leading-140 text-center mt-5 text-light px-2 opacity-80 w-full">
                    Already have an CityGuide account ?
                    <br />
                    <Link
                      to="/signin"
                      className="underline underline-offset-2 text-[#2EA44F]"
                    >
                      Sign In
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
