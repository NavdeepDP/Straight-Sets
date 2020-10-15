module.exports = function(sequelize, DataTypes) {
    var LessonRequest = sequelize.define("LessonRequest", {
      date:{
         type:DataTypes.DATEONLY
      },
      time:{
         type: DataTypes.STRING
      },
      status: {
        type: DataTypes.ENUM,
        defaultValue:`pending`,
        values: ['confirmed', 'pending', 'cancelled']
      }
    });
  
    LessonRequest.associate = function(models) {
      // We're saying that a Post should belong to an coach
      // A Post can't be created without an Coach or player due to the foreign key constraint
      LessonRequest.belongsTo(models.Coach, {
        foreignKey: {
          allowNull: false
        }
      });
      LessonRequest.belongsTo(models.Player, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return LessonRequest;
  };
  