import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useFetch } from "../utils/hooks/useFetch";
import { getNewsDetailsEndpoint } from "../api/endpoints";
import { getNewsDetails } from "../api/adaptors";
import Button from "react-bootstrap/Button";
import "./NewsDetails.css";
import { getFormattedDate } from "../utils/date";
import { addToFavorites } from "../store/Favorites/actions";
import { FavoritesContext } from "../store/Favorites/context";
import Alert from "react-bootstrap/Alert";
import useLocalStorage from "../utils/hooks/useLocalStorage";

function NewsDetails() {
  // Extragem functia care modifica state-ul global.
  const { favoritesState, favoritesDispatch } = useContext(FavoritesContext);
  // Extragem parametrul venit din URL.
  let { newsId } = useParams();
  // Vrem ca id-ul extras din URL sa contina /-urile, asa ca il decodam.
  newsId = decodeURIComponent(newsId);
  // Generam endpointul pentru detaliile stirii.
  const newsDetailsEndpoint = getNewsDetailsEndpoint(newsId);
  // Cerem datele de la server.
  const newsDetails = useFetch(newsDetailsEndpoint);
  // Adaptam datele de la server la datele de care au nevoie componentele de react.
  const adaptedNewsDetails = getNewsDetails(newsDetails);
  const [isAlertDisplayed, setIsAlertDisplayed] = useState(false);
  const [_, setLocalStorageState] = useLocalStorage(
    "favorites",
    favoritesState
  );
  useEffect(() => {
    setLocalStorageState(favoritesState);
  }, [favoritesState, setLocalStorageState]);

  // Extragem campurile de interes din datele adaptate.
  const { title, description, image, date, author, content, thumbnail } =
    adaptedNewsDetails;
  // Formatam data.
  const formattedDate = getFormattedDate(date);

  function handleAddToFavorites(product) {
    // Apelam actiunea de adaugare la favorite.
    const actionResult = addToFavorites(product);
    // Trimitem rezultatul actiunii catre reducer.
    favoritesDispatch(actionResult);
    setIsAlertDisplayed(true);
    setTimeout(() => {
      setIsAlertDisplayed(false);
    }, 2000);
  }

  return (
    <Layout>
      {isAlertDisplayed && (
        <Alert variant="success" id="alert">
          Ai adaugat stirea la favorite!
        </Alert>
      )}
      <Container className="NewsDetails my-5">
        <Row className="d-flex justify-content-center">
          <Col xs={12} lg={8}>
            <h1 className="pt-3 mb-5">{title}</h1>
            <p className="fw-bold">{description}</p>
            <div
              // De la The Guardian imaginea ne vine sub forma de tag-uri de html.
              // Pentru a afisa html pe ecran, avem nevoie de prop-ul dangerouslySetInnerHTML.
              dangerouslySetInnerHTML={{ __html: image }}
              className="mb-4"
            ></div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="fw-bold">
                <p>{author}</p>
                <p className="mb-0">{formattedDate}</p>
              </div>
              <Button
                onClick={() => {
                  // Construim payload-ul actiunii si apelam functia care trimite actiunea catre reducer.
                  handleAddToFavorites({
                    id: newsId,
                    thumbnail,
                    title,
                    description,
                    hasCloseButton: true,
                  });
                }}
              >
                Adaugă la favorite
              </Button>
            </div>
            {/* De la The Guardian continutul ne vine sub forma de tag-uri de html. */}
            {/* Pentru a afisa html pe ecran, avem nevoie de prop-ul dangerouslySetInnerHTML. */}
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default NewsDetails;
