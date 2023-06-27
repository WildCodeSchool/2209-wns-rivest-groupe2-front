import { Button, Modal } from 'flowbite-react';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { IModalRole } from 'src/types/IModal';
import styles from '../styles/popUpMap.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ROLES_CITIES_QUERY } from '../services/queries/roleQueries';
import { USER_ROLE_MUTATION } from '../services/mutations/userRoleMutation';
import { IUser } from 'src/types/IUserContext';
import { IRole } from 'src/types/IRole';
import { UserContext } from 'src/contexts/userContext';

interface IFormInput {
  role: string;
  userId: number;
}

export const ModalRoleManager = ({ header, userId, userRole }: IModalRole) => {
  const { loading, error, data } = useQuery(GET_ROLES_CITIES_QUERY);
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

  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await updateUserRole({
        variables: { role: data.role, userId: data.userId },
      });
      console.log(response);
    } catch (error) {
      console.error('Error updating user role', error);
    }
  };

  const [selectedRole, setSelectedRole] = useState<string | undefined>();
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
  };

  return (
    <>
      <Link
        style={{ cursor: 'pointer' }}
        onClick={() => {
          props.setOpenModal('default');
          setSelectedRole(undefined);
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
                      .filter((role: any) => {
                        return (
                          role.name !== userRole &&
                          !(
                            contextUser?.role === 'city_admin' &&
                            role.name === 'admin'
                          ) &&
                          !(
                            contextUser?.role === 'city_admin' &&
                            role.name === 'city_admin'
                          )
                        );
                      })
                      .map((role: IRole, key: IRole) => (
                        <option value={role.name}>{role.name}</option>
                      ))}
                </select>
                {selectedRole === 'city_admin' && (
                  <select
                    {...register('role')}
                    placeholder="Email"
                    className="text-lg rounded bg-white border-blue-800 text-black bg-opacity-5 px-3 py-2 sm:mt-0 w-full focus:outline-none"
                  >
                    <option value="" disabled selected>
                      Selectionner un role
                    </option>
                    {roles &&
                      roles
                        .filter((role: any) => {
                          return (
                            role.name !== userRole &&
                            !(
                              contextUser?.role === 'city_admin' &&
                              role.name === 'admin'
                            ) &&
                            !(
                              contextUser?.role === 'city_admin' &&
                              role.name === 'city_admin'
                            )
                          );
                        })
                        .map((role: IRole, key: IRole) => (
                          <option value={role.name}>{role.name}</option>
                        ))}
                  </select>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                color="gray"
                onClick={() => {
                  props.setOpenModal(undefined);
                  setSelectedRole(undefined);
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
