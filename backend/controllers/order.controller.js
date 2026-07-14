import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

// // Place order COD: /api/order/cod
// export const placeOrderCOD = async (req, res) => {
//   try {
//     const userId = req.user;
//     const { items, address } = req.body;
//     if (!address || !items) {
//       return res
//         .status(400)
//         .json({ message: "Invalid order details", success: false });
//     }
//     // calculate amount using items;
//     let amount = await items.reduce(async (acc, item) => {
//       const product = await Product.findById(item.product);
//       return (await acc) + product.offerPrice * item.quantity;
//     }, 0);

//     // Add tex charfe 2%
//     amount += Math.floor((amount * 2) / 100);
//     await Order.create({
//       userId,
//       items,
//       address,
//       amount,
//       paymentType: "COD",
//       isPaid: false,
//     });
//     res
//       .status(201)
//       .json({ message: "Order placed successfully", success: true });
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.user;
    const { items, address } = req.body;

    if (!address || !items || items.length === 0) {
      return res.status(400).json({ message: "Invalid order details", success: false });
    }

    // FIX: Use a standard loop for async database calls
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (product) {
        amount += product.offerPrice * item.quantity;
      }
    }

    // Add tax charge 2%
    amount += Math.floor((amount * 2) / 100);

    await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "COD",
      isPaid: false,
    });

    res.status(201).json({ message: "Order placed successfully", success: true });
  } catch (error) {
    console.error("Order Error:", error); // Check your terminal for this!
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//paypal online payment
export const placeOrderPaypal = async (req, res) => {
  try {
    const userId = req.user; // authUser middleware se aayega
    const { items, address, amount, paymentId } = req.body;

    if (!address || !items || items.length === 0) {
      return res.status(400).json({ message: "Invalid order details", success: false });
    }

    // Naya order create karein (PayPal ke liye)
    const newOrder = await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "PayPal",
      isPaid: true, // Kyunki payment pehle hi capture ho chuki hai
      paymentId: paymentId || "N/A", // Tracking ke liye optional
    });

    res.status(201).json({ 
      message: "Order placed successfully via PayPal", 
      success: true, 
      order: newOrder 
    });

  } catch (error) {
    console.error("PayPal Order Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// order details for individual user :/api/order/user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user;
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get all orders for admin :/api/order/seller
// export const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({
//       $or: [{ paymentType: "COD" }, { isPaid: false }],
//     })
//       .populate("items.product address")
//       .sort({ createdAt: -1 });
//     res.status(200).json({ success: true, orders });
//   } catch (error) {
//     onsole.error("Error fetching all orders: ", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
// orderController.js mein ise replace karein
export const getAllOrders = async (req, res) => {
  try {
    // Filter hata kar simple Order.find({}) use karein taaki sab dikhe
    const orders = await Order.find({}) 
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching all orders: ", error); // Yahan 'onsole' ki spelling bhi theek kar di
    res.status(500).json({ message: "Internal Server Error" });
  }
};