import image from '../../asset/img/map.png';

const Home = () => {
  return (
    <div>
        <div className="flex items-center">
            <div className="w-full bg-gradient-to-t bg-cover bg-center opacity-1 h-80" style={{ backgroundImage: `url(${image})` }}>
                <div className="m-40 flex justify-center items-center opacity-100 bg-slate-300 h-28 w-32 p-4 rounded-lg shadow-2xl">
                    {/* <div className="order-first decoration-solid ...">Choissez votre ville</div> */}
                    <select className="w-full content-center p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                     <option>Paris</option>
                     <option>Lyon</option>
                     <option>Bordeaux</option>
                     <option>Marseille</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
);

};

export default Home;
