import axios from "axios";

export const fetchImagesPexels = async (query, page) => {
  try {
    const response = await axios.get(
      `https://api.pexels.com/v1/search/?page=${page}&per_page=10&query=${query}`,
      {
        headers: {
          Authorization: "7R1p5WHvi8uVgsSPNkNFlpkLVRmnJcbGTBqrTQSNSiQWaveRlNfuJKKK",
        },
      }
    );
    return response.data.photos;
  } catch (error) {
    console.error('Error al obtener las imágenes', error);
    return [];
  }
};