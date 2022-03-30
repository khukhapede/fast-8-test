const express = require("express");
const router = express.Router();

const {
  addCompanies,
  getCompanies,
  updateActive,
} = require("../controller/companies");

const {
  addEmployees,
  getEmployeesCo,
  getEmployeesById,
  updateEmployees,
  deleteEmployees,
} = require("../controller/employees");

router.post("/companies", addCompanies);
router.get("/companies", getCompanies);
router.put("/companies/:id/set_active", updateActive);

router.post("/companies/:company_id/employees", addEmployees);
router.get("/companies/:id/employees", getEmployeesCo);
router.get("/employees/:id", getEmployeesById);
router.put("/companies/:company_id/employees/:employee_id", updateEmployees);
router.delete("/employees/:id", deleteEmployees);
module.exports = router;
