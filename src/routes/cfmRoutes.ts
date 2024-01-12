import axios from 'axios';
import { Router } from 'express';
import Carteira from '../models/Carteira';
import Cfm, { ICfm } from '../models/Cfm';

const router = Router();

// POST: Cria um novo usuário
router.post('/cfm', async (req, res) => {
    try {
        const usuario: ICfm = new Cfm(req.body);
        await usuario.save();
        res.status(201).send(usuario);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// GET: Lista todos os usuários
router.get('/cfm', async (req, res) => {
    try {
        const cfm = await Cfm.find({ event: 'Livres de Toda Maldição'});
        res.status(200).send(cfm);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// GET: Lista todos os usuários
router.get('/cfm_confirm_payment/:id', async (req, res) => {
    try {
        const cfm = await Cfm.findOneAndUpdate({ _id: req.params.id }, { is_paid: true });
        res.status(200).send(cfm);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// GET: Lista todos os usuários
router.get('/cfm_confirm_not_paid/:id', async (req, res) => {
    try {
        const cfm = await Cfm.findOneAndUpdate({ _id: req.params.id }, { is_paid: false });
        res.status(200).send(cfm);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// GET: Obtém um usuário por ID
router.get('/cfm/:id', async (req, res) => {
    try {
        const usuario = await Cfm.findById(req.params.id);
        if (!usuario) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).send(usuario);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// PUT: Atualiza um usuário
router.put('/cfm/:id', async (req, res) => {
    try {
        const usuario = await Cfm.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!usuario) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).send(usuario);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// DELETE: Deleta um usuário por ID
router.delete('/cfm/:id', async (req, res) => {
    try {
        const usuario = await Cfm.findByIdAndDelete(req.params.id);
        if (!usuario) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).send({ message: 'Usuário deletado com sucesso' });
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});


export default router;
