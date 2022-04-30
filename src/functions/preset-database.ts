import roles from "../db/roles"

export = () => {
    roles.findOne({
        roles: [
            "admin",
            "debugger"
        ]
    })
}