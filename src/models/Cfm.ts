import mongoose, { Document, Schema } from 'mongoose';

export interface ICfm extends Document {
    name: string;
    email: string;
    phone: string;
    is_paid: boolean;
    event: string;
    date: string;
}

const cfmSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    is_paid: { type: Boolean, default: false },
    event: { type: String, default: '' },
    date: { type: String, default: new Date() },
});

export default mongoose.model<ICfm>('Cfm', cfmSchema);
