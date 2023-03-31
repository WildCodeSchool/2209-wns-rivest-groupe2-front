import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_POI_MUTATION } from 'src/services/mutations/POIMutations';
import { GET_POI_QUERY } from 'src/services/queries/POIqueries';
import { UserContext } from 'src/contexts/userContext';

interface IProps {
  id: number;
  name: string;
  setOpenModalDelete: any;
  type: string;
}

export default function ModalConfirmDelete(props: IProps) {
  const { id, name, setOpenModalDelete, type } = props;
  const { user } = useContext(UserContext);
  const [deletePoi] = useMutation(DELETE_POI_MUTATION, {
    context: {
      headers: {
        authorization: `Bearer ${user?.id}`,
      },
    },
    refetchQueries: [{ query: GET_POI_QUERY }, 'getAllPoi'],
  });

  const onDelete = () => {
    deletePoi({ variables: { deletePoiId: id } });
  };

  return (
    <div
      style={{
        zIndex: 3000,
        position: 'absolute',
        top: '40%',
        left: '10%',
        width: '30%',
        height: '30%',
        backgroundColor: 'white',
        borderColor: '#E5E7EB',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div
        className="h-10 bg-opalblue border"
        style={{
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <p className="pt-1 text-lg">Suppression d'un {type}</p>
      </div>
      <p className="px-3">
        Etes-vous sûr de vouloir supprimer le{' '}
        <strong>
          {type} {name}
        </strong>{' '}
        ?
      </p>
      <div className="flex justify-between mx-auto">
        <button
          type="button"
          onClick={() => {
            setOpenModalDelete(false);
          }}
          className="w-[150px] px-[15px] ml-[5%] py-2 mb-4 rounded-3xl border-2 bg-gray-500 hover:bg-white font-secondary text-white hover:text-gray-400 text-[1rem] text-center font-semibold mt-2"
        >
          Annuler
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="w-[150px] px-[15px] ml-[5%] py-2 mb-4 rounded-3xl border-2 bg-gradient-to-r from-opalblue to-opalblue hover:from-opalblue hover:to-blue-500 font-secondary text-white text-[1rem] text-center font-semibold mt-2"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}
