import { useState } from 'react';
import ModalCategory from './ModalCategory';
import ModalHours from './ModalHours';

const ModalAddPlace = () => {
  const [openModalCategory, setOpenModalCategory] = useState(false);
  const [openModalHours, setOpenModalHours] = useState(false);

  console.log(openModalCategory);
  if (openModalCategory)
    return <ModalCategory setOpenModalCategory={setOpenModalCategory} />;

  if (openModalHours)
    return <ModalHours setOpenModalHours={setOpenModalHours} />;

  return (
    <div className="mt-7 border-2">
      <h2 className="pt-4 text-center text-xl font-bold">Ajouter un lieu</h2>
      <form className="flex flex-col w-[90%] mx-[5%]">
        <label
          className="border-2 rounded-xl h-[50px] px-[15px] py-[4px] my-4"
          htmlFor="name"
        >
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Nom du lieu (obligatoire)"
            className="w-full h-full"
          />
        </label>
        <div
          onClick={() => setOpenModalCategory(true)}
          className="flex justify-between items-center bg-white w-full h-[50px] px-[15px] py-[4px] mr-[80px] my-4 border-2 rounded-xl text-gray-400"
        >
          <div>Catégorie (obligatoire)</div>
          <div>{'>'}</div>
        </div>
        <label
          htmlFor="address"
          className="border-2 rounded-xl h-[50px] my-4 px-[15px] py-[4px]"
        >
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Adresse (obligatoire)"
            className="w-full h-full"
          />
        </label>
        <div
          onClick={() => setOpenModalHours(true)}
          className="flex justify-between items-center bg-white w-full h-[50px] px-[15px] py-[4px] mr-[80px] my-4 border-2 rounded-xl text-gray-400"
        >
          <div>Horaires</div>
          <div>{'>'}</div>
        </div>
        <label
          htmlFor="phoneNumber"
          className="border-2 rounded-xl h-[50px] my-4 px-[15px] py-[4px]"
        >
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="Numéro de téléphone"
            className="w-full h-full"
          />
        </label>
        <label
          htmlFor="website"
          className="border-2 rounded-xl h-[50px] my-4 px-[15px] py-[4px]"
        >
          <input
            type="text"
            name="website"
            id="website"
            placeholder="Site web"
            className="w-full h-full"
          />
        </label>
      </form>
      <button className="h-[50px] px-[15px] py-[4px] ml-[5%] my-4 border-2 rounded-2xl text-gray-400">
        Ajouter des photos
      </button>
      <div className="flex justify-end mx-[5%]">
        <button className="px-[15px] ml-[5%] py-2 my-4 border-2 rounded-3xl text-gray-400">
          Annuler
        </button>
        <button className="px-[15px] ml-[5%] py-2 my-4 border-2 rounded-3xl text-gray-400">
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default ModalAddPlace;
