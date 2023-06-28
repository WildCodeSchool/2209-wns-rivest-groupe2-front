import { Checkbox } from '@material-tailwind/react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { DaysOpenProps } from './ModalAddPlace';
import { map, sortBy } from 'lodash';

const ModalUpdateHours = ({
  setOpenModalUpdateHours,
  selectedDays,
  setSelectedDays,
}: any) => {
  const methods = useFormContext();
  const [closedChecked, setClosedChecked] = useState(false);
  const [fullOpenChecked, setFullOpenChecked] = useState(false);
  const [addingNewHours, setAddingNewHours] = useState(false);

  console.log('selectedDays', selectedDays);

  return (
    <div className="w-[90%] mx-auto">
      <h3 className="py-4 text-center text-xl font-bold">
        Sélectionner des jours et des horaires
      </h3>
      <div className="flex justify-evenly items-center my-4">
        {selectedDays.map((day: DaysOpenProps) => (
          <button
            key={day.id}
            type="button"
            className={
              day.isOpen
                ? 'w-[50px] h-[50px] border-2 text-light-blue-400 border-blue-50 rounded-full bg-light-blue-50'
                : 'w-[50px] h-[50px] border-2 rounded-full bg-transparent'
            }
            onClick={() =>
              setSelectedDays((selectedDays: DaysOpenProps[]) => {
                const newSelectedDays = selectedDays.filter(
                  (d) => d.value === day.value
                );
                const otherDays = selectedDays.filter(
                  (d) => d.value !== day.value
                );
                const savedSelectedDays = map(newSelectedDays, (d) => {
                  return {
                    id: d.id,
                    value: d.value,
                    name: d.name,
                    isOpen: !d.isOpen,
                    hoursOpen: d.hoursOpen,
                    hoursClose: d.hoursClose,
                  };
                });
                return sortBy([savedSelectedDays, otherDays].flat(), ['id']);
              })
            }
          >
            {day.name.slice(0, 1)}
          </button>
        ))}
      </div>
      <div className="flex justify-around">
        <Checkbox
          label="Ouvert 24h/24"
          checked={fullOpenChecked}
          onChange={() => setFullOpenChecked(!fullOpenChecked)}
        />
        <Checkbox
          label="Fermé"
          checked={closedChecked}
          onChange={() => {
            setClosedChecked(!closedChecked);
            !closedChecked
              ? methods.setValue('firstHoursOpen', undefined)
              : null;
            !closedChecked
              ? methods.setValue('firstHoursClose', undefined)
              : null;
            !closedChecked
              ? methods.setValue('secondHoursOpen', undefined)
              : null;
            !closedChecked
              ? methods.setValue('secondHoursClose', undefined)
              : null;
          }}
        />
      </div>
      <div>
        {!closedChecked && !fullOpenChecked ? (
          <div className="flex justify-around m-4">
            <label
              htmlFor="firstHoursOpen"
              className="flex flex-col flex-1 relative"
            >
              <span className="absolute -top-1 left-4 text-gray-600 bg-white px-2">
                Heure d'ouverture
              </span>
              <input
                type="time"
                id="firstHoursOpen"
                {...methods.register('firstHoursOpen')}
                className="border-2 rounded-xl p-2 px-4 m-2"
              />
            </label>
            <label
              htmlFor="firstHoursClose"
              className="flex flex-col flex-1 relative"
            >
              <span className="absolute -top-1 left-4 text-gray-600 bg-white px-2">
                Heure de fermeture
              </span>
              <input
                type="time"
                id="firstHoursClose"
                {...methods.register('firstHoursClose')}
                className="border-2 rounded-xl p-2 px-4 m-2"
              />
            </label>
            <button
              type="button"
              onClick={() => setAddingNewHours(!addingNewHours)}
            >
              +
            </button>
          </div>
        ) : null}
        {addingNewHours && (
          <div className="flex justify-around m-4">
            <label
              htmlFor="secondHoursOpen"
              className="flex flex-col flex-1 relative"
            >
              <span className="absolute -top-1 left-4 text-gray-600 bg-white px-2">
                Heure d'ouverture
              </span>
              <input
                type="time"
                id="secondHoursOpen"
                {...methods.register('secondHoursOpen')}
                className="border-2 rounded-xl p-2 px-4 m-2"
              />
            </label>
            <label
              htmlFor="secondHoursClose"
              className="flex flex-col flex-1 relative"
            >
              <span className="absolute -top-1 left-4 text-gray-600 bg-white px-2">
                Heure de fermeture
              </span>
              <input
                type="time"
                id="secondHoursClose"
                {...methods.register('secondHoursClose')}
                className="border-2 rounded-xl p-2 px-4 m-2"
              />
            </label>
          </div>
        )}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              methods.reset();
              setOpenModalUpdateHours(false);
            }}
            className="w-[150px] px-[15px] ml-[5%] py-2 mb-4 rounded-3xl border-2 bg-gray-500 hover:bg-white font-secondary text-white hover:text-gray-400 text-[1rem] text-center font-semibold mt-2"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={() => setOpenModalUpdateHours(false)}
            className="w-[150px] px-[15px] ml-[5%] py-2 mb-4 rounded-3xl border-2 bg-gradient-to-r from-opalblue to-opalblue hover:from-opalblue hover:to-blue-500 font-secondary text-white text-[1rem] text-center font-semibold mt-2"
          >
            Valider
          </button>
        </div>
      </div>
      <button
        className="absolute top-0 right-2 text-2xl"
        onClick={() => {
          methods.reset();
          setOpenModalUpdateHours(false);
        }}
      >
        x
      </button>
    </div>
  );
};

export default ModalUpdateHours;
