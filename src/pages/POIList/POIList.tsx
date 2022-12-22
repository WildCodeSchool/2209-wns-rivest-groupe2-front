import { useState } from 'react';
import MapModule from '../../components/MapModule';

const POIList = () => {
  return (
    <div>
      <div className="flex justify-evenly">
        <p>Résultats</p>
        <button>Ajouter votre lieu</button>
        <select name="Filtre" id="">
          <option value="Filtre">Filtre</option>
        </select>
        <select name="Filtre" id="">
          <option value="Filtre">Filtre</option>
        </select>
        <select name="Filtre" id="">
          <option value="Filtre">Filtre</option>
        </select>
        <button>Tous les filtres</button>
      </div>
      <div>
        <MapModule />
      </div>
    </div>
  );
};

export default POIList;
