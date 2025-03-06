module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "Frank",
    dialect: "mysql",
    pool: {
        max: 5000,
        min: 0,
        acquire: 3000,
        idle:1000
    }
};