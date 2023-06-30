import { useState } from 'react';
import { BiPencil } from 'react-icons/bi';
import ModalUpdateHours from './ModalUpdateHours';
import { DaysOpenProps } from 'src/types/POIType';
import { map, sortBy } from 'lodash';

type ModalHoursProps = {
  setOpenModalHours: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDays: DaysOpenProps[];
  setSelectedDays: React.Dispatch<React.SetStateAction<DaysOpenProps[]>>;
};

const ModalHours = ({
  setOpenModalHours,
  selectedDays,
  setSelectedDays,
}: ModalHoursProps) => {
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
                {selectedDays.map((day: DaysOpenProps) => (
                  <li key={day.value} className="py-2">
                    {day.name}
                  </li>
                ))}
              </ul>
              <div className="flex h-full">
                <ul className="px-3">
                  {selectedDays.map((day: DaysOpenProps) => (
                    <li key={day.value} className="py-2">
                      {day.hoursOpen.length === 0 ? 'Fermé' : day.hoursOpen[0]}
                      {day.hoursClose.length === 0
                        ? ''
                        : ` - ${day.hoursClose[0]}`}
                      {day.hoursOpen.length === 2 &&
                        day.hoursClose.length === 2 &&
                        `, ${day.hoursOpen[1]} - ${day.hoursClose[1]}`}
                    </li>
                  ))}
                </ul>
                <div className="px-3 flex flex-col">
                  {selectedDays.map((day: DaysOpenProps) => (
                    <button
                      key={day.value}
                      type="button"
                      className="py-2 w-[40px] h-[40px] hover:rounded-full hover:bg-gray-200"
                      onClick={() => {
                        setOpenModalUpdateHours(true);
                        setSelectedDays((selectedDays: DaysOpenProps[]) => {
                          const daysOpen = selectedDays.filter(
                            (d) => d.value === day.value
                          );
                          const daysClose = selectedDays.filter(
                            (d) => d.value !== day.value
                          );
                          map(daysOpen, (day) => {
                            day.selected = true;
                            return day;
                          });
                          map(daysClose, (day) => {
                            day.selected = false;
                            return day;
                          });
                          return sortBy([daysOpen, daysClose].flat(), ['id']);
                        });
                      }}
                    >
                      <BiPencil
                        height={30}
                        width={30}
                        style={{ margin: 'auto' }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-evenly mb-4">
              <button
                onClick={() => {
                  setOpenModalUpdateHours(true);
                  setSelectedDays((selectedDays: DaysOpenProps[]) =>
                    map(selectedDays, (day) => {
                      day.selected = true;
                      return day;
                    })
                  );
                }}
                className="p-2 border-2 rounded-2xl bg-gradient-to-r from-opalblue to-opalblue hover:from-opalblue hover:to-blue-500 font-secondary text-white text-[1rem] text-center font-semibold"
              >
                Modifier tous les horaires
              </button>
              <button
                onClick={() => {
                  setOpenModalUpdateHours(true);
                  setSelectedDays((selectedDays: DaysOpenProps[]) => {
                    const daysOpen = selectedDays.filter(
                      (day) =>
                        day.value !== 'saturday' && day.value !== 'sunday'
                    );
                    const daysClose = selectedDays.filter(
                      (day) =>
                        day.value !== 'monday' &&
                        day.value !== 'tuesday' &&
                        day.value !== 'wednesday' &&
                        day.value !== 'thursday' &&
                        day.value !== 'friday'
                    );
                    map(daysOpen, (day) => {
                      day.selected = true;
                      return day;
                    });
                    map(daysClose, (day) => {
                      day.selected = false;
                      return day;
                    });
                    return [daysOpen, daysClose].flat();
                  });
                }}
                className="p-2 border-2 rounded-2xl bg-gradient-to-r from-opalblue to-opalblue hover:from-opalblue hover:to-blue-500 font-secondary text-white text-[1rem] text-center font-semibold"
              >
                Modifier lun.-ven.
              </button>
              <button
                onClick={() => {
                  setOpenModalUpdateHours(true);
                  setSelectedDays((selectedDays: DaysOpenProps[]) => {
                    const daysOpen = selectedDays.filter(
                      (day) =>
                        day.value !== 'monday' &&
                        day.value !== 'tuesday' &&
                        day.value !== 'wednesday' &&
                        day.value !== 'thursday' &&
                        day.value !== 'friday'
                    );
                    const daysClose = selectedDays.filter(
                      (day) =>
                        day.value !== 'saturday' && day.value !== 'sunday'
                    );
                    map(daysOpen, (day) => {
                      day.selected = true;
                      return day;
                    });
                    map(daysClose, (day) => {
                      day.selected = false;
                      return day;
                    });
                    return [daysClose, daysOpen].flat();
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
