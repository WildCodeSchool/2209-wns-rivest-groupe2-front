import PostImage from './PostImage';
import UpdateImage from './UpdateImage';

interface IPropsImageHandler {
  type: 'avatar' | 'poi';
  imgUrl?: string | null | undefined;
  updateBackendUrlImg: (imgUrl: string | null) => Promise<any>;
  lastPoiId: number | null;
}

const ImageHandler = ({
  type,
  imgUrl,
  updateBackendUrlImg,
  lastPoiId,
}: IPropsImageHandler) => {
  const dataFilename = imgUrl ? imgUrl.split('/').at(-1) : null;
  const poiId = lastPoiId ? lastPoiId + 1 : null;
  const url = urlAPI(type, dataFilename, poiId);

  function urlAPI(
    type: 'avatar' | 'poi',
    filename: string | undefined | null,
    poiId: number | null
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
        postUrl = `/upload/pois/${poiId}`;
        updateUrl = `/update/pois/${poiId}/${filename}`;
        deleteUrl = `/delete/pois/${poiId}/${filename}`;
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
