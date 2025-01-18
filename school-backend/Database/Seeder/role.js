const mongoose = require("mongoose");
require("dotenv").config();
const { IST } = require("../../Helpers/dateTime.helper");
const { connection } = require("../connection");

const Role = require("../Models/role.model");

// seeder data here

const data = [
  {
    role: "PRINCIPAL",
    role_active: true,
    created_at: IST(),
    updated_at: IST(),
  },
  {
    role: "TEACHER",
    role_active: true,
    created_at: IST(),
    updated_at: IST(),
  },
  {
    role: "LAB_ASSISTANT",
    role_active: true,
    created_at: IST(),
    updated_at: IST(),
  },

  {
    role: "STAFF",
    role_active: true,
    created_at: IST(),
    updated_at: IST(),
  },
  {
    role: "BACK_OFFICE",
    role_active: true,
    created_at: IST(),
    updated_at: IST(),
  },
  {
    role: "STUDENT",
    role_active: true,
    created_at: IST(),
    updated_at: IST(),
  },
];
const init = async (data) => {
  try {
    console.log("running seeder !");
    connection();
    Role.deleteMany({}, (error) => {
      if (error) {
        console.log(error);
      }
    });
    console.log("adding seeder record/s !");
    Role.insertMany(data, (error, docs) => {
      if (error) console.log(error);
      else console.log("DB seed complete");
      process.exit();
    });
    console.log("running seeder !");
  } catch (error) {
    console.log("Error seeding DB :: ", error?.message);
    process.exit();
  }
};

init(data);
