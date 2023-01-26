import { BiPencil } from 'react-icons/bi';

const ModalHours = ({ setOpenModalHours }: any) => {
  return (
    <div className="relative mt-7 border-2">
      <h2 className="py-4 text-center text-xl font-bold">Horaires</h2>
      <div>
        <div className="flex justify-around pb-4">
          <ul>
            <li>Lundi</li>
            <li>Mardi</li>
            <li>Mercredi</li>
            <li>Jeudi</li>
            <li>Vendredi</li>
            <li>Samedi</li>
            <li>Dimanche</li>
          </ul>
          <div className="flex h-full">
            <ul className="px-2">
              <li>Fermé</li>
              <li>Fermé</li>
              <li>Fermé</li>
              <li>Fermé</li>
              <li>Fermé</li>
              <li>Fermé</li>
              <li>Fermé</li>
            </ul>
            <div className="px-2">
              <div className="py-1">
                <BiPencil />
              </div>
              <div className="py-1">
                <BiPencil />
              </div>
              <div className="py-1">
                <BiPencil />
              </div>
              <div className="py-1">
                <BiPencil />
              </div>
              <div className="py-1">
                <BiPencil />
              </div>
              <div className="py-1">
                <BiPencil />
              </div>
              <div className="py-1">
                <BiPencil />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-evenly mb-4">
          <button className="p-2 border-2 border-gray-400 rounded-2xl text-gray-400">
            Modifier tous les horaires
          </button>
          <button className="p-2 border-2 border-gray-400 rounded-2xl text-gray-400">
            Modifier lun.-ven.
          </button>
          <button className="p-2 border-2 border-gray-400 rounded-2xl text-gray-400">
            Modifier sam.-dim.
          </button>
        </div>
      </div>
      <button
        className="absolute top-0 right-2 text-2xl"
        onClick={() => setOpenModalHours(false)}
      >
        x
      </button>
    </div>
  );
};

export default ModalHours;
