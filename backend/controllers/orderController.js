const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const tryCatchError = require("../middleware/tryCatchErrors");

const orderController = {
  // Create new Order
  newOrder: tryCatchError(async (req, res, next) => {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      order,
    });
  }),

  // get Single Order
  getSingleOrder: tryCatchError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return next(new ErrorHander("Order not found with this Id", 404));
    }

    res.status(200).json({
      success: true,
      order,
    });
  }),

  // get logged in user Orders
  myOrders: tryCatchError(async (req, res, next) => {
    const order = await Order.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      order,
    });
  }),

  // get all Orders -- Admin
  getAllOrders: tryCatchError(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });

    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
  }),

  // update Order Status -- Admin

  updateOrder: tryCatchError(async (req, res, next) => {
    const updateStock = async (id, quantity) => {
      const product = await Product.findById(id);

      product.Stock -= quantity;

      await product.save({ validateBeforeSave: false });
    };

    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHander("Order not found with this Id", 404));
    }

    if (order.orderStatus === "Delivered") {
      return next(
        new ErrorHander("You have already delivered this order", 400)
      );
    }

    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }
    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  }),

  // delete Order -- Admin
  deleteOrder: tryCatchError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHander("Order not found with this Id", 404));
    }

    await order.remove();

    res.status(200).json({
      success: true,
    });
  }),
};

module.exports = orderController;