import User from "../models/user.models.js";
import Message from "../models/message.models.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsers = async (req, res) => {
  try {
    const loggedINUsersId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedINUsersId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in fetching LoggedInUsers: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user_id;

    const message = await Message.find({
      $or: [
        { senderId: senderId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: senderId },
      ],
    });
    res.status(200).json(message);
  } catch (error) {
    console.log("Error in getting the messages: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendMessages = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user_id;
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newmessage = {
      senderId,
      receiverId,
      text,
      image: imageUrl,
    };

    await message.save();

    //todo: realtime

    res.status(201).json(newmessage);
  } catch (error) {
    console.log("Error in sending the message", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
