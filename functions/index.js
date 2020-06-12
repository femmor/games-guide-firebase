const functions = require('firebase-functions');
const admin = require("firebase-admin")

admin.initializeApp()


exports.addAdminRole = functions.https.onCall((data, context) => {
    // check if user is admin when making request
    if(context.auth.token.admin !== true) {
        return {
            error: `Error! Only Admin can add other admins`
        }
    }

    // get user and add custom claim to the user (admin)
    return admin.auth().getUserByEmail(data.email).then((user) => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        })
    }).then(() => {
        return {
            message: `Success! ${data.email} has been made an admin`
        }
    }).catch(error => console.log(error))
})