import React from "react";
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import { useFetch } from "../utils/hooks/useFetch";
import { getNewsCategoriesEndpoint } from "../api/endpoints";
import NewsCardList from "../components/NewsCardList";
import { getNewsList } from "../api/adaptors";
import { Link } from "react-router-dom";

function Home() {
  // Generam endpoint-urile pentru categoriile de stiri.
  const businessNewsEndpoint = getNewsCategoriesEndpoint("business", 1, 6);
  const technologyNewsEndpoint = getNewsCategoriesEndpoint("technology", 1, 6);
  const scienceNewsEndpoint = getNewsCategoriesEndpoint("science", 1, 6);
  // Fetch-uim datele de la The Guardian.
  let businessData = useFetch(businessNewsEndpoint);
  let technologyData = useFetch(technologyNewsEndpoint);
  let scienceData = useFetch(scienceNewsEndpoint);
  // Adaptam datele de la server la datele necesare componentelor de react.
  const adaptedBusinessData = getNewsList(businessData);
  const adaptedTechnologyData = getNewsList(technologyData);
  const adaptedScienceData = getNewsList(scienceData);

  return (
    <Layout>
      <section className="business my-5">
        <Container>
          <h1 className="mb-5 pt-3">Business</h1>
          {/* Afisam stirile despre business. */}
          <NewsCardList newsList={adaptedBusinessData} />
          <p>
            Vezi toate știrile legate de afaceri în secțiunea{" "}
            <Link to="/category/business" className="text-secondary">
              Business
            </Link>
            .
          </p>
        </Container>
      </section>
      <section className="tech my-5">
        <Container>
          <h1 className="mb-5 pt-3">Tech</h1>
          {/* Afisam stirile despre technologie. */}
          <NewsCardList newsList={adaptedTechnologyData} />
          <p>
            Vezi toate știrile legate de tehnologie în secțiunea{" "}
            <Link to="/category/technology" className="text-secondary">
              Tech
            </Link>
            .
          </p>
        </Container>
      </section>
      <section className="science my-5">
        <Container>
          <h1 className="mb-5 pt-3">Science</h1>
          {/* Afisam stirile despre stiinta. */}
          <NewsCardList newsList={adaptedScienceData} />
          <p>
            Vezi toate știrile legate de stiinta în secțiunea{" "}
            <Link to="/category/science" className="text-secondary">
              Science
            </Link>
            .
          </p>
        </Container>
      </section>
      <section className="favorites my-5">
        <Container>
          <h1 className="mb-5 pt-3">Favorite</h1>
          <p>
            Vrei să îți salvezi știrile favorite pentru a le reciti mai încolo?
          </p>
          <p>
            În cadrul fiecărei știri găsești un buton prin care poți adăuga
            știrea la favorite.
          </p>
          <p className="pb-3">
            Vizitează secțiunea{" "}
            <Link to="/favorites" className="text-secondary">
              Favorite
            </Link>{" "}
            pentru a vedea știrile adăugate.
          </p>
        </Container>
      </section>
    </Layout>
  );
}

export default Home;
