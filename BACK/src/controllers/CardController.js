import Card from '../models/Card.js';
import Sequelize from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

export async function list(req, res) {
    try {
        const cardList = await Card.findAll()
        return res.json(cardList);
    } catch (err) {
        return console.error("Erro na listagem: ", err);
    }
}

export async function show(req, res) {
    const id = req.params.id;
    try {
        const card = await Card.findOne({ where: { id: id } });
        return res.json(card);
    } catch (err) {
        return console.error("Erro na busca: ", err);
    }
}

export async function create(req, res) {
    const { titulo, conteudo, lista } = req.body;
    if (!titulo || !conteudo || !lista) return res.status(400).json({ msg: 'Params error' });

    try {
        const card = await Card.create({ id: uuidv4(), titulo, conteudo, lista });
        return res.json(card);
    } catch (err) {
        return console.error('Erro na criação', err);
    }
}

export async function update(req, res) {
    const Op = Sequelize.Op
    const { id, titulo, conteudo, lista } = req.body;
    try {
        await Card.update({ titulo, conteudo, lista }, { where: { id: { [Op.eq]: id } } });
        const card = await Card.findOne({ where: { id: id } })
        return res.json(card);
    } catch (err) {
        return res.status(500).json({ msg: `Card ${titulo} não foi atualizado` }, err);
    }
}

export async function remove(req, res) {
    const id = req.params.id;
    try {
        await Card.destroy({ where: { id: id } });
        return res.status(204).json({ msg: `Exclusão de item de ID ${req.params.id} feita com sucesso!` });
    } catch (err) {
        console.error("Erro na exclusão: ", err);
        return res.status(400).json({ msg: `Bad request` });
    }
}

export async function myLogger(req, res, next) {
    if (!req.method === 'DELETE' && !req.method === 'PUT') next();
    
    const operacao = req.method === 'DELETE' ? 'Removido' : 'Alterado';
    const dateTime = new Date().toLocaleString('pt-br');
    const card = await Card.findOne({ where: { id: req.params.id } })
    console.info(`${dateTime} - Card ${card.id} - ${card.titulo} - ${operacao}`);
    next();
}

export async function validate(req, res, next) {
    if (req.method === 'PUT') {
        const { id, titulo, conteudo, lista } = req.body;
        const idUrl = req.params.id;
    
        if (idUrl !== id) return res.status(400).json({ msg: 'URL id and body id are diferent' });
    
        if (!id || !titulo || !conteudo || !lista) return res.status(400).json({ msg: 'Params error' });
    }

    const card = await Card.findOne({ where: { id: req.params.id } })
    if (!card) return res.status(404).json({ msg: 'Not found' });
    next();
}
