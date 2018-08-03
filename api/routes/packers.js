const express = require('express');

const pool = require('../utils/db');

const router = express.Router();

router.post('/', async (req, res, next) => {
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
        console.log(err);
        return res.sendStatus(400);
    }

    const connection = await pool.getConnection();
    connection.beginTransaction();
    try {
        const addEmployeeResults = (await connection.query(`
            INSERT INTO Employee (employee_firstname, employee_middleinitial, employee_lastname)
            VALUES(?, ?, ?)
        `,
        [ packerFirstName, packerMiddleInitial, packerLastName ]))[0];
        console.log('1')
        const employeeId = addEmployeeResults.insertId
        const addPackerResults = (await connection.query(`
            INSERT INTO Packer (packer_code, employee_id)
            VALUES(?, ?)
        `,
        [ packerBadgeID, employeeId ]))[0];
        console.log('2');
        connection.commit();
    } catch(err) {
        console.log(err);
        connection.rollback();
        return res.sendStatus(500);
    }
    
    return res.sendStatus(200);
});

router.get('/', async (req, res, next) => {
    const allPackers = (await pool.query(`
        SELECT packer_id, packer_code, employee_firstname, employee_middleinitial, employee_lastname
        FROM Packer
        INNER JOIN Employee ON Packer.employee_id = Employee.employee_id
        WHERE packer_isactive = True
    `))[0];
    return res.json(allPackers);
});

router.delete('/', async (req, res, next) => {
    let packerId;
    try {
        packerId = req.body.packerId;
    } catch (err) {
        /* The request was malformed, so return a client error. */
        console.log(err);
        return res.sendStatus(400);
    }

    const connection = await pool.getConnection();
    connection.beginTransaction();
    try {
        
        const addEmployeeResults = (await connection.query(`
            INSERT INTO Employee (employee_firstname, employee_middleinitial, employee_lastname)
            VALUES(?, ?, ?)
        `,
        [ packerFirstName, packerMiddleInitial, packerLastName ]))[0];
        console.log('1')
        const employeeId = addEmployeeResults.insertId
        const addPackerResults = (await connection.query(`
            INSERT INTO Packer (packer_code, employee_id)
            VALUES(?, ?)
        `,
        [ packerBadgeID, employeeId ]))[0];
        console.log('2');
        connection.commit();
    } catch(err) {
        console.log(err);
        connection.rollback();
        return res.sendStatus(500);
    }
    
    return res.sendStatus(200);
});

module.exports = router;
