import mongoose, { Document, Schema } from 'mongoose';

export interface IUsuario extends Document {
    email: string;
    dataDaCompra: Date;
    tipo: 'basico' | 'premium';
}

const usuarioSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    dataDaCompra: { type: Date, default: new Date()},
    tipo: { type: String, enum: ['basico', 'premium'], default: 'basico' }
});

export default mongoose.model<IUsuario>('Usuario', usuarioSchema);
