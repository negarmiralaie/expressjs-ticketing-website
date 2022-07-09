const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        // If we don't have req and roles as well....
        if (!req?.roles) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        console.log('rolesArray', rolesArray);
        // req.roles comes from jwt
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        console.log('result', result);

        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles