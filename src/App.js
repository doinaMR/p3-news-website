// Importam componentele ce tin de rutare.;
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Importam paginile.
import Page404 from "./pages/Page404";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import NewsCategory from "./pages/NewsCategory";
import NewsDetails from "./pages/NewsDetails";
// Importam ce tine de state management.
import { useReducer } from "react";
import { FavoritesContext } from "./store/Favorites/context";
import { initialState, favoritesReducer } from "./store/Favorites/reducer";
import useLocalStorage from "./utils/hooks/useLocalStorage";

// Definim rutele, similar cu ce am facut la sedinta 32.
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Page404 />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
  {
    path: "/category/:categoryId",
    element: <NewsCategory />,
  },
  {
    path: "/news/:newsId",
    element: <NewsDetails />,
  },
]);

function App() {
  // Initializez state-ul pornind de la ce avem in localStorage. Daca exista state in localStorage - il dau ca parametru la useReducer, daca nu - folosesc initialState:
  const [initialLocalStorageState] = useLocalStorage("favorites", initialState);
  // Initializam reducerul pentru produse favorite.
  const [favoritesState, favoritesDispatch] = useReducer(
    favoritesReducer,
    initialLocalStorageState
  );
  // Cream obiectul ce va fi pasat ca valoare contextului.
  const favoritesContextValue = {
    favoritesState,
    favoritesDispatch,
  };

  return (
    <div className="App">
      {/* Pasam state-ul global si dispatch-ul catre intreaga aplicatie. */}
      <FavoritesContext.Provider value={favoritesContextValue}>
        {/* Adaugam providerul de rutare, similara cu ce am facut la sedinta 32. */}
        <RouterProvider router={router} />
      </FavoritesContext.Provider>
    </div>
  );
}

export default App;
