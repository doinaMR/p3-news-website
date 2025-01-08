import { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import { FavoritesContext } from "../store/Favorites/context";
import NewsCardList from "../components/NewsCardList";
import useLocalStorage from "../utils/hooks/useLocalStorage";

function Favorites() {
  // Extragem din state-ul global produsele favorite.
  const { favoritesState } = useContext(FavoritesContext);
  const { products } = favoritesState;
  // Pasul 1: Extragem fucntia ce modifica localStorage-ul. (Intrucat nu avem nevoie de state-ul din localStorage, conventia este ca pentru variabilele neutilizate sa punem denumirea _.)
  const [_, setLocalStorageState] = useLocalStorage(
    "favorites",
    favoritesState
  );
  // Pasul2: Adaugarea in localStorage este un efect, atunci cand se modifica produsele favorite.
  // Stim ca s-au modificat produsele favorite cand primim o noua valoare a lui favoritesState.
  // setLocalStorageState este sugerat sa fie adaugat la dependente de o regula de lining.
  useEffect(() => {
    setLocalStorageState(favoritesState);
  }, [favoritesState, setLocalStorageState]);

  return (
    <Layout>
      <Container className="my-5">
        <h1 className="mb-5 pt-3">Știrile tale favorite</h1>
        {/* Afisam produsele favorite pe ecran. */}
        {products.length === 0 ? (
          <p>Momentan nu ai nicio știre favorită.</p>
        ) : (
          <NewsCardList newsList={products} />
        )}
      </Container>
    </Layout>
  );
}

export default Favorites;
