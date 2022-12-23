import { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const GET_TOKEN = gql`
  query Query($password: String!, $email: String!) {
    getToken(password: $password, email: $email)
  }
`;

export const ModalForm = () => {

  const [showModal, setShowModal] = useState(true);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [loadToken] = useLazyQuery(GET_TOKEN, {
    variables: {
      email: username,
      password: password,
    },
    onCompleted(data) {
      console.log(data.getToken);
      localStorage.setItem('token', data.getToken);
      navigate('/');
    },
    onError(error) {
      console.log(error);
    },
  });

  return (
    <div>
      {showModal && (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loadToken();
            }}
            className="flex flex-col gap-5 sm:p-28"
          >
            <h2 className="text-slate-50 text-2xl font-medium flex justify-center">
              SIGN IN
            </h2>
            <input
              className="bg-neutral-800 text-slate-50 rounded p-2 w-72 mr-10 ml-10"
              type="text"
              name="Email"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              className="bg-neutral-800 text-slate-50 rounded p-2 w-72 mr-10 ml-10"
              type="Password"
              name="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div className="text-slate-50 text-s flex justify-end mr-10">
              Forgot password ?
            </div>
            <button className="rounded py-2 px-2 w-72 mr-10 ml-10 mb-5 border-transparent bg-red-600 hover:bg-red-800 text-slate-50">
              Sign In
            </button>
            <div className="text-slate-50 text-s flex ml-10 pb-6">
              Don't have an account ?
              <button className="ml-2" onClick={() => setShowModal(false)}>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      )}

      {showModal === false && (
        <div>
          <form className="flex flex-col gap-5 sm:p-28">
            <h2 className="text-slate-50 text-2xl font-medium flex justify-center">
              SIGN UP
            </h2>
            <input
              className=" bg-neutral-800 text-slate-50 rounded p-2 w-72 mr-10 ml-10"
              type="text"
              name="Email"
              placeholder="Email"
            />
            <input
              className="bg-neutral-800 text-slate-50 rounded p-2 w-72 mr-10 ml-10"
              type="Password"
              name="Password"
              placeholder="Create password"
            />
            <input
              className="rounded py-2 px-2 w-72 mr-10 ml-10 mb-5 border-transparent bg-red-600 hover:bg-red-800 text-slate-50"
              type="submit"
              value="Sign Up"
            />
            <div className="text-slate-50 text-s flex ml-10">
              Already an account ?{' '}
              <button className="ml-2" onClick={() => setShowModal(true)}>
                Sign In
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ModalForm;
