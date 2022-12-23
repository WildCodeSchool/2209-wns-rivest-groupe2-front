import { ModalForm } from './ModalForm';
import { RxCross2 } from 'react-icons/rx';

interface IModalConnexion {
  open: boolean;
  onClose: React.MouseEventHandler<HTMLDivElement> | undefined;
}

export const ConnexionModal = ({ open, onClose }: IModalConnexion) => {

  if (!open) return null;

  return (
    <>
      <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-70 z-40">
        <div
          onClick={onClose}
          className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center z-50"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="flex flex-col bg-black rounded-lg"
          >
            <button
              onClick={
                onClose as
                  | React.MouseEventHandler<HTMLButtonElement>
                  | undefined
              }
              className="flex justify-end pr-3 pt-3"
            >
              <RxCross2 style={{ color: 'white', fontSize: '20px' }} />
            </button>
            <ModalForm />
          </div>
        </div>
      </div>
      {/* , document.getElementById('portal') */}
    </>
  );
};
