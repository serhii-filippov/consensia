import mongoose, {
  Document,
  Schema,
} from 'mongoose';

export interface IOrders extends Document {
  orderId: string;
  customerId: string;
  points?: number;
  lastUpdated?: Date;
}

const OrdersSchema: Schema = new Schema({
  orderId: { type: String, required: true, unique: true },
  customerId: { type: String, required: true, unique: false },
  points: { type: Number, required: false, default: 0 },
  lastUpdated: { type: Date, required: false, default: Date.now },
});

export default mongoose.model<IOrders>('Orders', OrdersSchema);