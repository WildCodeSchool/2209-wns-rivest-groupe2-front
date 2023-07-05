import { Button, Modal } from 'flowbite-react';
import { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { IModalRole } from 'src/types/IModal';
import styles from '../styles/popUpMap.module.css';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ROLES_CITIES_QUERY } from '../services/queries/roleQueries';
import { USER_ROLE_MUTATION } from '../services/mutations/userRoleMutation';
import { ICity } from 'src/types/ICity';
import { IRole } from 'src/types/IRole';
import { UserContext } from 'src/contexts/userContext';
import { FaCity } from 'react-icons/fa';
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
  console.log('================ data', data);
  const [
    updateUserRole,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(USER_ROLE_MUTATION);
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };

  const roles = data?.getAllRoles;
  const cities = data?.getAllCities;

  const { user: contextUser } = useContext(UserContext);

  console.log('UserContext', contextUser);
  console.log('cities', cities);

  const { register, handleSubmit, control } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log('data.city : ', data.city);
    try {
      const response = await updateUserRole({
        variables: {
          role: data.role,
          userId: data.userId,
          cityName: cityName,
        },
      });
      console.log(response);
    } catch (error) {
      console.error('Error updating user role', error);
    }
  };

  const [selectedRole, setSelectedRole] = useState<string | undefined>();

  //const selectedRole = useRef<string>();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
    //selectedRole.current = event.target.value;
  };
  console.log("selectedRole : ", selectedRole)

  let selectCities =
    cities &&
    cities.map((city: ICity) => ({ value: city.name, label: city.name }));

  const initialSelectedCity = userCities
    ? userCities.map((city) => ({ value: city, label: city }))
    : [];

  const [selectedCity, setSelectedCity] = useState<
    Array<{
      value: string;
      label: string;
    } | null>
  >(initialSelectedCity);

  const handleCityChange = (selectedOption: any) => {
    setSelectedCity(selectedOption);
  };

  const cityName = selectedCity
    ? selectedCity.map((option) => option?.value)
    : [];

  //const cityName = selectedCity ? selectedCity.map(option => option?.value).join(", ") : '';

  // const cityName = selectedCity
  //   ? selectedCity.filter(option => option !== null).map(option => option!.value)
  //   : [];

  return (
    <>
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
        className="h-[100vh] w-screen"
      >
        <div className="my-[50%]">
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
                    roles
                      // .filter((role: any) => {
                      //   return (
                      //     role.name !== userRole &&
                      //     !(
                      //       contextUser?.role === 'city_admin' &&
                      //       role.name === 'admin'
                      //     )
                      //     // ) &&
                      //     // !(
                      //     //   contextUser?.role === 'city_admin' &&
                      //     //   role.name === 'city_admin'
                      //     // )
                      //   );
                      // })
                      .map((role: IRole, key: IRole) => (
                        <option value={role.name}>{role.name}</option>
                      ))}
                </select>
                {/* {selectedRole === 'city_admin' && (
                  <select
                    {...register('city')}
                    placeholder="Email"
                    className="text-lg rounded bg-white border-blue-800 text-black bg-opacity-5 px-3 py-2 sm:mt-0 w-full focus:outline-none"
                  >
                    <option value="" disabled selected>
                      Selectionner une ville
                    </option>
                    {cities &&
                      cities
                        .filter((city: any) => {
                          console.log('city.user : ', city.user);
                          return city.user === null;
                        })
                        .map((city: ICity, key: IRole) => (
                          <option value={city.name}>{city.name}</option>
                        ))}
                  </select>
                )} */}
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
                          field.onChange(value);
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
                type="submit"
                onClick={() => props.setOpenModal(undefined)}
              >
                Sauvegarder
              </Button>
            </Modal.Footer>
          </form>
        </div>
      </Modal>
    </>
  );
};
