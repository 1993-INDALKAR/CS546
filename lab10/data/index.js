const bcrypt = require('bcrypt');

async function hashing(password) {

    // console.log(password);


     bcrypt.hash(password, 16, async function (err, hash) {
        // let hashStatus = await bcrypt.compare(password, "$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD.");
        // console.log(hashStatus);
        let hashStatus =  await bcrypt.compare(password, "$2a$16$SsR2TGPD24nfBpyRlBzINeGU61AH0Yo/CbgfOlU1ajpjnPuiQaiDm");
        console.log(hashStatus);
        //  hashStatus = await bcrypt.compare(password, "$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK");
        // console.log(hashStatus);
        if(hashStatus != undefined || hashStatus != null)
        return hashStatus;
    });

}

function hashChecking(password,hashed){

return bcrypt.compare(password,hashed);

}

module.exports = {
    hashing,
    hashChecking
}