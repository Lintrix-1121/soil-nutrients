const db = require("../models");
const Embedded = db.embedded;

const moment = require("moment-timezone");
const { Op } = require("sequelize");

exports.SensorData = (req, res) => {
  const sensorData = {
    moisture: req.body.moisture,
    nitrogen: req.body.nitrogen,
    phosphorus: req.body.phosphorus,
    potassium: req.body.potassium,
    time: moment().tz("Africa/Nairobi").format("YYYY-MM-DD HH:mm:ss"), // Add time in EAT
  };

  Embedded.create(sensorData)
    .then(data => {
      res.send({
        status: "success",
        status_code: 200,
        result: data,
      });
    })
    .catch(err => {
      res.send({
        status: "error",
        status_code: 500,
        message: err.message || "Error saving sensor data",
      });
    });
};

exports.GetData = (req, res) => {
    Embedded.findAll({
      order: [['time', 'ASC']], // Sort by time in ascending order
    })
      .then(data => {
        res.send({
          status: "success",
          status_code: 200,
          message: "Data retrieved successfully",
          result: data,
        });
      })
      .catch(err => {
        res.send({
          status: "error",
          status_code: 500,
          message: err.message || "Failed to retrieve data",
        });
      });
  };

// exports.SensorData = (req, res) => {
//   const sensorData = {
//       moisture: req.body.moisture,
//       nitrogen: req.body.nitrogen,
//       phosphorus: req.body.phosphorus,
//       potassium: req.body.potassium
//   };

//   Embedded.create(sensorData)
//       .then(data => {
//           res.send({
//               status: "success",
//               status_code: 200,
//               result: data
//           });
//       })
//       .catch(err => {
//           res.send({
//               status: "error",
//               status_code: 500,
//               message: err.message || "Error saving sensor data"
//           });
//       });
// };

// exports.GetData = (req, res) => {
//     Embedded.findAll()
//     .then(data => {
//         res.send({
//             status: "success",
//             status_code: 200,
//             message: "Data retrieved success",
//             result: data
//         });
//     })
//     .catch(err => {
//         res.send({
//             status: "Error",
//             status_code: 201,
//             message: err.message || "Failed to retrieve data"
//         });
//     });
// }



exports.GetDataLast3Hours = (req, res) => {
    const threeHoursAgo = moment().tz("Africa/Nairobi").subtract(3, "hours").format("YYYY-MM-DD HH:mm:ss");

    Embedded.findAll({
        where: {
            time: { [Op.gte]: threeHoursAgo }
        }
    })
    .then(data => {
        res.send({
            status: "success",
            status_code: 200,
            message: "Data retrieved successfully for the last 3 hours",
            result: data
        });
    })
    .catch(err => {
        res.send({
            status: "error",
            status_code: 201,
            message: err.message || "Failed to retrieve data"
        });
    });
};


exports.GetDataLast24Hours = (req, res) => {
    const twentyFourHoursAgo = moment().tz("Africa/Nairobi").subtract(24, "hours").format("YYYY-MM-DD HH:mm:ss");

    Embedded.findAll({
        where: {
            time: { [Op.gte]: twentyFourHoursAgo }
        }
    })
    .then(data => {
        res.send({
            status: "success",
            status_code: 200,
            message: "Data retrieved successfully for the last 24 hours",
            result: data
        });
    })
    .catch(err => {
        res.send({
            status: "error",
            status_code: 201,
            message: err.message || "Failed to retrieve data"
        });
    });
};


exports.GetDataLast4Days = (req, res) => {
    const fourDaysAgo = moment().tz("Africa/Nairobi").subtract(4, "days").format("YYYY-MM-DD HH:mm:ss");

    Embedded.findAll({
        where: {
            time: { [Op.gte]: fourDaysAgo }
        }
    })
    .then(data => {
        res.send({
            status: "success",
            status_code: 200,
            message: "Data retrieved successfully for the last 4 days",
            result: data
        });
    })
    .catch(err => {
        res.send({
            status: "error",
            status_code: 201,
            message: err.message || "Failed to retrieve data"
        });
    });
};
