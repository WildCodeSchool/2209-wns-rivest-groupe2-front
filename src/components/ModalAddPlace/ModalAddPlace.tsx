import { useContext, useEffect, useState } from 'react';
import ModalHours from './ModalHours';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import axios from 'axios';
import { map } from 'lodash';
import type { IFormInput, IDataFromApi } from 'src/types/POIType';
import { GET_POI_QUERY } from 'src/services/queries/POIqueries';
import { UserContext } from 'src/contexts/userContext';
import { BsFillCameraFill } from 'react-icons/bs';
import { CREATE_POI_MUTATION } from 'src/services/mutations/POIMutations';

const defaultDays = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false,
};

const ModalAddPlace = ({ setOpenModalAddPlace }: any) => {
  const { user } = useContext(UserContext);
  const [openModalHours, setOpenModalHours] = useState(false);
  const [dataFromApi, setDataFromApi] = useState<IDataFromApi>();
  const [selectedDays, setSelectedDays] = useState(defaultDays);
  const methods = useForm<IFormInput>();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = methods;

  const options = {
    method: 'GET',
    url: 'https://address-from-to-latitude-longitude.p.rapidapi.com/geolocationapi',
    params: {
      address:
        getValues('address') && getValues('postal') && getValues('city')
          ? getValues('address') +
            ' ' +
            getValues('postal') +
            ' ' +
            getValues('city')
          : '',
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_GEOCODING_ACCESS_KEY,
      'X-RapidAPI-Host': process.env.REACT_APP_GEOCODING_ACCESS_HOST,
    },
  };

  useEffect(() => {
    if (options.params.address && options.params.address.length > 0) {
      try {
        axios.request(options).then((response) => {
          setDataFromApi(response.data.Results[0]);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [options.params.address]);

  const [createPoi] = useMutation(CREATE_POI_MUTATION, {
    context: {
      headers: {
        authorization: `Bearer ${user?.id}`,
      },
    },
    refetchQueries: [{ query: GET_POI_QUERY }, 'getAllPoi'],
  });

  const onSubmit: SubmitHandler<IFormInput> = (formData) => {
    const coordinatesGPS = dataFromApi && [
      dataFromApi.latitude,
      dataFromApi.longitude,
    ];

    const daysOpenToSend = map(selectedDays, (value, key) => {
      if (value) return key;
      return;
    }).filter((value) => value !== undefined);

    createPoi({
      variables: {
        data: {
          name: formData.name,
          address: formData.address,
          postal: formData.postal,
          type: formData.type,
          coordinates: coordinatesGPS,
          websiteURL: formData.websiteURL,
          description: formData.description,
          city: formData.city,
          daysOpen: daysOpenToSend,
          hoursOpen:
            formData.firstHoursOpen && formData.secondHoursOpen
              ? [formData.firstHoursOpen, formData.secondHoursOpen]
              : formData.firstHoursOpen && !formData.secondHoursOpen
              ? [formData.firstHoursOpen]
              : '',
          hoursClose:
            formData.firstHoursClose && formData.secondHoursClose
              ? [formData.firstHoursClose, formData.secondHoursClose]
              : formData.firstHoursClose && !formData.secondHoursClose
              ? [formData.firstHoursClose]
              : '',
        },
      },
    });

    alert("Point d'intérêt créé avec succès");
    reset();
    setOpenModalAddPlace(false);
  };

  return (
    <div
      className="mt-7 ml-4 border-2 rounded-md"
      style={{
        position: 'absolute',
        top: '180px',
        left: '25%',
        height: '65%',
        width: '50%',
        backgroundColor: 'white',
      }}
    >
      <div
        className="bg-opalblue border"
        style={{
          borderTopLeftRadius: '6px',
          borderTopRightRadius: '6px',
          color: 'white',
          textAlign: 'center',
          height: '10%',
        }}
      >
        <h2 className="pt-4 text-center text-xl font-bold">Ajouter un lieu</h2>
      </div>
      <div style={{ height: '90%', width: '100%', overflowY: 'auto' }}>
        <FormProvider {...methods}>
          <form
            className="flex flex-col w-[90%] mx-[5%]"
            onSubmit={handleSubmit(onSubmit)}
          >
            {openModalHours ? (
              <ModalHours
                setOpenModalHours={setOpenModalHours}
                selectedDays={selectedDays}
                setSelectedDays={setSelectedDays}
              />
            ) : (
              <>
                <label
                  className={
                    errors.name
                      ? 'border-2 rounded-xl h-[50px] px-[15px] py-[4px] mt-4'
                      : 'border-2 rounded-xl h-[50px] px-[15px] py-[4px] my-4'
                  }
                  htmlFor="name"
                >
                  <input
                    type="text"
                    id="name"
                    {...register('name', {
                      required: {
                        value: true,
                        message: 'Le nom du lieu est obligatoire',
                      },
                    })}
                    placeholder="Nom du lieu (obligatoire)*"
                    className="w-full h-full border-none focus:outline-none"
                  />
                </label>
                {errors.name && (
                  <p className="text-red-400 p-1 mb-4">
                    *{errors.name.message}
                  </p>
                )}
                <select
                  {...register('type', {
                    required: {
                      value: true,
                      message: 'La catégorie est obligatoire',
                    },
                  })}
                  className={
                    errors.type
                      ? 'border-2 bg-transparent text-gray-400 rounded-xl h-[50px] px-[15px] py-[4px]'
                      : 'border-2 bg-transparent text-gray-400 rounded-xl h-[50px] px-[15px] py-[4px] mb-4'
                  }
                >
                  <option value="">Catégorie (obligatoire)*</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="fast-food">Fast-Food</option>
                  <option value="bar">Bar</option>
                  <option value="lieu de culte">Eglise</option>
                  <option value="hotel">Hotel</option>
                  <option value="musee">Musée</option>
                </select>
                {errors.type && (
                  <p className="text-red-400 p-1 mb-4">
                    *{errors.type.message}
                  </p>
                )}
                <label
                  htmlFor="address"
                  className={
                    errors.address
                      ? 'border-2 rounded-xl h-[50px] px-[15px] py-[4px]'
                      : 'border-2 rounded-xl h-[50px] px-[15px] py-[4px] mb-4'
                  }
                >
                  <input
                    type="text"
                    {...register('address', {
                      required: {
                        value: true,
                        message: 'Le numéro et le nom de rue sont obligatoires',
                      },
                    })}
                    id="address"
                    placeholder="Numéro et nom de rue (obligatoire)*"
                    className="w-full h-full border-none focus:outline-none"
                  />
                </label>
                {errors.address && (
                  <p className="text-red-400 p-1 mb-4">
                    *{errors.address.message}
                  </p>
                )}
                <label
                  htmlFor="postal"
                  className={
                    errors.postal
                      ? 'border-2 rounded-xl h-[50px] px-[15px] py-[4px]'
                      : 'border-2 rounded-xl h-[50px] px-[15px] py-[4px] mb-4'
                  }
                >
                  <input
                    type="text"
                    {...register('postal', {
                      pattern: {
                        value: /[0-9]/,
                        message: 'Seuls des chiffres sont acceptés',
                      },
                      required: {
                        value: true,
                        message: 'Le code postal est obligatoire',
                      },
                      minLength: {
                        value: 5,
                        message: 'Longueur minimale est de 5',
                      },
                      maxLength: {
                        value: 5,
                        message: 'Longueur maximale est de 5',
                      },
                    })}
                    id="postal"
                    placeholder="Code postal (obligatoire)*"
                    className="w-full h-full border-none focus:outline-none"
                  />
                </label>
                {errors.postal && (
                  <p className="text-red-400 p-1 mb-4">
                    *{errors.postal.message}
                  </p>
                )}
                <label
                  htmlFor="city"
                  className={
                    errors.city
                      ? 'border-2 rounded-xl h-[50px] px-[15px] py-[4px]'
                      : 'border-2 rounded-xl h-[50px] px-[15px] py-[4px] mb-4'
                  }
                >
                  <input
                    type="text"
                    {...register('city', {
                      pattern: {
                        value: /^[a-zA-Z\s]*$/,
                        message: 'Seuls des lettres et espace sont acceptés',
                      },
                      required: {
                        value: true,
                        message: 'La ville est obligatoire',
                      },
                    })}
                    id="city"
                    placeholder="Ville (obligatoire)*"
                    className="w-full h-full border-none focus:outline-none"
                  />
                </label>
                {errors.city && (
                  <p className="text-red-400 p-1 mb-4">
                    *{errors.city.message}
                  </p>
                )}
                <label
                  htmlFor="description"
                  className="border-2 rounded-xl mb-4 px-[15px] py-[4px]"
                >
                  <textarea
                    {...register('description')}
                    id="description"
                    placeholder="Description"
                    className="w-full border-none focus:outline-none"
                    rows={6}
                    cols={30}
                  />
                </label>
                <div
                  onClick={() => setOpenModalHours(true)}
                  className="flex justify-between items-center bg-white w-full h-[50px] px-[15px] py-[4px] mr-[80px] mb-4 border-2 border-gray-500 rounded-xl text-gray-400"
                >
                  <div>Horaires</div>
                  <div>{'>'}</div>
                </div>
                <label
                  htmlFor="website"
                  className={
                    errors.websiteURL
                      ? 'border-2 rounded-xl h-[50px] px-[15px] py-[4px]'
                      : 'border-2 rounded-xl h-[50px] px-[15px] py-[4px] mb-4'
                  }
                >
                  <input
                    type="text"
                    {...register('websiteURL', {
                      pattern: {
                        value:
                          /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                        message: 'Format invalide',
                      },
                    })}
                    id="websiteURL"
                    placeholder="Site web"
                    className="w-full h-full border-none focus:outline-none"
                  />
                </label>
                {errors.websiteURL && (
                  <p className="text-red-400 p-1">
                    *{errors.websiteURL.message}
                  </p>
                )}
                <button
                  type="button"
                  className="h-[50px] w-[200px] text-opalblue px-[15px] py-[4px] flex justify-center items-center mb-4 border-2 border-opalblue rounded-2xl"
                >
                  <BsFillCameraFill width={40} />
                  <p className="pl-2">Ajouter une photo</p>
                </button>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      reset();
                      setOpenModalAddPlace(false);
                    }}
                    className="w-[150px] px-[15px] ml-[5%] py-2 mb-4 rounded-3xl border-2 bg-gray-500 hover:bg-white font-secondary text-white hover:text-gray-400 text-[1rem] text-center font-semibold mt-2"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="w-[150px] px-[15px] ml-[5%] py-2 mb-4 rounded-3xl border-2 bg-gradient-to-r from-opalblue to-opalblue hover:from-opalblue hover:to-blue-500 font-secondary text-white text-[1rem] text-center font-semibold mt-2"
                  >
                    Envoyer
                  </button>
                </div>
              </>
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ModalAddPlace;
