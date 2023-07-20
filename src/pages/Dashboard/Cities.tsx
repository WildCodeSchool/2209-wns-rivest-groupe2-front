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
import { ICity } from 'src/types/ICity';
import { GET_ALL_CITIES } from 'src/services/queries/cityQueries';

export function Cities() {
  const { loading, error, data } = useQuery(GET_ALL_CITIES);
  const cities: ICity[] = data && data.getAllCities;

  /* const { user: contextUser } = useContext(UserContext); */

  console.log('cities', cities);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Villes
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {['Ville', "Points d'intérêt", 'City_admin', 'Super_user'].map(
                  (el) => (
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
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {cities.map((city: ICity, key: number) => {
                const className = `py-3 px-5 ${
                  key === authorsTableData.length - 1
                    ? ''
                    : 'border-b border-blue-gray-50'
                }`;
                return (
                  <tr key={city.id}>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="text-xs font-semibold text-blue-gray-600"
                      >
                        {city.name}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {city.coordinates}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {city?.user.role.name === 'city_admin'
                          ? city?.user.email
                          : ''}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {city?.user.role.name === 'city_admin'
                          ? city?.user.email
                          : ''}
                      </Typography>
                    </td>
                    {/* <td className={className}>
                      {user.cities.map((city: ICity, key: number) => (
                        <Typography
                          key={key}
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          {city.name}
                        </Typography>
                      ))}
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
                          userCities={user.cities.map(
                            (city: ICity) => city.name
                          )}
                          header={
                            "Vous pouvez modifier le rôle de l'utilisateur"
                          }
                        />
                      </Typography>
                    </td> */}
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

export default Cities;
