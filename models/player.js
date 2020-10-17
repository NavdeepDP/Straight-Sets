// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
module.exports = function (sequelize, DataTypes) {

    const Player = sequelize.define("Player", {

        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
            //   validate: {
            //     notNull: {
            //       msg: 'Please enter your name'
            //     }
            //   }

        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        phone: {
            type: DataTypes.STRING
        },
        ustaId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        utrRating: {
            type: DataTypes.INTEGER,
            allowNull: true,

        },
        level: {
            type: DataTypes.ENUM,
            values: ["beginner", "intermediate", "advanced"]

        },
        dateOfBirth:{
            type:DataTypes.DATEONLY,
            allowNull: false
        }
        // The password cannot be null
        // password: {
        //     type: DataTypes.STRING,
        //     defaultValue: "password",
        //     allowNull: false
        // }

    });


    Player.associate = function (models) {
        // Associating Coach with Posts
        // When an Coach is deleted, also delete any associated Posts
        Player.hasMany(models.FeedbackPost, {
            onDelete: "cascade"
        });
        Player.hasMany(models.LessonRequest, {
            onDelete: "cascade"
        });
    };


    return Player;

};