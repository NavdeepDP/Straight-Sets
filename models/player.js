module.exports = function(sequelize, DataTypes ){

    const Player = sequelize.define("Player",{

        fullName: {
              type: DataTypes.STRING,
              allowNull: false,
              validate: {
                notNull: {
                  msg: 'Please enter your name'
                }
              }

        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true
            }
        },
        phone:{
            type:DataTypes.INTEGER
        },
        ustaId:{
            type:DataTypes.INTEGER,
            allowNull: true,
        },
        utrRating:{
            type:DataTypes.INTEGER,
            allowNull: true,

        },
        level:{
            type: DataTypes.ENUM,
            values:["beginner", "intermediate", "advanced"]

        }

    });

    return Player;

};