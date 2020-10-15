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
            type: DataTypes.INTEGER,
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
        // The password cannot be null
        password: {
            type: DataTypes.STRING,
            defaultValue: "password",
            allowNull: false
        }

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


    // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    Player.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    Player.addHook("beforeCreate", function (player) {
        player.password = bcrypt.hashSync(player.password, bcrypt.genSaltSync(10), null);
    });
    return Player;

};