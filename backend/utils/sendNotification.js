module.exports.sendNotification = async (token, title, body) => {
  try {
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: token,
        title,
        body,
      }),
    });
    res.status(200).send("Notification sent");
  } catch (error) {
    console.log("Error while sending notification : ", error);
    return error;
  }
};
