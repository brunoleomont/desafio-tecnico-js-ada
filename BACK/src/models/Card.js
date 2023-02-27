import Sequelize from 'sequelize';
import sequelize from '../db.js';

const schema = 'kanban';

export class Card extends Sequelize.Model {}
Card.init({
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true},
    titulo: Sequelize.STRING,
    conteudo: Sequelize.TEXT,
    lista: Sequelize.STRING
}, {sequelize, modelName: 'card', schema});

sequelize.sync();

export default Card;