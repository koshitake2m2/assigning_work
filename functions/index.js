const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// firebase コンソールから直接追加した時
exports.addAdminClaim = functions.firestore.document('admin_users/{docID}').onCreate((snap) => {
  const newAdminUser = snap.data();
  if (newAdminUser === undefined) return;
  modifyAdmin(newAdminUser.uid, true);
});

// firebase コンソールから直接削除した時
exports.removeAdminClaim = functions.firestore.document('admin_users/{docID}').onDelete((snap) => {
  const deletedAdminUser = snap.data();
  if (deletedAdminUser === undefined) return;
  modifyAdmin(deletedAdminUser.uid, false);
});

function modifyAdmin(uid, isAdmin) {
  admin.auth().setCustomUserClaims(uid, {
      admin: isAdmin
    }).then(() => {})
    .catch(error => {
      console.log(error);
    });
}