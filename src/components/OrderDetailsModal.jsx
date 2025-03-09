import Swal from "sweetalert2";
import { TbListDetails } from "react-icons/tb";

const OrderDetailsModal = ({ order }) => {
    const showOrderDetails = () => {
        Swal.fire({
            title: "Order Details",
            width: "60%",
            html: `
        <div style="text-align: left;">
          <h3>Products</h3>
          <table style="width: 100%; border-collapse: collapse; text-align: left;">
            <thead>
              <tr style="background-color:#790000; color:white">
                <th style="border-bottom: 1px solid #ddd; padding: 8px;">#</th>
                <th style="border-bottom: 1px solid #ddd; padding: 8px;">Image</th>
                <th style="border-bottom: 1px solid #ddd; padding: 8px;">Name</th>
                <th style="border-bottom: 1px solid #ddd; padding: 8px;">Unit Price</th>
                <th style="border-bottom: 1px solid #ddd; padding: 8px;">Quantity</th>
                <th style="border-bottom: 1px solid #ddd; padding: 8px;">SubTotal</th>
              </tr>
            </thead>
            <tbody>
              ${order.products
                    .map(
                        (product, index) => `
                    <tr>
                      <td style="border-bottom: 1px solid #ddd; padding: 8px;">${index + 1}</td>
                      <td style="border-bottom: 1px solid #ddd; padding: 8px;">
                        <img 
                          src="${product.image || 'https://via.placeholder.com/50'}" 
                          alt="${product.productName || 'N/A'}" 
                          style="width: 50px; height: 50px; object-fit: cover;"
                        />
                      </td>
                      <td style="border-bottom: 1px solid #ddd; padding: 8px;">${product.productName || 'N/A'}</td>
                      <td style="border-bottom: 1px solid #ddd; padding: 8px;">฿${(product.unitPrice || 0).toLocaleString()}</td>
                      <td style="border-bottom: 1px solid #ddd; padding: 8px;">${product.quantity || 0}</td>
                      <td style="border-bottom: 1px solid #ddd; padding: 8px;">฿${(product.unitPrice || 0) * (product.quantity).toLocaleString()}</td>
                    </tr>
                  `
                    )
                    .join("")
                }
            </tbody>
          </table>

          <h3>Total: ฿${order.total.toLocaleString()}</h3>
          <h3>Shipping Details</h3>
          <p><strong>Name:</strong> ${order.shipping?.name || 'N/A'}</p>
          <p><strong>Phone:</strong> ${order.shipping?.phone || 'N/A'}</p>
          <p><strong>Address:</strong> 
             ${order.shipping?.address?.line1 || 'N/A'}, 
             ${order.shipping?.address?.city || 'N/A'}, 
             ${order.shipping?.address?.postal_code || 'N/A'}
          </p>
        </div>
      `,
            confirmButtonText: "Close",
        });
    };

    return (
        <button
            className="bg-green-500 text-white p-2 rounded-full"
            title="View Details"
            onClick={showOrderDetails}
        >
             <TbListDetails size={20} />
        </button>
    );
};

export default OrderDetailsModal;
