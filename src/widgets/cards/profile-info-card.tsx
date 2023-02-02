import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { UserContext } from "src/contexts/userContext";

interface Props {
  title: string;
  description?: React.ReactNode;
  details: any;
  action?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isEditMode?: boolean;
  onSubmit?: (formData: any) => void;
}

const defaultProps: Props = {
  title: '',
  action: null,
  description: null,
  details: {},
  onChange: () => {},
  isEditMode: false,
  onSubmit: () => {},
};

export const ProfileInfoCard: React.FC<Props> = ({ title, description, details, action, onChange, isEditMode} = defaultProps) => {

  
  const { user, setUser } = useContext(UserContext)
  const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($data: UpdateUserInput!) {
    updateUser(data: $data) {
      id
      email
      username
      type
      firstname
      lastname
      hashedPassword
      profilePicture
    }
  }
`;

  const { register, formState, /* {error}, */ handleSubmit} = useForm()
  const [updateUserMutation, { data/* , updateError */ }] = useMutation(UPDATE_USER_MUTATION, {
    variables: { data: {}  },
    onCompleted: (data) => {
      setUser(data.updateUser);
    }
  });


  const onSubmit = (formData: {}) =>{
    if (user && isEditMode){
      updateUserMutation({ variables: { data: { ...formData, id: user.id } } });
    }

    console.log(formData)

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
      <CardBody className="p-0">
        {description && (
          <Typography
            variant="small"
            className="font-normal text-blue-gray-500"
          >
            {description}
          </Typography>
        )}
        {description && details ? (
          <hr className="my-8 border-blue-gray-50" />
        ) : null}
        {details && isEditMode === false ? (
          <ul className="flex flex-col gap-4 p-0">
            {Object.keys(details).map((el, key) => (
              <li key={key} className="flex items-center gap-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold capitalize"
                >
                  {el}:
                </Typography>
                {typeof details[el] === "string" ? (
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-500"
                  >
                    {details[el]}
                  </Typography>
                ) : (
                  details[el]
                )}
              </li>
            ))}
            
          </ul>
        ) : (
          <form id='userForm' onSubmit={handleSubmit(onSubmit)}>  
          <ul className="flex flex-col gap-4 p-0">
            {Object.keys(details).map((el, key) => (
              <li key={key} className="flex items-center gap-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold capitalize"
                  >
                  {el}:
                </Typography>
        
                  <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                  >
                    <input {...register(el, {required: true})} className='w-full min-w-full border-2'  defaultValue={(details[el])} onChange={(e)=>{
                      e.target.value
                    }}/>
                  </Typography>
              </li>
            ))}
            
          </ul>
          </form>
        )}
      </CardBody>
    </Card>
  );
}


ProfileInfoCard.displayName = "/src/widgets/cards/profile-info-card.jsx";

export default ProfileInfoCard;
