module.exports = function(sequelize, DataTypes ){

    const Coach = sequelize.define("Coach",{

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
        bio:{
            type:DataTypes.TEXT
        },
        certified: {
            type:DataTypes.STRING
        },
        wordRole: {
            type:DataTypes.STRING
        }

    });

    return Coach;

};