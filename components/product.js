const getProducts = (data) => {
  return { success: true, data: "all products" };
};
const getSingleProducts = (data) => {
  return { success: true, data: "single  products with id " + data.productId };
};
const createProduct = (data) => {
  return { success: true, data: data };
};

module.exports = { getProducts, getSingleProducts, createProduct };
