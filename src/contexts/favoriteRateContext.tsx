import { createContext, useContext, useState, ReactNode } from "react";

interface FavoriteRateContextValue {
  favorites: { [poiId: number]: number };
  setFavorites: React.Dispatch<React.SetStateAction<{ [poiId: number]: number }>>;
}

export const FavoriteRateContext = createContext<FavoriteRateContextValue>({
  favorites: {},
  setFavorites: () => {},
});


interface FavoriteRateProviderProps {
  children: ReactNode;
}

export const FavoriteRateProvider: React.FC<FavoriteRateProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<{ [poiId: number]: number }>({});

  const value: FavoriteRateContextValue = {
    favorites,
    setFavorites,
  };

  return (
    <FavoriteRateContext.Provider value={value}>
      {children}
    </FavoriteRateContext.Provider>
  );
};
