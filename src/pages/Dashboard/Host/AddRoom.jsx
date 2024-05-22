import { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import imageUpload from "../../../components/Utilites";

const AddRoom = () => {
  const { user } = useAuth();

  const [imagePreview, setImagePreview] = useState();
  const [imageText, setImageText] = useState("Upload Image");

  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: null,
    key: "selection",
  });

  const handleDate = (range) => {
    setDates(range.selection);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const location = form.location.value;
    const category = form.category.value;
    const to = dates.endDate;
    const from = dates.startDate;
    const price = form.price.value;
    const guest = form.total_guest.value;
    const image = form.image.files[0];
    const bedrooms = form.bedrooms.value;
    const bathrooms = form.bathrooms.value;
    const description = form.description.value;
    const host = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };

    try {
      const image_url = await imageUpload(image);

      const roomData = {
        title,
        location,
        category,
        price,
        guest,
        bedrooms,
        bathrooms,
        description,
        to,
        from,
        host,
        image: image_url,
      };
      console.log(roomData);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="p-8">
      <AddRoomForm
        dates={dates}
        handleDate={handleDate}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddRoom;
