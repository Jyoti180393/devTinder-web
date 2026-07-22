import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { updateUser } from "../store/userSlice";

const Premium = () => {
  const dispatch = useDispatch();
  const handlePaymentSuccess = async () => {
    const res = await axios.get(BASE_URL + "/payment/success", {
      withCredentials: true,
    });

    console.log(res.data);
    if (res.data.isPremium) {
      dispatch(updateUser({ isPremium: true }));
    }
  };
  const handlePayment = async (membershipType) => {
    try {
      const orderRes = await axios.post(
        BASE_URL + "/payment/create-order",
        { membershipType },
        { withCredentials: true },
      );
      const { key, amount, currency, notes, orderId } = orderRes.data.data;

      const razorPayOption = {
        key, //  Razorpay key_id
        amount, // Amount is in currency subunits.
        currency,
        name: "Dev Tinder",
        description:
          "Test Transaction for " + notes.firstName + " " + notes.lastName,
        order_id: orderId, // This is the order_id created in the backend
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.email,
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
        handler: handlePaymentSuccess, // Callback function to handle payment success
      };

      const rzp = new window.Razorpay(razorPayOption);
      rzp.open();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex w-full flex-col lg:flex-row ">
      <div className="card bg-base-300 rounded-box grid h-auto grow place-items-center m-10 p-5">
        <h1 className="text-2xl font-bold text-center"> Silver Membership</h1>
        <p className=" w-1/2 text-xl">
          Get access to exclusive features and content with our Silver
          Membership. Enjoy a range of benefits designed to enhance your
          experience and provide you with premium services.
        </p>
        <ul className="list-disc list-inside text-left p-7 text-lg">
          <li>Chat without connection request</li>
          <li>Enjoy the premium for 3 months</li>
          <li>Blue Tick</li>
          <li>10 connection request per day</li>
        </ul>
        <button
          className="btn btn-primary text-xl"
          onClick={() => handlePayment("silver")}
        >
          Buy Silver
        </button>
      </div>
      <div className="divider lg:divider-horizontal">OR</div>
      <div className="card bg-base-300 rounded-box grid h-auto grow place-items-center m-10 p-5">
        <h1 className="text-2xl font-bold text-center"> Gold Membership</h1>
        <p className=" w-1/2 text-xl">
          Get access to exclusive features and content with our Gold Membership.
          Enjoy a range of benefits designed to enhance your experience and
          provide you with premium services.
        </p>
        <ul className="list-disc list-inside text-left p-7 text-lg">
          <li>Chat without connection request</li>
          <li>Enjoy the premium for 6 months</li>
          <li>Golden Tick</li>
          <li>Unlimited connection request per day</li>
        </ul>
        <button
          className="btn bg-amber-500 text-xl"
          onClick={() => handlePayment("gold")}
        >
          Buy Golden
        </button>
      </div>
    </div>
  );
};

export default Premium;
