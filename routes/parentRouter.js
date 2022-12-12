const orderRouter = require('./order.router');
const authRouter = require('./auth.router');

exports.createRoutes = (app) => {
    app.use("/order", orderRouter);
    app.use("/auth", authRouter);
}