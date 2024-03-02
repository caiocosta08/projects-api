import mongoose, { Document, Schema } from 'mongoose';

export interface IBenfeitor extends Document {
    name: string;
    email: string;
    phone: string;
    data_de_aniversario: boolean;
    gostaria_whatsapp: string;
    forma_de_pagamento: string;
    valor: string;
    deseja_ser_lembrado: string;
    data_da_doacao: string;
    participa_da_cfm: string;
    obs: string;
    date: Date;
}

const benfeitorSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    data_de_aniversario: {type: String, default: null},
    gostaria_whatsapp: {type: String, default: null},
    forma_de_pagamento: {type: String, default: null},
    valor: {type: String, default: null},
    deseja_ser_lembrado: {type: String, default: null},
    data_da_doacao: {type: String, default: null},
    participa_da_cfm: {type: String, default: null},
    obs: {type: String, default: null},
    date: { type: String, default: new Date() },
});

export default mongoose.model<IBenfeitor>('Benfeitor', benfeitorSchema);
