module.exports = function(sequelize, DataTypes) {
    var FeedbackPost = sequelize.define("FeedbackPost", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      }
    });
  
    FeedbackPost.associate = function(models) {
      // We're saying that a Post should belong to an coach
      // A Post can't be created without an Coach or player due to the foreign key constraint
      FeedbackPost.belongsTo(models.Coach, {
        foreignKey: {
          allowNull: false
        },
        onDelete: "cascade"
      });
      FeedbackPost.belongsTo(models.Player, {
        foreignKey: {
          allowNull: false
        },
        onDelete: "cascade"
      });
    };
  
    return FeedbackPost;
  };
  