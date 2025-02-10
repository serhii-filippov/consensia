import mongoose, {
  Document,
  Schema,
} from 'mongoose';

export interface ICustomerPoints extends Document {
  customerId: string;
  points?: number;
  orderId?: string;
  lastUpdated?: Date;
}

const CustomerPointsSchema: Schema = new Schema({
  customerId: { type: String, required: true, unique: false },
  orderId: { type: String, required: false, default: null },
  points: { type: Number, required: false, default: 0 },
  lastUpdated: { type: Date, required: false, default: Date.now },
});

export default mongoose.model<ICustomerPoints>('CustomerPoints', CustomerPointsSchema);