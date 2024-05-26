import { BsFingerprint } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import MenuItem from "../Dashboard/MenuItem";
import useRole from "../../hooks/useRole";
import HostModal from "../../components/Form/HostModal";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const GuestMenu = () => {
  const [role] = useRole();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // for modal

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalHandle = async () => {
    console.log("I Want to be a Host");

    try {
      const currentUser = {
        email: user?.email,
        role: "guest",
        status: "Requested",
      };
      const { data } = await axiosSecure.put(
        `${import.meta.env.VITE_API_URL}/user`,
        currentUser
      );
      console.log(data);
      if (data.modifiedCount > 0) {
        toast.success("Success.Please Wait for Admin Confirmation");
      } else {
        toast.success("Please! Wait for Admin Approval!!");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      closeModal();
    }
  };
  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label="My Bookings"
        address="my-bookings"
      />

      {role === "guest" && (
        <div className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer">
          <GrUserAdmin className="w-5 h-5" />

          <button
            onClick={() => setIsModalOpen(true)}
            className="mx-4 font-medium"
          >
            Become A Host
          </button>
        </div>
      )}
      <HostModal
        closeModal={closeModal}
        isOpen={isModalOpen}
        modalHandle={modalHandle}
      ></HostModal>
    </>
  );
};

export default GuestMenu;
