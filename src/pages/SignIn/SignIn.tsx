import signin from '../../asset/img/bg-signin.jpg';
import { SignInForm } from 'src/components/SignInForm';

const SignIn = () => {
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
        </div>
      </div>
    </>
  );
};

export default SignIn;
