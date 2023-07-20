import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Tooltip,
} from '@material-tailwind/react';
import { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { UserContext } from 'src/contexts/userContext';
import { IFormUserInput, UserDetailsProps } from 'src/types/UserType';
import { UPDATE_USER } from 'src/services/mutations/userMutations';
import { PencilIcon } from '@heroicons/react/24/solid';

interface Props {
  title: string;
  description?: React.ReactNode;
  details: UserDetailsProps[];
  action?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isEditMode?: boolean;
  onSubmit?: (formData: any) => void;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProfileInfoCard = ({
  title,
  details,
  action,
  isEditMode,
  setIsEditMode,
}: Props) => {
  const { user, setUser } = useContext(UserContext);
  const token = localStorage.getItem('token');

  const { register, handleSubmit } = useForm<IFormUserInput>();

  const [updateUserMutation] = useMutation(UPDATE_USER, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    onCompleted: (data) => {
      setUser(data.updateUser);
      localStorage.setItem('user', JSON.stringify(data.updateUser));
    },
  });

  const onSubmit: SubmitHandler<IFormUserInput> = async (formData) => {
    if (user && isEditMode) {
      try {
        await updateUserMutation({
          variables: {
            data: {
              id: user.id,
              username:
                user.username !== formData.username ? formData.username : null,
              firstname:
                user.firstname !== formData.firstname
                  ? formData.firstname
                  : null,
              lastname:
                user.lastname !== formData.lastname ? formData.lastname : null,
            },
          },
        });
      } catch (error: any) {
        console.log(error);
        alert(`Erreur lors de la modification du profil: ${error.message}`);
      }
    }
  };

  return (
    <Card color="transparent" shadow={false}>
      <CardHeader
        color="transparent"
        shadow={false}
        floated={false}
        className="mx-0 mt-0 mb-4 flex items-center justify-between gap-4"
      >
        <Typography variant="h6" color="blue-gray">
          {title}
        </Typography>
        {action}
      </CardHeader>
      <CardBody className="p-0 relative">
        {!isEditMode && (
          <Tooltip content="Edit Profile">
            <button
              className="absolute right-0 top-0"
              type="button"
              onClick={() => setIsEditMode(!isEditMode)}
            >
              <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
            </button>
          </Tooltip>
        )}
        {details && !isEditMode ? (
          <ul className="flex flex-col gap-4 p-0">
            {details.map((el) => (
              <li key={el.name} className="flex items-center gap-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold"
                >
                  {el.title}:
                </Typography>
                {typeof el.value === 'string' ? (
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-500"
                  >
                    {el.value}
                  </Typography>
                ) : (
                  el.value
                )}
              </li>
            ))}
          </ul>
        ) : (
          <>
            <Tooltip content="Edit Profile">
              <button
                className="absolute right-0 top-0"
                type="submit"
                form="userForm"
                value="Update"
                onClick={() => {
                  document.body.style.cursor = 'wait';
                  setTimeout(() => {
                    document.body.style.cursor = 'default';
                    setIsEditMode(!isEditMode);
                  }, 500);
                }}
              >
                <div className="border-2 px-2 text-blue-gray-500">Save</div>
              </button>
            </Tooltip>
            <form id="userForm" onSubmit={handleSubmit(onSubmit)}>
              <ul className="flex flex-col gap-4 p-0">
                {details.map((el) => (
                  <li key={el.name} className="flex items-center gap-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold capitalize"
                    >
                      {el.name}:
                    </Typography>

                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      <input
                        {...register(el.name)}
                        className="w-full min-w-full border-2"
                        defaultValue={el.value || ''}
                      />
                    </Typography>
                  </li>
                ))}
              </ul>
            </form>
          </>
        )}
      </CardBody>
    </Card>
  );
};

ProfileInfoCard.displayName = '/src/widgets/cards/profile-info-card.jsx';

export default ProfileInfoCard;
