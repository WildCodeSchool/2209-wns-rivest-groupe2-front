
// import image from "../Home/img/paris-map.png";

const Home = () => {
  return (
    <>
    <div className="w-full flex items-center">
    {/* <div className="bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}> */}
    <div className="box-border flex items-center h-32 w-32 p-4 border-4 shadow-2xl">
        <select className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
            <option>Paris</option>
            <option>Lyon</option>
            <option>Bordeaux</option>
            <option>Marseille</option>
        </select>
    </div>
    {/* </div> */}
    </div>
    </>
);

};

export default Home;
