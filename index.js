
const dotenv_1 = require("dotenv");
const express_1 = require("express");
const mongoose_1 = require("mongoose");
const morgan_1 = require("morgan");
const body_parser_1 = require("body-parser");
const passport_1 = require("passport");
const path_1 = require("path");
const auth = require("./auth");
const error_1 = require("./middlewares/error");
const products_1 = require("./routes/products");
const orders_1 = require("./routes/orders");
const { connect } = require("tls");
const app = express_1["default"]();


exports.__esModule = true;
exports.app = void 0;
exports.app = app;

dotenv_1["default"].config();
auth.setupLocalStrategy();
auth.setupJwtStrategy();

mongoose_1["default"].connect('mongodb://localhost/produit');
mongoose_1["default"].Promise = global.Promise;


app.use(morgan_1["default"]('dev'));
app.use(body_parser_1["default"].json());
app.use(body_parser_1["default"].urlencoded({ extended: false }));

app.use('/api/orders', passport_1["default"].authenticate('jwt', { session: false }), orders_1["default"]);

app.use('/api/products', products_1["default"]);

app.use(error_1["default"]);

//app.use('/', express_1["default"].static(path_1["default"].join(import.meta, 'public')));
var port = (_a = process.env.port) !== null && _a !== void 0 ? _a : 4000;
app.listen(port, function () { return console.log("Listening on localhost:" + port); });