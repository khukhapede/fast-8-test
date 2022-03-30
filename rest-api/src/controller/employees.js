const { companies, employees } = require("../../models");

const joi = require("joi");

const Sequelize = require("sequelize");

exports.addEmployees = async (req, res) => {
  const schema = joi.object({
    name: joi.string().min(3).max(50).required(),
    phone_number: joi.string().min(8).max(16),
    email: joi.string().email().min(5).required(),
    jobtitle: joi.string(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({
      status: 400,
      code: "400",
      data: null,
      message: error.details[0].message,
    });
  }

  try {
    const { name, phone_number, email, jobtitle } = req.body;
    const { company_id } = req.params;

    const companyCheck = await companies.findOne({
      where: {
        id: company_id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!companyCheck) {
      return res.status(400).send({
        status: "failed",
        message: "company does not exist",
      });
    }

    const emailCheck = await employees.findOne({
      where: {
        email,
      },
    });

    if (emailCheck) {
      return res.status(409).send({
        status: 409,
        code: "409",
        data: null,
        message: "Email already exist",
      });
    } else {
      await employees.create({
        name,
        phone_number,
        email,
        jobtitle,
        company_id,
      });
    }

    const resultCheck = await employees.findOne({
      where: {
        email,
      },
      attributes: ["id"],
      raw: true,
    });

    res.status(201).send({
      status: 201,
      code: "201",
      data: {
        id: resultCheck.id,
        company_id,
      },
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "failed",
      message: "internal server error",
    });
  }
};

exports.getEmployeesCo = async (req, res) => {
  try {
    const { id } = req.params;

    const companyCheck = await companies.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!companyCheck) {
      return res.status(400).send({
        status: "failed",
        message: "company does not exist",
      });
    }

    const employeesCoData = await companies.findOne({
      where: {
        id,
      },
      include: {
        model: employees,
        attributes: {
          exclude: ["createdAt", "updatedAt", "company_id", "email"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (employeesCoData.employees.length === 0) {
      res.status(422).send({
        status: 422,
        code: "422",
        data: null,
        message: "Data is not found",
      });
    } else {
      res.status(200).send({
        status: 200,
        code: "200",
        data: employeesCoData,
        message: "Success",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "failed",
      message: "internal server error",
    });
  }
};

exports.getEmployeesById = async (req, res) => {
  try {
    const { id } = req.params;

    const employeeData = await employees.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "email", "company_id"],
      },
    });

    if (!employeeData) {
      res.status(422).send({
        status: 422,
        code: "422",
        data: null,
        message: "Data is not found",
      });
    } else {
      res.status(200).send({
        status: 200,
        code: "200",
        data: employeeData,
        message: "Success",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "failed",
      message: "internal server error",
    });
  }
};

exports.updateEmployees = async (req, res) => {
  const schema = joi.object({
    name: joi.string().min(3).max(50).required(),
    phone_number: joi.string().min(8).max(16),
    email: joi.string().email().min(5),
    jobtitle: joi.string(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({
      status: 400,
      code: "400",
      data: null,
      message: error.details[0].message,
    });
  }
  try {
    const { name, phone_number, email, jobtitle } = req.body;
    const { company_id, employee_id } = req.params;

    const updateData = {
      name,
      phone_number,
      email,
      jobtitle,
    };

    if (email) {
      const emailCheck = await employees.findOne({
        where: {
          email,
        },
      });
      if (emailCheck) {
        return res.status(409).send({
          status: 409,
          code: "409",
          data: null,
          message: "Email already exist",
        });
      }
    }

    const employeeCheck = await employees.findOne({
      where: {
        id: employee_id,
        company_id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "email"],
      },
    });

    if (!employeeCheck) {
      return res.status(400).send({
        status: "failed",
        message: "employee does not exist",
      });
    }

    await employees.update(updateData, {
      where: {
        id: employee_id,
        company_id,
      },
    });

    res.status(201).send({
      status: 201,
      code: "201",
      data: {
        id: employee_id,
        company_id,
      },
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "failed",
      message: "internal server error",
    });
  }
};

exports.deleteEmployees = async (req, res) => {
  try {
    const { id } = req.params;

    const employeeCheck = await employees.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "email"],
      },
    });

    if (!employeeCheck) {
      return res.status(400).send({
        status: "failed",
        message: "employee does not exist",
      });
    } else {
      await employees.destroy({
        where: {
          id,
        },
      });
    }
    res.status(200).send({
      status: 200,
      code: "200",
      id,
      message: "Success deleted employee",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "failed",
      message: "internal server error",
    });
  }
};
