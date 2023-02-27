import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('kanban', 'root', 'root', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './data/database.sqlite'
});

export default sequelize;