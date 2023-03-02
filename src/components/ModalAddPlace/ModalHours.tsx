import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { BiPencil } from 'react-icons/bi';
import ModalUpdateHours from './ModalUpdateHours';

const ModalHours = ({
  setOpenModalHours,
  selectedDays,
  setSelectedDays,
}: any) => {
  const methods = useFormContext();
  const [openModalUpdateHours, setOpenModalUpdateHours] = useState(false);

  return (
    <div className="relative mt-7 h-[100%]">
      {openModalUpdateHours ? (
        <ModalUpdateHours
          setOpenModalUpdateHours={setOpenModalUpdateHours}
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
        />
      ) : (
        <>
          <h3 className="py-4 text-center text-xl font-bold">Horaires</h3>
          <div>
            <div className="flex justify-around pb-6">
              <ul>
                <li className="py-2">Lundi</li>
                <li className="py-2">Mardi</li>
                <li className="py-2">Mercredi</li>
                <li className="py-2">Jeudi</li>
                <li className="py-2">Vendredi</li>
                <li className="py-2">Samedi</li>
                <li className="py-2">Dimanche</li>
              </ul>
              <div className="flex h-full">
                <ul className="px-3">
                  <li className="py-2">
                    {selectedDays.monday &&
                    methods.getValues('firstHoursOpen') !== undefined
                      ? `${methods.getValues(
                          'firstHoursOpen'
                        )} - ${methods.getValues('firstHoursClose')}`
                      : 'Fermé'}
                    {selectedDays.monday &&
                    methods.getValues('secondHoursOpen') !== undefined
                      ? `, ${methods.getValues(
                          'secondHoursOpen'
                        )} - ${methods.getValues('secondHoursClose')}`
                      : null}
                  </li>
                  <li className="py-2">
                    {selectedDays.tuesday &&
                    methods.getValues('firstHoursOpen') !== undefined
                      ? `${methods.getValues(
                          'firstHoursOpen'
                        )} - ${methods.getValues('firstHoursClose')}`
                      : 'Fermé'}
                    {selectedDays.tuesday &&
                    methods.getValues('secondHoursOpen') !== undefined
                      ? `, ${methods.getValues(
                          'secondHoursOpen'
                        )} - ${methods.getValues('secondHoursClose')}`
                      : null}
                  </li>
                  <li className="py-2">
                    {selectedDays.wednesday &&
                    methods.getValues('firstHoursOpen') !== undefined
                      ? `${methods.getValues(
                          'firstHoursOpen'
                        )} - ${methods.getValues('firstHoursClose')}`
                      : 'Fermé'}
                    {selectedDays.wednesday &&
                    methods.getValues('secondHoursOpen') !== undefined
                      ? `, ${methods.getValues(
                          'secondHoursOpen'
                        )} - ${methods.getValues('secondHoursClose')}`
                      : null}
                  </li>
                  <li className="py-2">
                    {selectedDays.thursday &&
                    methods.getValues('firstHoursOpen') !== undefined
                      ? `${methods.getValues(
                          'firstHoursOpen'
                        )} - ${methods.getValues('firstHoursClose')}`
                      : 'Fermé'}
                    {selectedDays.thursday &&
                    methods.getValues('secondHoursOpen') !== undefined
                      ? `, ${methods.getValues(
                          'secondHoursOpen'
                        )} - ${methods.getValues('secondHoursClose')}`
                      : null}
                  </li>
                  <li className="py-2">
                    {selectedDays.friday &&
                    methods.getValues('firstHoursOpen') !== undefined
                      ? `${methods.getValues(
                          'firstHoursOpen'
                        )} - ${methods.getValues('firstHoursClose')}`
                      : 'Fermé'}
                    {selectedDays.friday &&
                    methods.getValues('secondHoursOpen') !== undefined
                      ? `, ${methods.getValues(
                          'secondHoursOpen'
                        )} - ${methods.getValues('secondHoursClose')}`
                      : null}
                  </li>
                  <li className="py-2">
                    {selectedDays.saturday &&
                    methods.getValues('firstHoursOpen') !== undefined
                      ? `${methods.getValues(
                          'firstHoursOpen'
                        )} - ${methods.getValues('firstHoursClose')}`
                      : 'Fermé'}
                    {selectedDays.saturday &&
                    methods.getValues('secondHoursOpen') !== undefined
                      ? `, ${methods.getValues(
                          'secondHoursOpen'
                        )} - ${methods.getValues('secondHoursClose')}`
                      : null}
                  </li>
                  <li className="py-2">
                    {selectedDays.sunday &&
                    methods.getValues('firstHoursOpen') !== undefined
                      ? `${methods.getValues(
                          'firstHoursOpen'
                        )} - ${methods.getValues('firstHoursClose')}`
                      : 'Fermé'}
                    {selectedDays.sunday &&
                    methods.getValues('secondHoursOpen') !== undefined
                      ? `, ${methods.getValues(
                          'secondHoursOpen'
                        )} - ${methods.getValues('secondHoursClose')}`
                      : null}
                  </li>
                </ul>
                <div className="px-3 flex flex-col">
                  <button
                    type="button"
                    className="py-2 w-[40px] h-[40px] hover:rounded-full hover:bg-gray-200"
                    onClick={() => {
                      setOpenModalUpdateHours(true);
                      setSelectedDays({ ...selectedDays, monday: true });
                    }}
                  >
                    <BiPencil
                      height={30}
                      width={30}
                      style={{ margin: 'auto' }}
                    />
                  </button>
                  <button
                    type="button"
                    className="py-2 w-[40px] h-[40px] hover:rounded-full hover:bg-gray-200"
                    onClick={() => {
                      setOpenModalUpdateHours(true);
                      setSelectedDays({ ...selectedDays, tuesday: true });
                    }}
                  >
                    <BiPencil
                      height={30}
                      width={30}
                      style={{ margin: 'auto' }}
                    />
                  </button>
                  <button
                    type="button"
                    className="py-2 w-[40px] h-[40px] hover:rounded-full hover:bg-gray-200"
                    onClick={() => {
                      setOpenModalUpdateHours(true);
                      setSelectedDays({ ...selectedDays, wednesday: true });
                    }}
                  >
                    <BiPencil
                      height={30}
                      width={30}
                      style={{ margin: 'auto' }}
                    />
                  </button>
                  <button
                    type="button"
                    className="py-2 w-[40px] h-[40px] hover:rounded-full hover:bg-gray-200"
                    onClick={() => {
                      setOpenModalUpdateHours(true);
                      setSelectedDays({ ...selectedDays, thursday: true });
                    }}
                  >
                    <BiPencil
                      height={30}
                      width={30}
                      style={{ margin: 'auto' }}
                    />
                  </button>
                  <button
                    type="button"
                    className="py-2 w-[40px] h-[40px] hover:rounded-full hover:bg-gray-200"
                    onClick={() => {
                      setOpenModalUpdateHours(true);
                      setSelectedDays({ ...selectedDays, friday: true });
                    }}
                  >
                    <BiPencil
                      height={30}
                      width={30}
                      style={{ margin: 'auto' }}
                    />
                  </button>
                  <button
                    type="button"
                    className="py-2 w-[40px] h-[40px] hover:rounded-full hover:bg-gray-200"
                    onClick={() => {
                      setOpenModalUpdateHours(true);
                      setSelectedDays({ ...selectedDays, saturday: true });
                    }}
                  >
                    <BiPencil
                      height={30}
                      width={30}
                      style={{ margin: 'auto' }}
                    />
                  </button>
                  <button
                    type="button"
                    className="py-2 w-[40px] h-[40px] hover:rounded-full hover:bg-gray-200"
                    onClick={() => {
                      setOpenModalUpdateHours(true);
                      setSelectedDays({ ...selectedDays, sunday: true });
                    }}
                  >
                    <BiPencil
                      height={30}
                      width={30}
                      style={{ margin: 'auto' }}
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-evenly mb-4">
              <button
                onClick={() => {
                  setOpenModalUpdateHours(true);
                  setSelectedDays({
                    monday: true,
                    tuesday: true,
                    wednesday: true,
                    thursday: true,
                    friday: true,
                    saturday: true,
                    sunday: true,
                  });
                }}
                className="p-2 border-2 rounded-2xl bg-gradient-to-r from-opalblue to-opalblue hover:from-opalblue hover:to-blue-500 font-secondary text-white text-[1rem] text-center font-semibold"
              >
                Modifier tous les horaires
              </button>
              <button
                onClick={() => {
                  setOpenModalUpdateHours(true);
                  setSelectedDays({
                    ...selectedDays,
                    monday: true,
                    tuesday: true,
                    wednesday: true,
                    thursday: true,
                    friday: true,
                  });
                }}
                className="p-2 border-2 rounded-2xl bg-gradient-to-r from-opalblue to-opalblue hover:from-opalblue hover:to-blue-500 font-secondary text-white text-[1rem] text-center font-semibold"
              >
                Modifier lun.-ven.
              </button>
              <button
                onClick={() => {
                  setOpenModalUpdateHours(true);
                  setSelectedDays({
                    ...selectedDays,
                    saturday: true,
                    sunday: true,
                  });
                }}
                className="p-2 border-2 rounded-2xl bg-gradient-to-r from-opalblue to-opalblue hover:from-opalblue hover:to-blue-500 font-secondary text-white text-[1rem] text-center font-semibold"
              >
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
        </>
      )}
    </div>
  );
};

export default ModalHours;
