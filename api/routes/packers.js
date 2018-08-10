const express = require('express');

const pool = require('../utils/db');
const {
  OK, CLIENT_ERROR, SERVER_ERROR,
} = require('../utils/status');

const router = express.Router();

router.post('/', async(req, res) => {
  let packerFirstName;
  let packerMiddleInitial;
  let packerLastName;
  let packerBadgeID;

  try {
    packerFirstName = req.body.packerFirstName;
    packerMiddleInitial = req.body.packerMiddleInitial;
    packerLastName = req.body.packerLastName;
    packerBadgeID = req.body.packerBadgeID;
  } catch (err) {
    /* The request was malformed, so return a client error. */
    console.error(err);
    return res.sendStatus(CLIENT_ERROR);
  }

  const connection = await pool.getConnection();

  connection.beginTransaction();
  try {
    const addEmployeeResults = (await connection.query(`
            INSERT INTO Employee (employee_firstname, employee_middleinitial, employee_lastname)
            VALUES(?, ?, ?)
        `,
    [
      packerFirstName, packerMiddleInitial, packerLastName,
    ]))[0];
    const employeeId = addEmployeeResults.insertId;

    await connection.query(`
            INSERT INTO Packer (packer_code, employee_id)
            VALUES(?, ?)
        `,
    [
      packerBadgeID, employeeId,
    ]);

    connection.commit();
  } catch (err) {
    console.error(err);
    connection.rollback();
    return res.sendStatus(SERVER_ERROR);
  }
  connection.release();

  return res.sendStatus(OK);
});

router.get('/', async(req, res) => {
  let allPackers;

  try {
    allPackers = (await pool.query(`
            SELECT packer_id, packer_code, employee_firstname, employee_middleinitial, employee_lastname
            FROM Packer
            INNER JOIN Employee ON Packer.employee_id = Employee.employee_id
            WHERE packer_isactive = True
        `))[0];
  } catch (err) {
    console.error(err);
    return res.sendStatus(SERVER_ERROR);
  }

  return res.json(allPackers);
});

router.delete('/', async(req, res) => {
  let packerID;

  try {
    packerID = req.body.packer_id;
  } catch (err) {
    /* The request was malformed, so return a client error. */
    console.error(err);
    return res.sendStatus(CLIENT_ERROR);
  }

  const connection = await pool.getConnection();

  connection.beginTransaction();
  try {
    await connection.query(`
            UPDATE Packer
            SET packer_isactive=False
            WHERE packer_id=?
        `,
    [
      packerID,
    ]);

    connection.commit();
  } catch (err) {
    console.error(err);
    connection.rollback();
    return res.sendStatus(SERVER_ERROR);
  }
  connection.release();
  return res.sendStatus(OK);
});

module.exports = router;
