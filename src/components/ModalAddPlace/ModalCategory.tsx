const ModalCategory = ({ setOpenModalCategory }: any) => {
  return (
    <div className="relative mt-7 border-2">
      <h2 className="pt-4 text-center text-xl font-bold">
        Catégories populaires
      </h2>
      <ul className="mx-[5%]">
        <li className="py-2 cursor-pointer hover:bg-gray-100">Restaurant</li>
        <li className="py-2 cursor-pointer hover:bg-gray-100">Fast-Food</li>
        <li className="py-2 cursor-pointer hover:bg-gray-100">Bar</li>
        <li className="py-2 cursor-pointer hover:bg-gray-100">Eglise</li>
        <li className="py-2 cursor-pointer hover:bg-gray-100">Hotel</li>
        <li className="py-2 cursor-pointer hover:bg-gray-100">Musée</li>
      </ul>
      <button
        className="absolute top-0 right-2 text-2xl"
        onClick={() => setOpenModalCategory(false)}
      >
        x
      </button>
    </div>
  );
};

export default ModalCategory;
