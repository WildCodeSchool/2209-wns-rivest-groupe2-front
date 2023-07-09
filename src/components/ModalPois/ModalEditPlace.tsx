import { useEffect, useState } from 'react';
import ModalHours from './ModalHours';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import axios from 'axios';
import type { IFormInput, IPOIData, ImagesProps } from 'src/types/POIType';
import { GET_POI_QUERY } from 'src/services/queries/POIqueries';
import {
  CREATE_POI_MUTATION,
  UPDATE_POI_MUTATION,
  UPDATE_POI_IMG_MUTATION,
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

type ModalEditPlaceProps = {
  openModalEditPlace: boolean;
  setOpenModalEditPlace: React.Dispatch<React.SetStateAction<boolean>>;
  poi: IPOIData;
};

const ModalEditPlace = (props: ModalEditPlaceProps) => {
  const { openModalEditPlace, setOpenModalEditPlace, poi } = props;
  const [openModalHours, setOpenModalHours] = useState(false);
  const [selectedDays, setSelectedDays] =
    useState<DaysOpenProps[]>(defaultDays);
  const [selectedImage, setSelectedImage] = useState<Array<ImagesProps>>([]);
  const [openingHoursData, setOpeningHoursData] = useState<any[] | null>(null);
  const [dataImage, setDataImage] = useState<string[] | []>([]);
  const token = localStorage.getItem('token');
  const image_url = process.env.REACT_APP_IMAGE_URL;

  const methods = useForm<IFormInput>();
  const { handleSubmit, reset, getValues } = methods;

  useEffect(() => {
    reset({
      name: poi.name,
      address: poi.address,
      postal: poi.postal,
      type: poi.type,
      coordinates: poi.coordinates,
      websiteURL: poi.websiteURL,
      description: poi.description,
      city: poi.city,
    });

    for (let i = 0; i < selectedDays.length; i++) {
      const selectedDay = selectedDays[i];
      const dataDay = poi.openingHours.find(
        (day) => day.value === selectedDay.value
      );
      if (dataDay) {
        selectedDay.hoursOpen = dataDay.hoursOpen;
        selectedDay.hoursClose = dataDay.hoursClose;
      }
      if (selectedDay.hoursClose.length > 0) {
        selectedDay.isOpen = true;
      }
    }
    setDataImage(poi.pictureUrl);
  }, []);

  const [updatePoi] = useMutation(UPDATE_POI_MUTATION, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    refetchQueries: [{ query: GET_POI_QUERY }, 'getAllPoi'],
  });

  const [updateCoverImg] = useMutation(UPDATE_POI_MUTATION, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });

  const updateBackendUrlImg = async (
    data: Array<{ status: string; filename: string }>
  ) => {
    try {
      let pictureUrlArray: string[] = [...dataImage];
      data.forEach((element) => {
        pictureUrlArray.push(element.filename);
      });
      setDataImage(pictureUrlArray);
      await updateCoverImg({
        variables: {
          data: {
            id: poi.id,
            pictureUrl: pictureUrlArray,
          },
        },
      });
    } catch (error: any) {
      console.log(error);
      alert(`Erreur lors de la modification de l'image: ${error.message}`);
    }
  };

  const deleteBackendUrlImg = async (imgUrl: string) => {
    try {
      console.log('imgUrl', imgUrl);
      const deletedPictureArray = dataImage.filter(
        (picture) => picture !== imgUrl
      );
      setDataImage(deletedPictureArray);
      await updateCoverImg({
        variables: {
          data: {
            id: poi.id,
            pictureUrl: deletedPictureArray,
          },
        },
      });
    } catch (error: any) {
      console.log(error);
      alert(`Erreur lors de la suppression de l'image: ${error.message}`);
    }
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
      console.log(data);
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

  const deleteImg = async (imgUrl: string) => {
    try {
      await axios.delete(`${image_url}/delete${imgUrl}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await deleteBackendUrlImg(imgUrl);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
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
    try {
      let coordinatesGPS: string[] = [];
      if (poi.address !== formData.address) {
        const responseCoordinates = await axios.request(options);
        const dataFromApi = responseCoordinates.data.Results[0];

        coordinatesGPS = dataFromApi && [
          dataFromApi.latitude,
          dataFromApi.longitude,
        ];
      }
      if (selectedImage.length > 0) {
        await handleImageUpload(poi.id);
      }

      await updatePoi({
        variables: {
          data: {
            id: poi.id,
            name: poi.name !== formData.name ? formData.name : null,
            address: poi.address !== formData.address ? formData.address : null,
            postal: poi.postal !== formData.postal ? formData.postal : null,
            type: poi.type !== formData.type ? formData.type : null,
            coordinates:
              poi.address !== formData.address ? coordinatesGPS : null,
            websiteURL:
              poi.websiteURL !== formData.websiteURL
                ? formData.websiteURL
                : null,
            description:
              poi.description !== formData.description
                ? formData.description
                : null,
            city: poi.city !== formData.city ? formData.city : null,
            openingHours: openingHoursData,
          },
        },
      });
      reset();
      setOpenModalEditPlace(false);
      alert("Point d'intérêt modifié avec succès");
    } catch (error: any) {
      console.log(error);
      alert(
        `Erreur lors de la modification du point d'intérêt: ${error.message}`
      );
    }
  };

  return (
    <Dialog
      open={openModalEditPlace}
      onClose={() => setOpenModalEditPlace(false)}
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
        Modifier les informations du lieu
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
                setOpeningHoursData={setOpeningHoursData}
              />
            ) : (
              <ModalAddPlaceForm
                setOpenModalHours={setOpenModalHours}
                handleImageChange={handleImageChange}
                selectedImage={selectedImage}
                dataImage={dataImage}
                resetImage={resetImage}
                deleteImg={deleteImg}
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
              setOpenModalEditPlace(false);
            }}
          >
            Annuler
          </Button>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            Modifier
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ModalEditPlace;
