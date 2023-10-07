import mongoose, { Document, Schema } from 'mongoose';

export interface ICfm extends Document {
    name: string;
    email: string;
    phone: string;
}

const cfmSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
});

export default mongoose.model<ICfm>('Cfm', cfmSchema);
