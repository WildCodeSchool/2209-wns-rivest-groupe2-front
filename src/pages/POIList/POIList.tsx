import { useState } from 'react';
import MapModule from '../../components/MapModule';
import { poiData } from 'src/data/poi-data';
import POICard from 'src/components/POICard';
import { Link } from 'react-router-dom';

const POIList = () => {
  const [openModalAddPlace, setOpenModalAddPlace] = useState(false);
  const city = poiData[0].address
    .split(' ')
    .slice(-2, -1)
    .join(' ')
    .split(',')[0];
  const count = poiData.length;

  return (
    <div className="mt-5">
      <div className="flex justify-between mx-5">
        <strong className="py-[5px] pl-[80px]">
          {count} résultat{count > 1 ? 's' : ''} de{' '}
          {poiData[0].type.toUpperCase()} à {city.toUpperCase()}
        </strong>
        <button
          className="px-[15px] py-[4px] mt-2 border-2 rounded-xl"
          onClick={() => setOpenModalAddPlace(true)}
        >
          Ajouter votre lieu
        </button>
        <select
          name="cities"
          id="cities"
          className="bg-white px-[15px] py-[4px] mt-2 border-2 rounded-xl"
        >
          <option value="City">{city}</option>
          <option value="Paris">Paris</option>
          <option value="Lyon">Lyon</option>
          <option value="Marseille">Marseille</option>
          <option value="Bordeaux">Bordeaux</option>
          <option value="Bordeaux">Bordeaux</option>
          <option value="Toulouse">Toulouse</option>
        </select>
        <select
          name="categories"
          id="categories"
          className="bg-white px-[15px] py-[4px] mr-[80px] mt-2 border-2 rounded-xl"
        >
          <option value="Category">{poiData[0].type}</option>
          <option value="restaurant">Restaurant</option>
          <option value="fast-food">Fast-Food</option>
          <option value="bar">Bar</option>
          <option value="surch">Eglise</option>
          <option value="hotel">Hotel</option>
          <option value="museum">Musée</option>
        </select>
      </div>
      <div className="flex pt-5">
        <div className="h-full overflow-auto w-[100%]">
          {openModalAddPlace ? (
            <div className="mt-7 border-2">
              <form className="flex flex-col">
                <select
                  name="categories"
                  id="categories"
                  className="bg-white w-[250px] px-[15px] py-[4px] mr-[80px] mt-2 border-2 rounded-xl"
                >
                  <option value="Categorie">Catégorie</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="fast-food">Fast-Food</option>
                  <option value="bar">Bar</option>
                  <option value="surch">Eglise</option>
                  <option value="hotel">Hotel</option>
                  <option value="museum">Musée</option>
                </select>
                <div className="flex flex-col">
                  <label htmlFor="name">Nom</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="border-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="address">Adresse</label>
                  <textarea
                    name="address"
                    id="address"
                    className="border-2"
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="address">Date/Horaire</label>
                  <div className="w-full flex justify-between">
                    <div>
                      <p className="pt-3 pb-[16px]">Lundi</p>
                      <p className="pb-[16px]">Mardi</p>
                      <p className="pb-[16px]">Mercredi</p>
                      <p className="pb-[16px]">Jeudi</p>
                      <p className="pb-[16px]">Vendredi</p>
                      <p className="pb-[16px]">Samedi</p>
                      <p>Dimanche</p>
                    </div>
                    <div>
                      <select
                        name="openHour"
                        id="openHour"
                        className="bg-white px-[15px] py-[4px] mr-[80px] mt-2 border-2 rounded-xl"
                      >
                        <option value="">Heure d'ouverture</option>
                        <option value="00h00">00h00</option>
                        <option value="01h00">01h00</option>
                        <option value="02h00">02h00</option>
                        <option value="03h00">03h00</option>
                        <option value="04h00">04h00</option>
                        <option value="05h00">05h00</option>
                        <option value="06h00">06h00</option>
                        <option value="07h00">07h00</option>
                        <option value="08h00">08h00</option>
                        <option value="09h00">09h00</option>
                        <option value="10h00">10h00</option>
                        <option value="11h00">11h00</option>
                        <option value="12h00">12h00</option>
                        <option value="13h00">13h00</option>
                        <option value="14h00">14h00</option>
                        <option value="15h00">15h00</option>
                        <option value="16h00">16h00</option>
                        <option value="17h00">17h00</option>
                        <option value="18h00">18h00</option>
                        <option value="19h00">19h00</option>
                        <option value="20h00">20h00</option>
                        <option value="21h00">21h00</option>
                        <option value="22h00">22h00</option>
                        <option value="23h00">23h00</option>
                      </select>
                      <select
                        name="openHour"
                        id="openHour"
                        className="bg-white px-[15px] py-[4px] mr-[80px] mt-2 border-2 rounded-xl"
                      >
                        <option value="">Heure d'ouverture</option>
                        <option value="00h00">00h00</option>
                        <option value="01h00">01h00</option>
                        <option value="02h00">02h00</option>
                        <option value="03h00">03h00</option>
                        <option value="04h00">04h00</option>
                        <option value="05h00">05h00</option>
                        <option value="06h00">06h00</option>
                        <option value="07h00">07h00</option>
                        <option value="08h00">08h00</option>
                        <option value="09h00">09h00</option>
                        <option value="10h00">10h00</option>
                        <option value="11h00">11h00</option>
                        <option value="12h00">12h00</option>
                        <option value="13h00">13h00</option>
                        <option value="14h00">14h00</option>
                        <option value="15h00">15h00</option>
                        <option value="16h00">16h00</option>
                        <option value="17h00">17h00</option>
                        <option value="18h00">18h00</option>
                        <option value="19h00">19h00</option>
                        <option value="20h00">20h00</option>
                        <option value="21h00">21h00</option>
                        <option value="22h00">22h00</option>
                        <option value="23h00">23h00</option>
                      </select>
                      <select
                        name="openHour"
                        id="openHour"
                        className="bg-white px-[15px] py-[4px] mr-[80px] mt-2 border-2 rounded-xl"
                      >
                        <option value="">Heure d'ouverture</option>
                        <option value="00h00">00h00</option>
                        <option value="01h00">01h00</option>
                        <option value="02h00">02h00</option>
                        <option value="03h00">03h00</option>
                        <option value="04h00">04h00</option>
                        <option value="05h00">05h00</option>
                        <option value="06h00">06h00</option>
                        <option value="07h00">07h00</option>
                        <option value="08h00">08h00</option>
                        <option value="09h00">09h00</option>
                        <option value="10h00">10h00</option>
                        <option value="11h00">11h00</option>
                        <option value="12h00">12h00</option>
                        <option value="13h00">13h00</option>
                        <option value="14h00">14h00</option>
                        <option value="15h00">15h00</option>
                        <option value="16h00">16h00</option>
                        <option value="17h00">17h00</option>
                        <option value="18h00">18h00</option>
                        <option value="19h00">19h00</option>
                        <option value="20h00">20h00</option>
                        <option value="21h00">21h00</option>
                        <option value="22h00">22h00</option>
                        <option value="23h00">23h00</option>
                      </select>
                      <select
                        name="openHour"
                        id="openHour"
                        className="bg-white px-[15px] py-[4px] mr-[80px] mt-2 border-2 rounded-xl"
                      >
                        <option value="">Heure d'ouverture</option>
                        <option value="00h00">00h00</option>
                        <option value="01h00">01h00</option>
                        <option value="02h00">02h00</option>
                        <option value="03h00">03h00</option>
                        <option value="04h00">04h00</option>
                        <option value="05h00">05h00</option>
                        <option value="06h00">06h00</option>
                        <option value="07h00">07h00</option>
                        <option value="08h00">08h00</option>
                        <option value="09h00">09h00</option>
                        <option value="10h00">10h00</option>
                        <option value="11h00">11h00</option>
                        <option value="12h00">12h00</option>
                        <option value="13h00">13h00</option>
                        <option value="14h00">14h00</option>
                        <option value="15h00">15h00</option>
                        <option value="16h00">16h00</option>
                        <option value="17h00">17h00</option>
                        <option value="18h00">18h00</option>
                        <option value="19h00">19h00</option>
                        <option value="20h00">20h00</option>
                        <option value="21h00">21h00</option>
                        <option value="22h00">22h00</option>
                        <option value="23h00">23h00</option>
                      </select>
                      <select
                        name="openHour"
                        id="openHour"
                        className="bg-white px-[15px] py-[4px] mr-[80px] mt-2 border-2 rounded-xl"
                      >
                        <option value="">Heure d'ouverture</option>
                        <option value="00h00">00h00</option>
                        <option value="01h00">01h00</option>
                        <option value="02h00">02h00</option>
                        <option value="03h00">03h00</option>
                        <option value="04h00">04h00</option>
                        <option value="05h00">05h00</option>
                        <option value="06h00">06h00</option>
                        <option value="07h00">07h00</option>
                        <option value="08h00">08h00</option>
                        <option value="09h00">09h00</option>
                        <option value="10h00">10h00</option>
                        <option value="11h00">11h00</option>
                        <option value="12h00">12h00</option>
                        <option value="13h00">13h00</option>
                        <option value="14h00">14h00</option>
                        <option value="15h00">15h00</option>
                        <option value="16h00">16h00</option>
                        <option value="17h00">17h00</option>
                        <option value="18h00">18h00</option>
                        <option value="19h00">19h00</option>
                        <option value="20h00">20h00</option>
                        <option value="21h00">21h00</option>
                        <option value="22h00">22h00</option>
                        <option value="23h00">23h00</option>
                      </select>
                      <select
                        name="openHour"
                        id="openHour"
                        className="bg-white px-[15px] py-[4px] mr-[80px] mt-2 border-2 rounded-xl"
                      >
                        <option value="">Heure d'ouverture</option>
                        <option value="00h00">00h00</option>
                        <option value="01h00">01h00</option>
                        <option value="02h00">02h00</option>
                        <option value="03h00">03h00</option>
                        <option value="04h00">04h00</option>
                        <option value="05h00">05h00</option>
                        <option value="06h00">06h00</option>
                        <option value="07h00">07h00</option>
                        <option value="08h00">08h00</option>
                        <option value="09h00">09h00</option>
                        <option value="10h00">10h00</option>
                        <option value="11h00">11h00</option>
                        <option value="12h00">12h00</option>
                        <option value="13h00">13h00</option>
                        <option value="14h00">14h00</option>
                        <option value="15h00">15h00</option>
                        <option value="16h00">16h00</option>
                        <option value="17h00">17h00</option>
                        <option value="18h00">18h00</option>
                        <option value="19h00">19h00</option>
                        <option value="20h00">20h00</option>
                        <option value="21h00">21h00</option>
                        <option value="22h00">22h00</option>
                        <option value="23h00">23h00</option>
                      </select>
                      <select
                        name="openHour"
                        id="openHour"
                        className="bg-white px-[15px] py-[4px] mr-[80px] mt-2 border-2 rounded-xl"
                      >
                        <option value="">Heure d'ouverture</option>
                        <option value="00h00">00h00</option>
                        <option value="01h00">01h00</option>
                        <option value="02h00">02h00</option>
                        <option value="03h00">03h00</option>
                        <option value="04h00">04h00</option>
                        <option value="05h00">05h00</option>
                        <option value="06h00">06h00</option>
                        <option value="07h00">07h00</option>
                        <option value="08h00">08h00</option>
                        <option value="09h00">09h00</option>
                        <option value="10h00">10h00</option>
                        <option value="11h00">11h00</option>
                        <option value="12h00">12h00</option>
                        <option value="13h00">13h00</option>
                        <option value="14h00">14h00</option>
                        <option value="15h00">15h00</option>
                        <option value="16h00">16h00</option>
                        <option value="17h00">17h00</option>
                        <option value="18h00">18h00</option>
                        <option value="19h00">19h00</option>
                        <option value="20h00">20h00</option>
                        <option value="21h00">21h00</option>
                        <option value="22h00">22h00</option>
                        <option value="23h00">23h00</option>
                      </select>
                    </div>
                    <div>
                      <select
                        name="closeHour"
                        id="closeHour"
                        className="bg-white px-[15px] py-[4px] mr-[80px] mt-2 border-2 rounded-xl"
                      >
                        <option value="">Heure de fermeture</option>
                        <option value="00h00">00h00</option>
                        <option value="01h00">01h00</option>
                        <option value="02h00">02h00</option>
                        <option value="03h00">03h00</option>
                        <option value="04h00">04h00</option>
                        <option value="05h00">05h00</option>
                        <option value="06h00">06h00</option>
                        <option value="07h00">07h00</option>
                        <option value="08h00">08h00</option>
                        <option value="09h00">09h00</option>
                        <option value="10h00">10h00</option>
                        <option value="11h00">11h00</option>
                        <option value="12h00">12h00</option>
                        <option value="13h00">13h00</option>
                        <option value="14h00">14h00</option>
                        <option value="15h00">15h00</option>
                        <option value="16h00">16h00</option>
                        <option value="17h00">17h00</option>
                        <option value="18h00">18h00</option>
                        <option value="19h00">19h00</option>
                        <option value="20h00">20h00</option>
                        <option value="21h00">21h00</option>
                        <option value="22h00">22h00</option>
                        <option value="23h00">23h00</option>
                      </select>
                      <select
                        name="closeHour"
                        id="closeHour"
                        className="bg-white px-[15px] py-[4px] mr-[80px] mt-2 border-2 rounded-xl"
                      >
                        <option value="">Heure de fermeture</option>
                        <option value="00h00">00h00</option>
                        <option value="01h00">01h00</option>
                        <option value="02h00">02h00</option>
                        <option value="03h00">03h00</option>
                        <option value="04h00">04h00</option>
                        <option value="05h00">05h00</option>
                        <option value="06h00">06h00</option>
                        <option value="07h00">07h00</option>
                        <option value="08h00">08h00</option>
                        <option value="09h00">09h00</option>
                        <option value="10h00">10h00</option>
                        <option value="11h00">11h00</option>
                        <option value="12h00">12h00</option>
                        <option value="13h00">13h00</option>
                        <option value="14h00">14h00</option>
                        <option value="15h00">15h00</option>
                        <option value="16h00">16h00</option>
                        <option value="17h00">17h00</option>
                        <option value="18h00">18h00</option>
                        <option value="19h00">19h00</option>
                        <option value="20h00">20h00</option>
                        <option value="21h00">21h00</option>
                        <option value="22h00">22h00</option>
                        <option value="23h00">23h00</option>
                      </select>
                      <select
                        name="closeHour"
                        id="closeHour"
                        className="bg-white px-[15px] py-[4px] mr-[80px] mt-2 border-2 rounded-xl"
                      >
                        <option value="">Heure de fermeture</option>
                        <option value="00h00">00h00</option>
                        <option value="01h00">01h00</option>
                        <option value="02h00">02h00</option>
                        <option value="03h00">03h00</option>
                        <option value="04h00">04h00</option>
                        <option value="05h00">05h00</option>
                        <option value="06h00">06h00</option>
                        <option value="07h00">07h00</option>
                        <option value="08h00">08h00</option>
                        <option value="09h00">09h00</option>
                        <option value="10h00">10h00</option>
                        <option value="11h00">11h00</option>
                        <option value="12h00">12h00</option>
                        <option value="13h00">13h00</option>
                        <option value="14h00">14h00</option>
                        <option value="15h00">15h00</option>
                        <option value="16h00">16h00</option>
                        <option value="17h00">17h00</option>
                        <option value="18h00">18h00</option>
                        <option value="19h00">19h00</option>
                        <option value="20h00">20h00</option>
                        <option value="21h00">21h00</option>
                        <option value="22h00">22h00</option>
                        <option value="23h00">23h00</option>
                      </select>
                      <select
                        name="closeHour"
                        id="closeHour"
                        className="bg-white px-[15px] py-[4px] mr-[80px] mt-2 border-2 rounded-xl"
                      >
                        <option value="">Heure de fermeture</option>
                        <option value="00h00">00h00</option>
                        <option value="01h00">01h00</option>
                        <option value="02h00">02h00</option>
                        <option value="03h00">03h00</option>
                        <option value="04h00">04h00</option>
                        <option value="05h00">05h00</option>
                        <option value="06h00">06h00</option>
                        <option value="07h00">07h00</option>
                        <option value="08h00">08h00</option>
                        <option value="09h00">09h00</option>
                        <option value="10h00">10h00</option>
                        <option value="11h00">11h00</option>
                        <option value="12h00">12h00</option>
                        <option value="13h00">13h00</option>
                        <option value="14h00">14h00</option>
                        <option value="15h00">15h00</option>
                        <option value="16h00">16h00</option>
                        <option value="17h00">17h00</option>
                        <option value="18h00">18h00</option>
                        <option value="19h00">19h00</option>
                        <option value="20h00">20h00</option>
                        <option value="21h00">21h00</option>
                        <option value="22h00">22h00</option>
                        <option value="23h00">23h00</option>
                      </select>
                      <select
                        name="closeHour"
                        id="closeHour"
                        className="bg-white px-[15px] py-[4px] mr-[80px] mt-2 border-2 rounded-xl"
                      >
                        <option value="">Heure de fermeture</option>
                        <option value="00h00">00h00</option>
                        <option value="01h00">01h00</option>
                        <option value="02h00">02h00</option>
                        <option value="03h00">03h00</option>
                        <option value="04h00">04h00</option>
                        <option value="05h00">05h00</option>
                        <option value="06h00">06h00</option>
                        <option value="07h00">07h00</option>
                        <option value="08h00">08h00</option>
                        <option value="09h00">09h00</option>
                        <option value="10h00">10h00</option>
                        <option value="11h00">11h00</option>
                        <option value="12h00">12h00</option>
                        <option value="13h00">13h00</option>
                        <option value="14h00">14h00</option>
                        <option value="15h00">15h00</option>
                        <option value="16h00">16h00</option>
                        <option value="17h00">17h00</option>
                        <option value="18h00">18h00</option>
                        <option value="19h00">19h00</option>
                        <option value="20h00">20h00</option>
                        <option value="21h00">21h00</option>
                        <option value="22h00">22h00</option>
                        <option value="23h00">23h00</option>
                      </select>
                      <select
                        name="closeHour"
                        id="closeHour"
                        className="bg-white px-[15px] py-[4px] mr-[80px] mt-2 border-2 rounded-xl"
                      >
                        <option value="">Heure de fermeture</option>
                        <option value="00h00">00h00</option>
                        <option value="01h00">01h00</option>
                        <option value="02h00">02h00</option>
                        <option value="03h00">03h00</option>
                        <option value="04h00">04h00</option>
                        <option value="05h00">05h00</option>
                        <option value="06h00">06h00</option>
                        <option value="07h00">07h00</option>
                        <option value="08h00">08h00</option>
                        <option value="09h00">09h00</option>
                        <option value="10h00">10h00</option>
                        <option value="11h00">11h00</option>
                        <option value="12h00">12h00</option>
                        <option value="13h00">13h00</option>
                        <option value="14h00">14h00</option>
                        <option value="15h00">15h00</option>
                        <option value="16h00">16h00</option>
                        <option value="17h00">17h00</option>
                        <option value="18h00">18h00</option>
                        <option value="19h00">19h00</option>
                        <option value="20h00">20h00</option>
                        <option value="21h00">21h00</option>
                        <option value="22h00">22h00</option>
                        <option value="23h00">23h00</option>
                      </select>
                      <select
                        name="closeHour"
                        id="closeHour"
                        className="bg-white px-[15px] py-[4px] mr-[80px] mt-2 border-2 rounded-xl"
                      >
                        <option value="">Heure de fermeture</option>
                        <option value="00h00">00h00</option>
                        <option value="01h00">01h00</option>
                        <option value="02h00">02h00</option>
                        <option value="03h00">03h00</option>
                        <option value="04h00">04h00</option>
                        <option value="05h00">05h00</option>
                        <option value="06h00">06h00</option>
                        <option value="07h00">07h00</option>
                        <option value="08h00">08h00</option>
                        <option value="09h00">09h00</option>
                        <option value="10h00">10h00</option>
                        <option value="11h00">11h00</option>
                        <option value="12h00">12h00</option>
                        <option value="13h00">13h00</option>
                        <option value="14h00">14h00</option>
                        <option value="15h00">15h00</option>
                        <option value="16h00">16h00</option>
                        <option value="17h00">17h00</option>
                        <option value="18h00">18h00</option>
                        <option value="19h00">19h00</option>
                        <option value="20h00">20h00</option>
                        <option value="21h00">21h00</option>
                        <option value="22h00">22h00</option>
                        <option value="23h00">23h00</option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <ul className="flex justify-around py-4 flex-wrap w-4/5 my-3.5 mx-auto">
              {poiData.map((poi) => (
                <Link
                  key={poi.id}
                  to={`/point-of-interest/${poi.id}/${poi.name}`}
                  style={{ cursor: 'pointer' }}
                >
                  <li className="h-[250px] w-[250px] border-solid border rounded-xl mb-8">
                    <POICard
                      name={poi.name}
                      address={poi.address}
                      pictureUrl={poi.pictureUrl}
                      description={poi.description}
                    />
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
        <div style={{ width: '100%', height: '100vh' }}>
          <MapModule />
        </div>
      </div>
    </div>
  );
};

export default POIList;
