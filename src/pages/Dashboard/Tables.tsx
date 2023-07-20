import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from '@material-tailwind/react';
import { authorsTableData } from '../../data/authors-table-data';
import { GET_USER_QUERY } from '../../services/queries/userQueries';
import { useQuery } from '@apollo/client';
import { ModalRoleManager } from '../../components/ModalRoleManager';
import { IUser } from 'src/types/UserType';
import { useContext } from 'react';
import { UserContext } from 'src/contexts/userContext';

export function Tables() {
  const { loading, error, data } = useQuery(GET_USER_QUERY);
  const users = data && data.getAllUsers;
  const image_url = process.env.REACT_APP_IMAGE_URL;

  const { user: contextUser } = useContext(UserContext);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Utilisateurs
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {['Utilisateurs', 'Email', 'Role', 'Ville', ''].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users
                .filter(
                  (user: IUser) =>
                    user.role.name !== 'admin' && user.id !== contextUser?.id
                )
                .map((user: IUser, key: number) => {
                  const className = `py-3 px-5 ${
                    key === authorsTableData.length - 1
                      ? ''
                      : 'border-b border-blue-gray-50'
                  }`;
                  return (
                    <tr key={user.id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar
                            src={
                              user.profilePicture &&
                              user.profilePicture.length > 0
                                ? `${image_url}${user.profilePicture}`
                                : '/img/image-de-lutilisateur.png'
                            }
                            alt={''}
                            size="sm"
                          />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {user.username}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {user?.firstname} {user?.lastname}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {user.email}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {user.role.name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {user?.city?.name || ''}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          <ModalRoleManager
                            userId={user.id}
                            userRole={user.role.name}
                            userCity={user?.city?.name}
                            header={
                              "Vous pouvez modifier le rôle de l'utilisateur"
                            }
                          />
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Tables;
