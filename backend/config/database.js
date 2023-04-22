const mongooes = require("mongoose");

const connectDatabase = async () => {
  await mongooes.connect(process.env.DB_URI, {}).then((con) => {
    console.log("Mongodb connected with server");
    //console.log(con);
  });
};

module.exports = connectDatabase;
