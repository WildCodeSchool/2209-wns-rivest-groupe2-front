import { Button, Modal } from 'flowbite-react';
import { useContext, useState } from 'react';
import { IModalRole } from 'src/types/IModal';
import styles from '../styles/popUpMap.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ROLES_CITIES_QUERY } from '../services/queries/roleQueries';
import { USER_ROLE_MUTATION } from '../services/mutations/userRoleMutation';
import { ICity } from 'src/types/ICity';
import { IRole } from 'src/types/IRole';
import { BsBuildingAdd } from 'react-icons/bs';
import { Point } from 'leaflet';
import { CREATE_CITY_MUTATION } from 'src/services/mutations/cityMutations';
import { GET_ALL_CITIES } from 'src/services/queries/cityQueries';
import axios from 'axios';
import { NotificationContext } from 'src/contexts/NotificationsContext';

interface IFormInput {
  name: string;
}

export const ModalCityManager = ({
  header,
  cities,
}: {
  header: string;
  cities: ICity[];
}) => {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };
  const token = localStorage.getItem('token');
  const { setMessage } = useContext(NotificationContext);

  const [createCity] = useMutation(CREATE_CITY_MUTATION, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    refetchQueries: [{ query: GET_ALL_CITIES }],
  });

  const { register, handleSubmit, getValues, reset } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const options = {
      method: 'GET',
      url: 'https://address-from-to-latitude-longitude.p.rapidapi.com/geolocationapi',
      params: {
        address: getValues('name') ? getValues('name') : '',
      },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_GEOCODING_ACCESS_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_GEOCODING_ACCESS_HOST,
      },
    };
    try {
      const responseCoordinates = await axios.request(options);
      const dataFromApi = responseCoordinates.data.Results[0];

      const coordinatesGPS = dataFromApi && [
        dataFromApi.latitude,
        dataFromApi.longitude,
      ];
      await createCity({
        variables: {
          data: {
            name: data.name,
            coordinates: coordinatesGPS,
          },
        },
      });
      reset();
      props.setOpenModal(undefined);
      setMessage({ text: 'Ville créée avec succès', type: 'success' });
    } catch (error: any) {
      console.error(`Erreur lors de la création de la ville: ${error.message}`);
      setMessage({
        text: `Erreur lors de la création de la ville: ${error.message}`,
        type: 'error',
      });
    }
  };

  return (
    <div>
      <div
        onClick={() => {
          props.setOpenModal('default');
        }}
        className="flex items-center btn btn-secondary"
      >
        <BsBuildingAdd />
        <button type="button" className="pl-3">
          Ajouter une ville
        </button>
      </div>

      <Modal
        show={props.openModal === 'default'}
        onClose={() => props.setOpenModal(undefined)}
        className="p-44 h-full w-screen"
      >
        <div>
          <Modal.Header>{header}</Modal.Header>
          <form className="w-full p-3" onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body>
              {cities && cities.length > 0 && (
                <div>
                  <p className="py-3">Liste des villes existantes : </p>
                  <ol className="flex justify-around flex-wrap">
                    {cities.map((city) => (
                      <li className="text-xs font-semibold w-fit text-white bg-blue-gray-600 border rounded-full px-3 py-2 m-1">
                        {city.name}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              <input
                {...register('name', {
                  required: {
                    value: true,
                    message: 'Le nom de la ville est obligatoire',
                  },
                })}
                type="text"
                id="name"
                placeholder="Nom de la ville"
                className="w-[60%] border-2 rounded-xl h-[40px] px-[15px] py-[4px] my-4 focus:outline-none"
              />

              {/* <div className="flex flex-col mb-8">
                <input {...register('userId')} value={userId} hidden />
                <select
                  {...register('role')}
                  defaultValue="select"
                  onChange={handleChange}
                  className="text-lg rounded bg-white border-blue-800 text-black bg-opacity-5 px-3 py-2 sm:mt-0 w-full focus:outline-none mb-4"
                >
                  <option value="select" disabled>
                    Sélectionner un rôle
                  </option>
                  {roles &&
                    roles.map((role: IRole) => (
                      <option key={role.id} value={role.name}>
                        {role.name}
                      </option>
                    ))}
                </select>
                {(selectedRole === 'city_admin' ||
                  selectedRole === 'super_user') && (
                  <select
                    {...register('city')}
                    defaultValue={
                      initialSelectedCity.value.length > 0
                        ? initialSelectedCity.value
                        : 'select'
                    }
                    onChange={(e) => {
                      handleCityChange(e.target.value);
                    }}
                    className="text-lg rounded bg-white border-blue-800 text-black bg-opacity-5 px-3 py-2 sm:mt-0 w-full focus:outline-none mb-4"
                  >
                    <option value="select" disabled>
                      Sélectionner une ville
                    </option>
                    {selectCities &&
                      selectCities.map(
                        (city: { value: string; label: string }, index) => (
                          <option key={index} value={city.value}>
                            {city.value}
                          </option>
                        )
                      )}
                  </select>
                )}
              </div> */}
            </Modal.Body>
            <Modal.Footer>
              <Button
                color="gray"
                onClick={() => {
                  props.setOpenModal(undefined);
                }}
              >
                Annuler
              </Button>
              <Button
                color="gray"
                type="submit"
                onClick={() => props.setOpenModal(undefined)}
              >
                Sauvegarder
              </Button>
            </Modal.Footer>
          </form>
        </div>
      </Modal>
    </div>
  );
};
