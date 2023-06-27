import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IModal } from 'src/types/IModal';
import styles from '../styles/popUpMap.module.css';
import { SignInForm } from './SignInForm';

export const ModalRedirectionAccess = ({ header }:IModal) => {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };

  return (
    <>
      <Link
        style={{ cursor: 'pointer' }}
        onClick={() => props.setOpenModal('default')}
        to={''}
      >
        <p className={styles.poiShowDetails}>Voir plus de détails</p>
      </Link>
      <Modal
        show={props.openModal === 'default'}
        onClose={() => props.setOpenModal(undefined)}
        className="h-[100vh] w-screen"
      >
        <div className="my-[50%]">
          <Modal.Header>
            { header }
          </Modal.Header>
          <Modal.Body className="bg-deep-blue p-20">
            <SignInForm />
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </div>
      </Modal>
    </>
  );
};
