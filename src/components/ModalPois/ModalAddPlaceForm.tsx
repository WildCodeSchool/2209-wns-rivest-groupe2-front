import React, { ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import ImageHandler from '../ImageHandler';
import { ImagesProps } from 'src/types/POIType';

type ModalAddPlaceFormProps = {
  setOpenModalHours: React.Dispatch<React.SetStateAction<boolean>>;
  handleImageChange: (event: any) => void;
  selectedImage: ImagesProps[];
  dataImage: string[] | [];
  resetImage: (id: number) => void;
  deleteImg: (imgUrl: string) => Promise<void>;
};

const ModalAddPlaceForm = (props: ModalAddPlaceFormProps): ReactElement => {
  const {
    setOpenModalHours,
    handleImageChange,
    selectedImage,
    dataImage,
    resetImage,
    deleteImg,
  } = props;

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
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
        <ErrorMessage
          errors={errors}
          name="name"
          render={({ message }) => (
            <p className="text-red-400 p-1 mb-4">{message}</p>
          )}
        />
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
        <ErrorMessage
          errors={errors}
          name="type"
          render={({ message }) => (
            <p className="text-red-400 p-1 mb-4">{message}</p>
          )}
        />
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
        <ErrorMessage
          errors={errors}
          name="address"
          render={({ message }) => (
            <p className="text-red-400 p-1 mb-4">{message}</p>
          )}
        />
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
        <ErrorMessage
          errors={errors}
          name="postal"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => (
              <p key={type} className="text-red-400 p-1 mb-4">
                {message}
              </p>
            ))
          }
        />
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
        <ErrorMessage
          errors={errors}
          name="city"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => (
              <p key={type} className="text-red-400 p-1 mb-4">
                {message}
              </p>
            ))
          }
        />
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
          type="url"
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
        <ErrorMessage
          errors={errors}
          name="websiteURL"
          render={({ message }) => (
            <p className="text-red-400 p-1 mb-4">{message}</p>
          )}
        />
      )}
      <div className="py-[4px]">
        <ImageHandler
          handleImageChange={handleImageChange}
          images={selectedImage}
          dataImg={dataImage}
          reset={resetImage}
          type="poi"
          deleteImg={deleteImg}
        />
      </div>
    </>
  );
};

export default ModalAddPlaceForm;
