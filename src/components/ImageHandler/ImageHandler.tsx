import PostImage from './PostImage';
import UpdateImage from './UpdateImage';

interface IPropsImageHandler {
  type: 'avatar' | 'poi';
  imgUrl?: string | null | undefined;
  updateBackendUrlImg: (imgUrl: string | null) => Promise<any>;
}

const ImageHandler = ({
  type,
  imgUrl,
  updateBackendUrlImg,
}: IPropsImageHandler) => {
  const dataFilename = imgUrl ? imgUrl.split('/').at(-1) : null;

  const url = urlAPI(type, dataFilename);

  function urlAPI(
    type: 'avatar' | 'poi',
    filename: string | undefined | null
  ): {
    postUrl: string;
    updateUrl: string;
    deleteUrl: string;
  } {
    let postUrl = '';
    let updateUrl = '';
    let deleteUrl = '';

    switch (type) {
      case 'avatar':
        postUrl = '/upload/avatar';
        updateUrl = `/update-avatar/${filename}`;
        deleteUrl = `/delete/avatars/${filename}`;
        break;
      case 'poi':
        postUrl = '/upload/pois';
        updateUrl = `/update/pois/${filename}`;
        deleteUrl = `/delete/pois/${filename}`;
        break;
    }
    return { postUrl, updateUrl, deleteUrl };
  }

  return dataFilename && imgUrl ? (
    <UpdateImage
      type={type}
      imgUrl={imgUrl}
      updateUrl={url.updateUrl}
      deleteUrl={url.deleteUrl}
      updateBackendUrlImg={updateBackendUrlImg}
    />
  ) : (
    <PostImage
      type={type}
      postUrl={url.postUrl}
      updateBackendUrlImg={updateBackendUrlImg}
    />
  );
};

export default ImageHandler;
