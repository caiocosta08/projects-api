import axios from 'axios';
import { Router } from 'express';
import Carteira from '../models/Carteira';
import Usuario, { IUsuario } from '../models/Usuario';

const router = Router();

// POST: Cria um novo usuário
router.post('/usuarios', async (req, res) => {
    try {
        const usuario: IUsuario = new Usuario(req.body);
        await usuario.save();
        res.status(201).send(usuario);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// GET: Lista todos os usuários
router.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).send(usuarios);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// GET: Obtém um usuário por ID
router.get('/usuarios/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).send(usuario);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// GET: Obtém um usuário por E-mail
router.get('/usuarios/email/:email', async (req, res) => {
    try {
        var usuario: any = await Usuario.findOne({ email: req.params.email });
        if (!usuario) {
            return res.status(404).send('Usuário não encontrado');
        }
        const carteira = await Carteira.findOne({ usuarioId: usuario._id });
        usuario = {
            _id: usuario._id,
            email: usuario.email,
            tipo: usuario.tipo,
            carteira
        }
        res.status(200).send(usuario);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// PUT: Atualiza um usuário
router.put('/usuarios/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!usuario) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).send(usuario);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// DELETE: Deleta um usuário por ID
router.delete('/usuarios/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuario) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).send({ message: 'Usuário deletado com sucesso' });
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// WEBHOOK
router.post('/webhook', async (req, res) => {
    try {
        const data = req.body
        console.log(data)

        if (data?.token) {

            // Procura se o status é aprovado
            const status: number = data?.sales_status_enum || -1;

            // 1  => 'Pendente',
            // 2  => 'Aprovado',
            // 3  => 'Processando',
            // 4  => 'Mediação',
            // 5  => 'Rejeitado',
            // 6  => 'Cancelado',
            // 7  => 'Devolvido',
            // 8  => 'Autorizado',
            // 9  => 'Cobrado de volta',
            // 10 => 'Completo',
            // 11 => 'Erro de Checkout',
            // 12 => 'Pré-checkout',
            // 13 => 'Expirado',
            // 16 => 'Revisão'


            // Tem cliente
            const codigoDoProduto: string = data?.product?.code || '';
            if (!codigoDoProduto || codigoDoProduto === '') throw new Error('Código do produto não encontrado')
            const emailDoUsuario: string = data?.customer?.email || '';
            if (!emailDoUsuario || emailDoUsuario === '') throw new Error('Usuário não encontrado')
            const tipo: string = codigoDoProduto === "PPPB67OT" ? 'basico' : (codigoDoProduto === 'PPPB67P3' ? 'premium' : '');
            if (!tipo || tipo === '') throw new Error('Tipo do usuário não encontrado')

            const usuarioExiste = await Usuario.findOne({ email: emailDoUsuario })

            if (!usuarioExiste && status === 2) {
                const usuario: IUsuario = new Usuario({ email: emailDoUsuario, tipo });
                await usuario.save();
            }

            if (usuarioExiste && (status === 7) ) {
                await Usuario.findByIdAndRemove(usuarioExiste._id)
            }
        }

        res.status(200).send({ status: true })
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// WEBHOOK
router.get('/webhook', async (req, res) => {
    try {
        res.status(200).send({ status: true })
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

export default router;
