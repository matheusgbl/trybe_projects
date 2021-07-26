const url = 'https://api.mercadolibre.com/sites/MLB';

export async function getCategories() {
  const data = await fetch(`${url}/categories`)
    .then((response) => response.json())
    .catch((err) => console.log(err));

  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const data = await fetch(`${url}/search?category=${categoryId}&q=${query}`)
    .then((response) => response.json())
    .catch((err) => console.log(err));

  return data;
}
