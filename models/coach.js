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
            type:DataTypes.STRING
        },
        bio:{
            type:DataTypes.TEXT
        },
        certified: {
            type:DataTypes.STRING
        },
        worKRole: {
            type:DataTypes.STRING
        }

    });


    Coach.associate = function(models) {
        // Associating Coach with Posts
        // When an Coach is deleted, also delete any associated Posts
        Coach.hasMany(models.FeedbackPost, {
          onDelete: "cascade"
        });

        Coach.hasMany(models.LessonRequest, {
          onDelete: "cascade"
        });
      };

    return Coach;

};