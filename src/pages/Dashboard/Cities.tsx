import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from '@material-tailwind/react';
import { authorsTableData } from '../../data/authors-table-data';
import { useQuery } from '@apollo/client';
import { ModalCityManager } from '../../components/ModalCityManager';
import { ICity } from 'src/types/ICity';
import { GET_ALL_CITIES } from 'src/services/queries/cityQueries';
import { BsBuildingAdd } from 'react-icons/bs';

export function Cities() {
  const { loading, error, data } = useQuery(GET_ALL_CITIES);
  const cities: ICity[] = data && data.getAllCities;

  /* const { user: contextUser } = useContext(UserContext); */

  console.log('cities', cities);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    cities && (
      <div>
        <div className="flex justify-end w-[95%]">
          <ModalCityManager
            cities={cities}
            header={'Vous pouvez ajouter une nouvelle ville'}
          />
        </div>
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
                    {[
                      'Ville',
                      "Points d'intérêt",
                      'City_admin',
                      'Super_user',
                    ].map((el) => (
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
                          <div className="flex flex-wrap">
                            {city?.pointOfInterest.map((poi) => (
                              <Typography
                                className="text-xs font-semibold w-fit text-white bg-blue-gray-600 border rounded-full px-3 py-2 m-1"
                                key={poi.id}
                              >
                                {poi.name}
                              </Typography>
                            ))}
                          </div>
                        </td>
                        <td className={className}>
                          {city?.users
                            .filter((user) => user.role.name === 'city_admin')
                            .map((user) => (
                              <Typography
                                className="text-xs font-semibold text-blue-gray-600"
                                key={user.id}
                              >
                                {user.email}
                              </Typography>
                            ))}
                        </td>
                        <td className={className}>
                          {city?.users
                            .filter((user) => user.role.name === 'super_user')
                            .map((user) => (
                              <Typography
                                className="text-xs font-semibold text-blue-gray-600"
                                key={user.id}
                              >
                                {user.email}
                              </Typography>
                            ))}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </div>
      </div>
    )
  );
}

export default Cities;
