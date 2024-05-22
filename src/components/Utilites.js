import axios from "axios";

const Utilites = async (image) => {
  const formData = new FormData();
  formData.append("image", image);
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${"4ba07d864f35c7673ee9014d50b25b54"}`,
    formData
  );

  return data.data.display_url;
};

export default Utilites;
