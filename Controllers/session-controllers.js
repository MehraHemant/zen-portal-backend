import session from "../Modules/Sessions.js";

export const addSessions = (req, res) => {
  const {
    sessionType,
    title,
    time,
    contents,
    pre_read,
    activities,
    batch,
    completed,
  } = req.body;
  const sessions = new session({
    sessionType,
    title,
    time,
    contents: contents.split(","),
    pre_read: pre_read.split(","),
    activities: activities.split(","),
    batch: batch.split(","),
    completed,
  });
  try {
    sessions.save();
    res.send({ success: true, sessions });
  } catch (err) {
    console.log(err);
  }
};

export const getAllSessions = async (req, res) => {
  let sessions;
  try {
    sessions = await session.find();
  } catch (err) {
    console.log(err);
  }
  if (!sessions) {
    return res.status(404).send({sucess: false, sessions})
  }
  return res.status(200).send({sucess: true, sessions});
};
