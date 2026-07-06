import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export const analyzeCompany = async (company) => {
  const response = await axios.post(`${BASE_URL}/analyze`, { company });
  return response.data;
};