'use strict';
const userAdminSeeder = require("./user.admin.seeder");
const userStudentSeeder = require("./user.student.seeder");
const orderSeeder = require("./order.seeder");
const { dbConnect } = require("../helpers");

let exitAfterSeeding = false;

module.exports = {
    seedAll: async () => {
        await dbConnect().then(async () => {
            await userAdminSeeder.seed(1);
            await userStudentSeeder.seed(5);
            await orderSeeder.seed(10);
        }).catch(err => console.log(`Failed to run seeders because:\n${err}`));
        if(exitAfterSeeding) process.exit();
    }
}

if(process.argv.includes('seed')) {
    exitAfterSeeding = true;
    module.exports.seedAll();
}