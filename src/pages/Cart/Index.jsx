import { useContext } from "react";
import useCart from "../../hooks/useCart";
import { FaTrashCan } from "react-icons/fa6";
import { AuthContext } from "../../context/AuthContext";
import cartService from "../../services/cart.service";
import Swal from "sweetalert2";
import PaymentButton from "../../components/PaymentButton";

const Index = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const formatPrice = (price) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(price);
  };
  // const handleClearCart = async () => {
  //   Swal.fire({
  //     icon: "question",
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     cancelButtonColor: "#d33",
  //     confirmButtonColor: "#3085d6",
  //     showConfirmButton: true,
  //     confirmButtonText: "Yes, delete it!",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         const response = await cartService.clearCart(user?.email);
  //         if (response.status === 200) {
  //           refetch();
  //           Swal.fire({
  //             icon: "success",
  //             title: "Delete Success",
  //             text: response.message,
  //           });
  //         }
  //       } catch (error) {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Error",
  //           text: error.message,
  //         });
  //       }
  //     }
  //   });
  // };
  const handleDeleteItem = async (cartItem) => {
    Swal.fire({
      icon: "question",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      cancelButtonColor: "#d33",
      confirmButtonColor: "#3085d6",
      showConfirmButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await cartService.deleteCartItem(cartItem._id);
          if (response.status === 200) {
            refetch();
            Swal.fire({
              icon: "success",
              title: "Delete Success",
              text: response.message,
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message,
          });
        }
      }
    });
  };

  const handleIncrease = async (cartItem) => {
    try {
      if (!cartItem || !cartItem._id) return;

      const response = await cartService.updateCart(cartItem._id, {
        quantity: cartItem.quantity + 1,
      });

      if (response.status === 200) {
        refetch(); // รีโหลดตะกร้า
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to update cart",
      });
    }
  };

  const handleDecrease = async (cartItem) => {
    try {
      if (!cartItem || !cartItem._id) return;

      // ป้องกันจำนวนติดลบ
      if (cartItem.quantity <= 1) {
        Swal.fire({
          icon: "warning",
          title: "Cannot Decrease",
          text: "Quantity cannot be less than 1",
        });
        return;
      }

      const response = await cartService.updateCart(cartItem._id, {
        quantity: cartItem.quantity - 1,
      });

      if (response.status === 200) {
        refetch();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to update cart",
      });
    }
  };

  const totalPrice = (cart) => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price * cart[i].quantity;
    }
    return total;
  };

  return (
    <div className="overflow-x-auto max-w-screen-md mx-auto">
      <table className="table table-compact w-full">
        {/* Table Head */}
        <thead>
          <tr className="bg-red font-semibold text-white">
            <th>#</th>
            <th>Product</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price Per Unit</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {cart.length > 0 &&
            cart.map((cartItem, index) => (
              <tr key={cartItem.id || index}>
                <td>{index + 1}</td>
                <td>{cartItem.name}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={
                            cartItem.image ||
                            "https://img.daisyui.com/images/profile/demo/2@94.webp"
                          }
                          alt="Product"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{cartItem.name}</div>
                      <div className="text-sm opacity-50">
                        {cartItem.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center">
                    <button
                      className="btn btn-xs btn-outline btn-primary"
                      onClick={() => handleDecrease(cartItem)}
                    >
                      -
                    </button>
                    <span className="mx-2">{cartItem.quantity}</span>
                    <button
                      className="btn btn-xs btn-outline btn-primary"
                      onClick={() => handleIncrease(cartItem)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>{formatPrice(cartItem.price)}</td>
                <td>{formatPrice(cartItem.quantity * cartItem.price)}</td>
                <td>
                  <button onClick={() => handleDeleteItem(cartItem)}>
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>

        {/* Table Foot */}
        <tfoot>
          <tr>
            <th></th>
            <th>Product</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price Per Unit</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </tfoot>
      </table>

      {/* Shopping Summary */}
      {cart.length > 0 ? (
        <div className="overflow-x-auto">
          <hr />
          <div className="flex flex-col md:flex-row justify-between items-start my-12 gap-8">
            <div className="md:w-1/2 space-y-3">
              <h3 className="text-lg font-semibold">Customer Details</h3>
              <p>Name: {user?.displayName}</p>
              <p>Email: {user?.email}</p>
              <p>User ID: {user?.uid}</p>
            </div>
            <div className="md:w-1/2 space-y-3">
              <h3 className="text-lg font-semibold">Shopping Details</h3>
              <p>Total Items: {cart.length} items</p>
              <p>Total Price: {formatPrice(totalPrice(cart))}</p>
              <PaymentButton cartItems={cart} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-2xl font-bold text-center text-red mb-4">
            No items in cart
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;