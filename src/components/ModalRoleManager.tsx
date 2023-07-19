import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IModalRole } from 'src/types/IModal';
import styles from '../styles/popUpMap.module.css';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ROLES_CITIES_QUERY } from '../services/queries/roleQueries';
import { USER_ROLE_MUTATION } from '../services/mutations/userRoleMutation';
import { ICity } from 'src/types/ICity';
import { IRole } from 'src/types/IRole';
import Select from 'react-select';

interface IFormInput {
  role: string;
  userId: number;
  city: string;
}

export const ModalRoleManager = ({
  header,
  userId,
  userRole,
  userCities,
}: IModalRole) => {
  const { loading, error, data } = useQuery(GET_ROLES_CITIES_QUERY);
  const [
    updateUserRole,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(USER_ROLE_MUTATION, {
    refetchQueries: [{ query: GET_ROLES_CITIES_QUERY }],
  });
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };

  const roles = data?.getAllRoles;
  const cities = data?.getAllCities;

  // Soumission de formulaire
  const { register, handleSubmit, control } = useForm<IFormInput>({
    defaultValues: {
      role: userRole,
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await updateUserRole({
        variables: {
          role: data.role,
          userId: data.userId,
          cityName: cityName,
        },
      });
    } catch (error) {
      console.error('Error updating user role', error);
    }
  };

  // Récupère les villes non assignées et on les tranforme en objet {value / label} pour le dropdown select via la query GET_ROLES_CITIES_QUERY
  let availableCities = data?.getAllCities.filter((city: ICity) => !city.user);
  let selectCities = availableCities?.map((city: ICity) => ({
    value: city.name,
    label: city.name,
  }));

  // Récupère les villes assignées à un user via les props + handleCityChange pour target le changement de ville via le dropdown select
  const initialSelectedCity = userCities
    ? userCities.map((city) => ({ value: city, label: city }))
    : [];

  const [selectedCity, setSelectedCity] = useState<
    Array<{
      value: string;
      label: string;
    } | null>
  >(initialSelectedCity);

  const handleCityChange = (selectedCity: any) => {
    setSelectedCity(selectedCity);
  };

  // Map selectedCity pour passer l'array dans le onSubmit
  const cityName = selectedCity ? selectedCity.map((city) => city?.value) : [];

  // Récupère userRole via les props + handleChange pour target le changement de role via le dropdown select
  const [selectedRole, setSelectedRole] = useState<string | undefined>(
    userRole
  );
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div>
      <Link
        style={{ cursor: 'pointer' }}
        onClick={() => {
          props.setOpenModal('default');
          setSelectedRole(selectedRole);
        }}
        to={''}
      >
        <p className={styles.poiShowDetails}>Editer le role</p>
      </Link>

      <Modal
        show={props.openModal === 'default'}
        onClose={() => props.setOpenModal(undefined)}
        className="p-44 h-full w-screen"
      >
        <div className="space-y-6">
          <Modal.Header>{header}</Modal.Header>
          <form className="w-full p-3" onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body>
              <div className="flex flex-col mb-8">
                <input {...register('userId')} value={userId} hidden />
                <select
                  {...register('role')}
                  onChange={handleChange}
                  className="text-lg rounded bg-white border-blue-800 text-black bg-opacity-5 px-3 py-2 sm:mt-0 w-full focus:outline-none mb-4"
                >
                  <option value="" disabled selected>
                    Selectionner un role
                  </option>
                  {roles &&
                    roles.map((role: IRole, key: IRole) => (
                      <option key={role.id} value={role.name}>
                        {role.name}
                      </option>
                    ))}
                </select>
                {selectedRole === 'city_admin' && (
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder="Selectionner une ville"
                        options={selectCities}
                        value={selectedCity}
                        onChange={(value) => {
                          handleCityChange(value);
                        }}
                        isMulti
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused ? 'blue' : '#2c5282',
                            color: 'black',
                            fontSize: '1.125rem',
                            borderRadius: '0.25rem',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            fontColor: '#000000',
                            padding: '0.2rem',
                            width: '100%',
                            outline: 'none',
                          }),
                          placeholder: (defaultStyles) => {
                            return {
                              ...defaultStyles,
                              color: 'black',
                            };
                          },
                        }}
                      />
                    )}
                  />
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                color="gray"
                onClick={() => {
                  setSelectedRole(selectedRole);
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
