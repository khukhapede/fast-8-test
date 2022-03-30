const { companies, employees } = require("../../models");

const joi = require("joi");

const Sequelize = require("sequelize");

exports.addCompanies = async (req, res) => {
  const schema = joi.object({
    name: joi.string().min(3).max(50).required(),
    telephone_number: joi.string().min(8).max(16),
    address: joi.string().min(10).max(50).required(),
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
    let { company_name, telephone_number, address } = req.body;
    company_name = company_name.toLowerCase();

    const duplicateCheck = await companies.findOne({
      where: {
        company_name,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    console.log(duplicateCheck);

    if (duplicateCheck) {
      return res.status(409).send({
        status: 409,
        code: "409",
        data: null,
        message: "Company Name already exist",
      });
    } else {
      await companies.create({
        company_name,
        telephone_number,
        address,
      });
    }

    const resultCheck = await companies.findOne({
      where: {
        company_name,
      },
      attributes: ["id"],
      raw: true,
    });
    res.status(201).send({
      status: 201,
      code: "201",
      data: resultCheck,
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

exports.getCompanies = async (req, res) => {
  try {
    const companiesCount = await companies.count({
      distinct: true,
      col: "company_name",
    });
    const companiesData = await companies.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!companiesData) {
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
        counts: companiesCount,
        rows: companiesData,
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

exports.updateActive = async (req, res) => {
  try {
    const { id } = req.params;

    const activeCheck = await companies.findOne({
      where: {
        id,
      },
      attributes: ["is_active"],
      raw: true,
    });
    if (!activeCheck) {
      return res.status(422).send({
        status: 422,
        code: "422",
        data: null,
        message: "Data is not found",
      });
    } else if (activeCheck.is_active === 1) {
      return res.status(400).send({
        status: 400,
        code: "400",
        data: null,
        message: "Company is already active",
      });
    } else {
      await companies.update(
        { is_active: 1 },
        {
          where: {
            id,
          },
        }
      );
    }

    res.status(201).send({
      status: 201,
      code: "201",
      data: {
        id,
        is_active: true,
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
