import { useState } from 'react';
import ModalHours from './ModalHours';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import axios from 'axios';
import type { IFormInput, IPOIData, ImagesProps } from 'src/types/POIType';
import {
  GET_POI_QUERY,
  GET_POI_QUERY_BY_CITY,
} from 'src/services/queries/POIqueries';
import {
  CREATE_POI_MUTATION,
  UPDATE_POI_MUTATION,
} from 'src/services/mutations/POIMutations';
import { DaysOpenProps } from 'src/types/POIType';
import { defaultDays } from 'src/services/helpers/POIDefaultDays';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import ModalAddPlaceForm from './ModalAddPlaceForm';

type ModalAddPlaceProps = {
  openModalAddPlace: boolean;
  setOpenModalAddPlace: React.Dispatch<React.SetStateAction<boolean>>;
  city: {
    id: number | undefined;
    name: string | undefined;
  };
};

const ModalAddPlace = (props: ModalAddPlaceProps) => {
  const { openModalAddPlace, setOpenModalAddPlace, city } = props;
  const [openModalHours, setOpenModalHours] = useState(false);
  const [selectedDays, setSelectedDays] =
    useState<DaysOpenProps[]>(defaultDays);
  const [selectedImage, setSelectedImage] = useState<Array<ImagesProps>>([]);
  const [dataImage, setDataImage] = useState<string[] | []>([]);
  const token = localStorage.getItem('token');
  const image_url = process.env.REACT_APP_IMAGE_URL;

  const methods = useForm<IFormInput>();
  const { handleSubmit, reset, getValues } = methods;

  const [createPoi] = useMutation(CREATE_POI_MUTATION, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    refetchQueries:
      selectedImage.length === 0
        ? [
            { query: GET_POI_QUERY_BY_CITY, variables: { cityId: city?.id } },
            { query: GET_POI_QUERY },
          ]
        : [],
  });

  const [updatePoi] = useMutation(UPDATE_POI_MUTATION, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    refetchQueries: [
      { query: GET_POI_QUERY_BY_CITY, variables: { cityId: city?.id } },
      { query: GET_POI_QUERY },
    ],
  });

  let pictureUrlArray: string[] = [];

  const updateBackendUrlImg = async (
    data: Array<{ status: string; filename: string }>
  ) => {
    data.forEach((element) => {
      pictureUrlArray.push(element.filename);
    });
    setDataImage(pictureUrlArray);
    return Promise.resolve();
  };

  const handleImageUpload = async (poiId: number) => {
    const formData = new FormData();

    if (selectedImage.length > 0) {
      for (let i = 0; i < selectedImage.length; i++) {
        formData.append(
          'file',
          selectedImage[i].image,
          selectedImage[i].image.name
        );
      }
    }
    const postUrl = `/upload/pois/${poiId}`;
    try {
      const { data } = await axios.post(`${image_url}${postUrl}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await updateBackendUrlImg(data);

      setSelectedImage(
        selectedImage.map((item, i) => ({
          ...item,
          imageUrl: data[i].filename,
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const resetImage = (id: number) => {
    const newImageArray = selectedImage.filter((image) => image.id !== id);
    setSelectedImage(newImageArray);
  };

  const handleImageChange = (event: any) => {
    const filesAmount = event.target.files.length;
    for (let i = 0; i < filesAmount; i++) {
      const image = {
        image: event.target.files[i],
        preview: URL.createObjectURL(event.target.files[i]),
        id: selectedImage.length + i + 1,
        imageUrl: null,
      };
      setSelectedImage((selectedImage) => [...selectedImage, image]);
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    const options = {
      method: 'GET',
      url: 'https://address-from-to-latitude-longitude.p.rapidapi.com/geolocationapi',
      params: {
        address:
          getValues('address') && getValues('postal') && city
            ? getValues('address') + ' ' + getValues('postal') + ' ' + city.name
            : '',
      },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_GEOCODING_ACCESS_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_GEOCODING_ACCESS_HOST,
      },
    };
    try {
      const daysOpen = selectedDays.map((day) => {
        if (!day.isOpen)
          return {
            value: day.value,
            name: day.name,
            hoursOpen: ['Fermé'],
            hoursClose: day.hoursClose,
          };
        return {
          value: day.value,
          name: day.name,
          hoursOpen: day.hoursOpen,
          hoursClose: day.hoursClose,
        };
      });
      const responseCoordinates = await axios.request(options);
      const dataFromApi = responseCoordinates.data.Results[0];

      const coordinatesGPS = dataFromApi && [
        dataFromApi.latitude,
        dataFromApi.longitude,
      ];
      const createResponse = await createPoi({
        variables: {
          data: {
            name: formData.name,
            address: formData.address,
            postal: formData.postal,
            type: formData.type,
            coordinates: coordinatesGPS,
            websiteURL: formData.websiteURL,
            description: formData.description,
            city: city,
            openingHours: daysOpen,
          },
        },
      });

      const poiId = createResponse.data.createPoi.id;
      if (selectedImage.length > 0) {
        await handleImageUpload(poiId);
        await updatePoi({
          variables: {
            data: {
              id: poiId,
              pictureUrl: pictureUrlArray,
            },
          },
        });
      }
      reset();
      setOpenModalAddPlace(false);
      alert("Point d'intérêt créé avec succès");
    } catch (error: any) {
      console.log(error);
      alert(`Erreur lors de la création du point d'intérêt: ${error.message}`);
    }
  };

  return (
    <Dialog
      open={openModalAddPlace}
      onClose={() => setOpenModalAddPlace(false)}
      PaperProps={{
        sx: { width: '750px', maxWidth: '1000px' },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: 'center',
          backgroundColor: 'rgb(68, 189, 190)',
          color: 'white',
          marginBottom: '15px',
        }}
      >
        Ajouter un lieu
      </DialogTitle>
      <DialogContent>
        <FormProvider {...methods}>
          <form
            className="flex flex-col w-[90%] mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            {openModalHours ? (
              <ModalHours
                setOpenModalHours={setOpenModalHours}
                selectedDays={selectedDays}
                setSelectedDays={setSelectedDays}
              />
            ) : (
              <ModalAddPlaceForm
                setOpenModalHours={setOpenModalHours}
                handleImageChange={handleImageChange}
                selectedImage={selectedImage}
                dataImage={dataImage}
                resetImage={resetImage}
                city={city}
              />
            )}
          </form>
        </FormProvider>
      </DialogContent>
      {!openModalHours && (
        <DialogActions>
          <Button
            onClick={() => {
              reset();
              setOpenModalAddPlace(false);
            }}
          >
            Annuler
          </Button>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            Ajouter
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ModalAddPlace;
