module.exports = (sequelize, Sequelize) => {
    const Canvas = sequelize.define("canvas", {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        canvasData: {
            type: Sequelize.JSON,
            field: 'canvasData'
        },
        uid: {
            type: Sequelize.STRING,
            field: 'uid'
        }
    }, {
        tableName: 'canvas',
        timestamps: false
    }
    );

    return Canvas;
};