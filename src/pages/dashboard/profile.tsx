import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
} from '@material-tailwind/react';
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { ProfileInfoCard } from '../../widgets/cards/profile-info-card';
import { MessageCard } from '../../widgets/cards/message-card';
import { platformSettingsData } from '../../data/platform-settings-data';
import { conversationsData } from '../../data/conversations-data';
import { projectsData } from '../../data/projects-data';
import { UserContext } from 'src/contexts/userContext';
import { useContext, useState } from 'react';



export function Profile() {
  const { user } = useContext(UserContext)
  const [isEditMode, setIsEditMode] = useState(false)


  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src="/img/bruce-mars.jpeg"
                alt="bruce-mars"
                size="xl"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {user && user.firstname}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  Eclaireur
                </Typography>
              </div>
            </div>
{/*             <div className="w-96">
              <Tabs value="app">
                <TabsHeader>
                  <Tab value="app">
                    <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    App
                  </Tab>
                  <Tab value="message">
                    <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                    Message
                  </Tab>
                  <Tab value="settings">
                    <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Settings
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div> */}
          </div>
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 xl:grid-cols-3">
       {/*      <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Platform Settings
              </Typography>
              <div className="flex flex-col gap-12">
                {platformSettingsData.map(({ title, options }) => (
                  <div key={title}>
                    <Typography className="mb-4 block text-xs font-semibold uppercase text-blue-gray-500">
                      {title}
                    </Typography>
                    <div className="flex flex-col gap-6">
                      {options.map(({ checked, label }) => (
                        <Switch
                          key={label}
                          id={label}
                          label={label}
                          defaultChecked={checked}
                          labelProps={{
                            className: 'text-sm font-normal text-blue-gray-500',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
            <ProfileInfoCard
              title="Profile Information"
              description={user?.description ? user.description : 'Please enter a description'}
              details={{
                'firstname': user ? user.firstname : 'undefined',
                'lastname' : user ? user.lastname : 'undefined',
                'email': user ? user.email : 'undefined',
/*                 'social': (
                  <div className="flex items-center gap-4">
                    <i className="fa-brands fa-facebook text-blue-700" />
                    <i className="fa-brands fa-twitter text-blue-400" />
                    <i className="fa-brands fa-instagram text-purple-500" />
                  </div>
                ),  */
              }}
              action={
                <Tooltip content="Edit Profile">
                  <button type='submit' form='userForm' value="Update" onClick={()=>{
           
                    if (isEditMode === false){
                      setIsEditMode(!isEditMode)
                    }         
                    if (isEditMode === true){
                      document.body.style.cursor = 'wait';
                      setTimeout(() => {
                        console.log("2 seconds have passed");
                        document.body.style.cursor = 'default';
                        setIsEditMode(!isEditMode)
                      }, 2000);
                    }
                    console.log(`EditMode is ${isEditMode===true? 'ON.' : 'OFF.'}`)}}>
                  {isEditMode===false ?  (<PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />) 
                  : 
                  (<div className="border-2 px-2 text-blue-gray-500">Save</div>)}
                  </button>
                </Tooltip>
              }
              isEditMode={isEditMode}
            />
            {/* <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Platform Settings
              </Typography>
              <ul className="flex flex-col gap-6">
                {conversationsData.map((props) => (
                  <MessageCard
                    key={props.name}
                    {...props}
                    action={
                      <Button variant="text" size="sm">
                        reply
                      </Button>
                    }
                  />
                ))}
              </ul>
            </div> */}
                      <div className="px-4 pb-4 xl:col-span-2">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Point of interests - Recently visited
            </Typography>
{/*             <Typography
              variant="small"
              className="font-normal text-blue-gray-500"
            >
              Places recently visited
            </Typography> */}
            <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
              {projectsData.map(
                ({ img, title, description, tag, route, members }) => (
                  <Card key={title} color="transparent" shadow={false}>
                    <CardHeader
                      floated={false}
                      color="gray"
                      className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                    >
                      <img
                        src={img}
                        alt={title}
                        className="h-full w-full object-cover"
                      />
                    </CardHeader>
                    <CardBody className="py-0 px-1">
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        {tag}
                      </Typography>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mt-1 mb-2"
                      >
                        {title}
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        {description}
                      </Typography>
                    </CardBody>
                    <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                      <Link to={route}>
                        <Button variant="outlined" size="sm">
                          view project
                        </Button>
                      </Link>
                      <div>
                        {members.map(({ img, name }, key) => (
                          <Tooltip key={name} content={name}>
                            <Avatar
                              src={img}
                              alt={name}
                              size="xs"
                              variant="circular"
                              className={`cursor-pointer border-2 border-white ${
                                key === 0 ? '' : '-ml-2.5'
                              }`}
                            />
                          </Tooltip>
                        ))}
                      </div>
                    </CardFooter>
                  </Card>
                )
              )}
            </div>
          </div>
          </div>

        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
