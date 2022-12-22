import image from '../../asset/img/map.png';

const Home = () => {
  return (
    <div className='relative'>
            <div className="w-full bg-cover bg-no-repeat bg-center opacity-25 h-screen overscroll-none relative" style={{ backgroundImage: `url(${image})` }}  >
            </div>
                <div className="flex justify-center items-center bg-white h-28 w-40 p-4 rounded-lg shadow-2xl absolute mx-auto top-0 bottom-0 my-auto left-0 right-0 z-2">
                    {/* <div className="order-first decoration-solid ...">Choissez votre ville</div> */}
                    <select className="w-full content-center p-2.5 text-gray-500  border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                     <option>Paris</option>
                     <option>Lyon</option>
                     <option>Bordeaux</option>
                     <option>Marseille</option>
                    </select>
                </div>
            
      
    </div>
);

};

export default Home;
