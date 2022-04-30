import roles from "../db/roles"

const roles_that_relate_bot = [
    "admin",
    "debugger"
];

export = async () => {

    const find = await roles.findOne();
    if(find) {
        roles.findOneAndUpdate({}, {
            roles: roles_that_relate_bot
        })
    } else {
        await new roles({
            roles: roles_that_relate_bot
        }).save();
    }
}