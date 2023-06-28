import { Checkbox } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { DaysOpenProps } from './ModalAddPlace';
import { map, sortBy } from 'lodash';

export type ModalHoursProps = {
  setOpenModalUpdateHours: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDays: DaysOpenProps[];
  setSelectedDays: React.Dispatch<React.SetStateAction<DaysOpenProps[]>>;
};

const ModalUpdateHours = ({
  setOpenModalUpdateHours,
  selectedDays,
  setSelectedDays,
}: ModalHoursProps) => {
  const methods = useFormContext();
  const [closedChecked, setClosedChecked] = useState(false);
  const [fullOpenChecked, setFullOpenChecked] = useState(false);
  const [addingNewHours, setAddingNewHours] = useState(false);
  const [manipulateDays, setManipulateDays] =
    useState<DaysOpenProps[]>(selectedDays);
  const [firstHoursOpen, setFirstHoursOpen] = useState<string>('');
  const [secondHoursOpen, setSecondHoursOpen] = useState<string>('');
  const [firstHoursClose, setFirstHoursClose] = useState<string>('');
  const [secondHoursClose, setSecondHoursClose] = useState<string>('');

  useEffect(() => {
    const selectedOpenDays = manipulateDays.filter((d) => d.selected);
    const otherDays = manipulateDays.filter((d) => !d.selected);

    if (fullOpenChecked) {
      const fullOpeningHoursDays = selectedOpenDays.map((d) => {
        return {
          id: d.id,
          value: d.value,
          name: d.name,
          isOpen: true,
          selected: d.selected,
          hoursOpen: ['24h/24'],
          hoursClose: [],
        };
      });
      setManipulateDays(
        sortBy([fullOpeningHoursDays, otherDays].flat(), ['id'])
      );
    } else {
      const notFullOpeningHoursDays = selectedOpenDays.map((d) => {
        return {
          id: d.id,
          value: d.value,
          name: d.name,
          isOpen: false,
          selected: d.selected,
          hoursOpen: [],
          hoursClose: [],
        };
      });
      setManipulateDays(
        sortBy([notFullOpeningHoursDays, otherDays].flat(), ['id'])
      );
    }
  }, [fullOpenChecked]);

  useEffect(() => {
    const selectedOpenDays = manipulateDays.filter((d) => d.selected);
    const otherDays = manipulateDays.filter((d) => !d.selected);

    if (closedChecked) {
      const closedHoursDays = selectedOpenDays.map((d) => {
        return {
          id: d.id,
          value: d.value,
          name: d.name,
          isOpen: false,
          selected: d.selected,
          hoursOpen: [],
          hoursClose: [],
        };
      });
      setManipulateDays(sortBy([closedHoursDays, otherDays].flat(), ['id']));
    }
  }, [closedChecked]);

  useEffect(() => {
    if (!closedChecked && !fullOpenChecked) {
      const daysSelected = manipulateDays.filter((d) => d.selected);
      setFirstHoursOpen(
        daysSelected[0].hoursOpen.length > 0 ? daysSelected[0].hoursOpen[0] : ''
      );
      setSecondHoursOpen(
        daysSelected[0].hoursOpen.length > 1 ? daysSelected[0].hoursOpen[1] : ''
      );
      setFirstHoursClose(
        daysSelected[0].hoursClose.length > 0
          ? daysSelected[0].hoursClose[0]
          : ''
      );
      setSecondHoursClose(
        daysSelected[0].hoursClose.length > 1
          ? daysSelected[0].hoursClose[1]
          : ''
      );
      if (
        daysSelected[0].hoursOpen.length > 1 &&
        daysSelected[0].hoursClose.length > 1
      )
        setAddingNewHours(true);
    }
  }, [closedChecked, fullOpenChecked]);

  useEffect(() => {
    const daysSelected = manipulateDays.filter((d) => d.selected);
    const otherDays = manipulateDays.filter((d) => !d.selected);
    if (
      firstHoursOpen.length > 0 &&
      firstHoursClose.length > 0 &&
      secondHoursOpen.length > 0 &&
      secondHoursClose.length > 0
    ) {
      const openingHoursDays = daysSelected.map((d) => {
        return {
          id: d.id,
          value: d.value,
          name: d.name,
          isOpen: true,
          selected: d.selected,
          hoursOpen: [firstHoursOpen, secondHoursOpen],
          hoursClose: [firstHoursClose, secondHoursClose],
        };
      });
      setManipulateDays(sortBy([openingHoursDays, otherDays].flat(), ['id']));
    } else if (firstHoursOpen.length > 0 && firstHoursClose.length > 0) {
      const openingHoursDays = daysSelected.map((d) => {
        return {
          id: d.id,
          value: d.value,
          name: d.name,
          isOpen: true,
          selected: d.selected,
          hoursOpen: [firstHoursOpen],
          hoursClose: [firstHoursClose],
        };
      });
      setManipulateDays(sortBy([openingHoursDays, otherDays].flat(), ['id']));
    }
  }, [firstHoursOpen, firstHoursClose, secondHoursOpen, secondHoursClose]);

  return (
    <div className="w-[90%] mx-auto">
      <h3 className="py-4 text-center text-xl font-bold">
        Sélectionner des jours et des horaires
      </h3>
      <div className="flex justify-evenly items-center my-4">
        {manipulateDays.map((day: DaysOpenProps) => (
          <button
            key={day.id}
            type="button"
            className={
              day.selected
                ? 'w-[50px] h-[50px] border-2 text-light-blue-400 border-blue-50 rounded-full bg-light-blue-50'
                : 'w-[50px] h-[50px] border-2 rounded-full bg-transparent'
            }
            onClick={() =>
              setManipulateDays((manipulateDays: DaysOpenProps[]) => {
                const newSelectedDays = manipulateDays.filter(
                  (d) => d.value === day.value
                );
                const otherDays = manipulateDays.filter(
                  (d) => d.value !== day.value
                );
                const savedSelectedDays = map(newSelectedDays, (d) => {
                  return {
                    id: d.id,
                    value: d.value,
                    name: d.name,
                    selected: !d.selected,
                    isOpen: d.isOpen,
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
          onChange={() => setFullOpenChecked((prevState) => !prevState)}
        />
        <Checkbox
          label="Fermé"
          checked={closedChecked}
          onChange={() => {
            setClosedChecked(!closedChecked);
          }}
        />
      </div>
      <div>
        {!closedChecked && !fullOpenChecked ? (
          <div className="flex justify-around m-4 relative">
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
                value={firstHoursOpen}
                onChange={(e) => setFirstHoursOpen(e.target.value)}
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
                value={firstHoursClose}
                onChange={(e) => setFirstHoursClose(e.target.value)}
                className="border-2 rounded-xl p-2 px-4 m-2"
              />
            </label>
            {addingNewHours ? null : (
              <button
                className="absolute -right-2 top-4"
                type="button"
                onClick={() => setAddingNewHours(!addingNewHours)}
              >
                +
              </button>
            )}
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
                value={secondHoursOpen}
                onChange={(e) => setSecondHoursOpen(e.target.value)}
                className="border-2 rounded-xl p-2 px-4 m-2"
              />
            </label>
            <div className="relative flex-1">
              <label
                htmlFor="secondHoursClose"
                className="flex flex-col  relative"
              >
                <span className="absolute -top-1 left-4 text-gray-600 bg-white px-2">
                  Heure de fermeture
                </span>
                <input
                  type="time"
                  value={secondHoursClose}
                  onChange={(e) => setSecondHoursClose(e.target.value)}
                  className="border-2 rounded-xl p-2 px-4 m-2"
                />
              </label>
              <button
                className="absolute -right-2 top-4"
                type="button"
                onClick={() => {
                  setAddingNewHours(!addingNewHours);
                  setSecondHoursOpen('');
                  setSecondHoursClose('');
                }}
              >
                -
              </button>
            </div>
          </div>
        )}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              setManipulateDays(selectedDays);
              setOpenModalUpdateHours(false);
            }}
            className="w-[150px] px-[15px] ml-[5%] py-2 mb-4 rounded-3xl border-2 bg-gray-500 hover:bg-white font-secondary text-white hover:text-gray-400 text-[1rem] text-center font-semibold mt-2"
          >
            Annuler
          </button>
          <button
            type="submit"
            onClick={() => {
              setSelectedDays(manipulateDays);
              setOpenModalUpdateHours(false);
            }}
            className="w-[150px] px-[15px] ml-[5%] py-2 mb-4 rounded-3xl border-2 bg-gradient-to-r from-opalblue to-opalblue hover:from-opalblue hover:to-blue-500 font-secondary text-white text-[1rem] text-center font-semibold mt-2"
          >
            Valider
          </button>
        </div>
      </div>
      <button
        className="absolute top-0 right-2 text-2xl"
        onClick={() => {
          setManipulateDays(selectedDays);
          setOpenModalUpdateHours(false);
        }}
      >
        x
      </button>
    </div>
  );
};

export default ModalUpdateHours;
