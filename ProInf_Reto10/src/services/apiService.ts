import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const apiService = {
  // GET:
  getProducts: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  // POST:
  createProduct: async (data: any) => {
    const response = await axios.post(API_URL, data);
    return response.data;
  },

  // PUT:
  updateProduct: async (id: number, data: any) => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  },

  // DELETE:
  deleteProduct: async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  }
};