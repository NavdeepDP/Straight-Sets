var bcrypt = require("bcryptjs");
module.exports = function (sequelize, DataTypes) {

  const Coach = sequelize.define("Coach", {

    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your name'
        }
      }

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
      type: DataTypes.STRING,
      allowNull: false
    },
    bio: {
      type: DataTypes.TEXT
    },
    certified: {
      type: DataTypes.STRING
    },
    // // The password cannot be null
    // password: {
    //   type: DataTypes.STRING,
    //   defaultValue: "password",
    //   allowNull: false
    // }

  },
  { timestamps: false });


  Coach.associate = function (models) {
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