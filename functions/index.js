const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.helloBloggers = functions.https.onRequest(async (request, response) => {
  const data = await subCollectionNotification();
  response.send(data);
});
const subCollectionNotification = async currentUser => {
  const listUserResult = await admin.auth().listUsers();
  const userWatch = {};
  listUserResult.users.forEach(({ uid }) => {
    console.log(uid, currentUser);
    if (uid !== currentUser) {
      userWatch[uid] = {
        seen: false
      };
    }
  });
  return userWatch;
};
const createNotification = async (notification, uid, createdDate) => {
  try {
    const cNotification = await admin
      .firestore()
      .collection("notifications")
      .add(notification);
    if (!cNotification) return;
    const userList = await subCollectionNotification(uid);
    const notifyUser = await admin
      .firestore()
      .collection("notifyUser")
      .doc(cNotification.id)
      .set({ ...userList, time: createdDate });
    if (!notifyUser) return console.log("somethign Galat");
    return console.log("successfully created");
  } catch (err) {
    console.log(err);
  }
  // admin
  //   .firestore()
  //   .collection("notifications")
  //   .add(notification)
  //   .collection("userWatch")
  //   .add(subCollectionNotification())
  //   .then(doc => console.log("notification added", doc));
};

exports.blogCreated = functions.firestore
  .document("blogs/{blogId}")
  .onCreate((doc, context) => {
    const blog = doc.data();
    const createdDate = admin.firestore.FieldValue.serverTimestamp();
    const notification = {
      type: "Blog Created",
      notifyID: context.params.blogId,
      content: blog.title,
      user: blog.authorName,
      time: createdDate
    };
    return createNotification(notification, blog.authorId, createdDate);
  });
