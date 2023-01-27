import { useState } from 'react';
import ModalCategory from './ModalCategory';
import ModalHours from './ModalHours';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Point } from 'leaflet';

enum POIType {
  RESTAURANT = 'restaurant',
  PLACEOFRELIGION = 'lieu de culte',
  MUSEUM = 'musée',
}

enum EPriceRange {
  LOW = '$',
  MEDIUM = '$$',
  HIGH = '$$$',
}

type IFormInput = {
  name: string;
  address: string;
  postal: string;
  type: POIType;
  coordinates: Point;
  pictureUrl: string;
  websiteURL: string;
  description: string;
  priceRange: EPriceRange;
  hourOpenMonday: string;
  hourOpenThuesday: string;
  hourOpenWenesday: string;
  hourOpenThursday: string;
  hourOpenFriday: string;
  hourOpenSaturday: string;
  hourOpenSunday: string;
  hourCloseMonday: string;
  hourCloseThuesday: string;
  hourCloseWenesday: string;
  hourCloseThursday: string;
  hourCloseFriday: string;
  hourCloseSaturday: string;
  hourCloseSunday: string;
};

const ModalAddPlace = () => {
  const [openModalCategory, setOpenModalCategory] = useState(false);
  const [openModalHours, setOpenModalHours] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  console.log(openModalCategory);
  if (openModalCategory)
    return <ModalCategory setOpenModalCategory={setOpenModalCategory} />;

  if (openModalHours)
    return <ModalHours setOpenModalHours={setOpenModalHours} />;

  return (
    <div className="mt-7 border-2">
      <h2 className="pt-4 text-center text-xl font-bold">Ajouter un lieu</h2>
      <form
        className="flex flex-col w-[90%] mx-[5%]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label
          className="border-2 rounded-xl h-[50px] px-[15px] py-[4px] my-4"
          htmlFor="name"
        >
          <input
            type="text"
            id="name"
            {...register('name')}
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
            {...register('address')}
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
          htmlFor="website"
          className="border-2 rounded-xl h-[50px] my-4 px-[15px] py-[4px]"
        >
          <input
            type="text"
            {...register('websiteURL')}
            id="websiteURL"
            placeholder="Site web"
            className="w-full h-full"
          />
        </label>
        <button className="h-[50px] px-[15px] py-[4px] my-4 border-2 rounded-2xl text-gray-400">
          Ajouter une photo
        </button>
        <div className="flex justify-end">
          <button className="px-[15px] ml-[5%] py-2 my-4 border-2 rounded-3xl text-gray-400">
            Annuler
          </button>
          <button
            type="submit"
            className="px-[15px] ml-[5%] py-2 my-4 border-2 rounded-3xl text-gray-400"
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalAddPlace;
