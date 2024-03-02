import axios from 'axios';
import { Router } from 'express';
import Carteira from '../models/Carteira';
import Benfeitor, { IBenfeitor } from '../models/Benfeitor';

const router = Router();

// POST: Cria um novo usuário
router.post('/benfeitor', async (req, res) => {
    try {
        const usuario: IBenfeitor = new Benfeitor(req.body);
        await usuario.save();
        res.status(201).send(usuario);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// GET: Lista todos os usuários
router.get('/benfeitor', async (req, res) => {
    try {
        const benfeitor = await Benfeitor.find();
        res.status(200).send(benfeitor);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// GET: Obtém um usuário por ID
router.get('/benfeitor/:id', async (req, res) => {
    try {
        const usuario = await Benfeitor.findById(req.params.id);
        if (!usuario) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).send(usuario);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// PUT: Atualiza um usuário
router.put('/benfeitor/:id', async (req, res) => {
    try {
        const usuario = await Benfeitor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!usuario) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).send(usuario);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// DELETE: Deleta um usuário por ID
router.delete('/benfeitor/:id', async (req, res) => {
    try {
        const usuario = await Benfeitor.findByIdAndDelete(req.params.id);
        if (!usuario) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).send({ message: 'Usuário deletado com sucesso' });
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});


export default router;
