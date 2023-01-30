import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { useEffect } from "react";

export function ProfileInfoCard({ title, description, details, action, onChange, isEditMode}) {
  const onSubmit = () =>{
    console.log('lol encore')
  }

  useEffect(()=>{
    console.log(isEditMode)
  },[isEditMode])
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
          <form onSubmit={onSubmit}>  
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
                    <input name={el} defaultValue={(details[el])} onChange={(e)=>{
                      e.target.value
                    }}/>
                  </Typography>
                ) : (
                  details[el]
                  )}
              </li>
            ))}
            
          </ul>
          </form>
        )}
      </CardBody>
    </Card>
  );
}

ProfileInfoCard.defaultProps = {
  action: null,
  description: null,
  details: {},
  onChange: ()=>{},
  isEditMode: false,
  onSubmit: ()=>{},
};

ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.node,
  isEditMode: PropTypes.bool,
  details: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

ProfileInfoCard.displayName = "/src/widgets/cards/profile-info-card.jsx";

export default ProfileInfoCard;
