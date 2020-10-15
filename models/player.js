module.exports = function(sequelize, DataTypes ){

    const Player = sequelize.define("Player",{

        fullName: {
              type: DataTypes.STRING,
              allowNull: false,
            //   validate: {
            //     notNull: {
            //       msg: 'Please enter your name'
            //     }
            //   }

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
            type:DataTypes.STRING
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


    Player.associate = function(models) {
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