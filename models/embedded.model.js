const moment = require("moment-timezone");

module.exports = (sequelize_config, Sequelize) => {
  const SensorData = sequelize_config.define('SensorData', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    moisture: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    nitrogen: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    phosphorus: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    potassium: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    time: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Use database's current timestamp
      get() {
        // Format the time in EAT (East Africa Time) when retrieving the data
        return moment(this.getDataValue('time')).tz("Africa/Nairobi").format("YYYY-MM-DD HH:mm:ss");
      },
    },
  });

  return SensorData;
};



// const moment = require("moment-timezone");
// module.exports = (sequelize_config, Sequelize) =>{
//     const Embedded = sequelize_config.define('SensorData', {
//         id: {
//           type: Sequelize.INTEGER,
//           primaryKey: true,
//           autoIncrement: true,
//         },
//         moisture: {
//           type: Sequelize.FLOAT,
//      },
//         nitrogen: {
//           type: Sequelize.FLOAT,
//         },
//         phosphorus: {
//           type: Sequelize.FLOAT,
//         },
//         potassium: {
//           type: Sequelize.FLOAT,
//         },
//         time: { 
//             type: Sequelize.DATE,
//             defaultValue: () => moment().tz("Africa/Nairobi").format("YYYY-MM-DD HH:mm:ss") // Ensures EAT time
//         }
//       });
//       return Embedded
      
// }
