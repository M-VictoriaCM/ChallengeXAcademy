const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const Player = sequelize.define( "male_players", {
  fifa_version: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'default_version'
  },
  fifa_update_date:{
    type: DataTypes.DATE,
    defaultValue:DataTypes.NOW
  },
  fifa_update:{
    type: DataTypes.STRING,
    allowNull:true,
    defaultValue:'2'
  },
  player_face_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  long_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  short_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  player_positions: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  overall:{
    type:DataTypes.INTEGER,
    allowNull:false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  height_cm:{
    type:DataTypes.INTEGER,
    defaultValue:null
  },
  weight_kg:{
    type:DataTypes.INTEGER,
    defaultValue:null
  },
  player_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    club_name: {
      type: DataTypes.STRING,
      defaultValue:null
    },
    nationality_name: {
      type: DataTypes.STRING,
      defaultValue:null
    },
    potential: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    skill_moves: {
      type: DataTypes.INTEGER,
      defaultValue:null
    },
    international_reputation: {
      type: DataTypes.INTEGER,
      defaultValue:null
    },
    work_rate: {
      type: DataTypes.STRING,
      defaultValue:null
    },
    
    
},{
    createdAt:false,
    updatedAt:false,
    timestamps:false
});

module.exports = Player;
