import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { IModalRole } from 'src/types/IModal';
import styles from '../styles/popUpMap.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ROLES_CITIES_QUERY } from '../services/queries/roleQueries';
import { USER_ROLE_MUTATION } from '../services/mutations/userRoleMutation';
import { ICity } from 'src/types/ICity';
import { IRole } from 'src/types/IRole';

interface IFormInput {
  role: string;
  userId: number;
  city: string;
}

export const ModalRoleManager = ({
  header,
  userId,
  userRole,
  userCity,
}: IModalRole) => {
  const { loading, error, data } = useQuery(GET_ROLES_CITIES_QUERY);
  const [updateUserRole] = useMutation(USER_ROLE_MUTATION, {
    refetchQueries: [{ query: GET_ROLES_CITIES_QUERY }],
  });
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };

  const roles = data?.getAllRoles;

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
          cityName: selectedCity,
        },
      });
    } catch (error) {
      console.error('Error updating user role', error);
    }
  };

  // Récupère les villes non assignées et on les tranforme en objet {value / label} pour le dropdown select via la query GET_ROLES_CITIES_QUERY
  let availableCities: ICity[] = data?.getAllCities;
  let selectCities = availableCities?.map((city: ICity) => ({
    value: city.name,
    label: city.name,
  }));

  const initialSelectedCity: {
    value: string;
    label: string;
  } = userCity
    ? { value: userCity, label: userCity }
    : { value: '', label: '' };

  const [selectedCity, setSelectedCity] = useState<string>(
    initialSelectedCity.value
  );

  const handleCityChange = (newSelectedCity: string) => {
    setSelectedCity(newSelectedCity);
  };

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
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => {
          props.setOpenModal('default');
          setSelectedRole(selectedRole);
        }}
      >
        <p className={styles.poiShowDetails}>Editer le rôle</p>
      </div>

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
