module.exports = (sequelize, Sequelize) => {
    const Feedback = sequelize.define("feedback", {
        firstName: {
            type: Sequelize.STRING,
            field: 'firstname'
        },
        email: {
            type: Sequelize.STRING,
            field: 'email'
        },
        subject: {
            type: Sequelize.STRING,
            field: 'subject'
        },
        message: {
            type: Sequelize.STRING,
            field: 'message'
        },
        dateTime: {
            type: Sequelize.DATE,
            field: 'datetime'
        }
    }, {
        tableName: 'feedback',
        timestamps: false
    }
    );

    return Feedback;
};