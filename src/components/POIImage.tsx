import { useState } from 'react';

type POIImageProps = {
  backgroundImage: string;
  className?: string;
  height: string;
};

const POIImage = (props: POIImageProps) => {
  const { backgroundImage, className, height } = props;
  const [toggleHover, setToggleHover] = useState<boolean>(false);

  return (
    <div style={{ overflow: 'hidden' }} className={className}>
      <div
        style={{
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: height,
          backgroundImage: backgroundImage,
          border: '1px solid transparent',
          borderRadius: '5px',
          transition: 'all 0.5s ease-in-out',
          transform: toggleHover ? 'scale(1.3)' : 'scale(1)',
        }}
        onMouseEnter={() => setToggleHover(!toggleHover)}
        onMouseLeave={() => setToggleHover(!toggleHover)}
      />
    </div>
  );
};

export default POIImage;
