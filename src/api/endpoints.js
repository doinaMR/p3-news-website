const API_KEY = "b0c2c787-9f5f-403f-a7ec-c4c9ada30184";

// Functie care returneaza endpoint-ul pentru o anumita categorie de stiri.
// pageNumber si pageSize au valori default, astfel incat daca nu le specifici o valoare la apel, vor primi automat valorile default.
export function getNewsCategoriesEndpoint(
  category,
  pageNumber = 1,
  pageSize = 20
) {
  // Construim query string-ul. Va contine api-key-ul, sectiunea, optiunea de afisare a campurilor stirii, precum și numarul de elemente returnate si numarul paginii.
  const queryParams = `?api-key=${API_KEY}&section=${category}&show-fields=all&page-size=${pageSize}&page=${pageNumber}`;

  // Returnam link-ul aferent API-ului The Guardian.
  return `https://content.guardianapis.com/search${queryParams}`;
}

// Functie care returneaza endpoint-ul pentru o anumita stire.
export function getNewsDetailsEndpoint(newsId) {
  // Construim query string-ul. Va contine api-key-ul si optiunea de afisare a campurilor stirii.
  const queryParams = `?api-key=${API_KEY}&show-fields=all`;

  // Returnam link-ul aferent API-ului The Guardian.
  return `https://content.guardianapis.com/${newsId}${queryParams}`;
}
