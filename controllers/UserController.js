const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const img = require("../config/Multer");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("username email phoneNumber role");
    if (users) {
      return res
        .status(200)
        .json({
          status: true,
          message: "Users retrieved successfully",
          users,
        });
    }
    return res.status(404).json({ message: "No users found" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Server error", error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    if (req.params.id === "undefined") {
      return res
        .status(400)
        .json({ status: false, message: "User ID is required" });
    }
    const user = await User.findById(req.params.id).select(
      "username email phoneNumber role"
    );

    if (user) {
      return res
        .status(200)
        .json({ status: true, message: "User retrieved successfully", user });
    }
    return res.status(404).json({ status: false, message: "User not found" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Server error", error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const email = req.user.email;
    const user = await User.find({ email }).select(
      "username email phoneNumber role"
    );
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "User not found" });
    }
    return res
      .status(200)
      .json({ status: true, message: "User retrieved successfully", user });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Server error", error: error.message });
  }
};


exports.imgUpload = (req, res) => {
  const upload = img.single("img");

  upload(req, res, function (err) {
    console.log(err);

    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          status: false,
          message: "File is too large. Maximum size is 3 MB.",
        });
      }
      if (err.message === "IMG_TYPE_ERROR") {
        return res.status(400).json({
          status: false,
          message: "Only png, jpg, svg are accepted",
        });
      }
      return res.status(500).json({
        status: false,
        message: "Something went wrong during upload",
        error: err.message,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        status: false,
        message: "Add Img profile..",
      });
    }

    // ✅ Use multer's generated filename
    const folder = req.body.role === "ADMIN" ? "admin" : "user";
    const imgPath = `http://localhost:3030/${folder}/${req.file.filename}`;

    return res.status(200).json({
      status: true,
      message: "Img uploaded successfully",
      url: imgPath,
    });
  });
};




exports.registerUser = async (req, res) => {
  try {
    const { username, email, img, phoneNumber, password, role } = req.body;
    if (!username) {
      return res
        .status(400)
        .json({ status: false, message: "Username is required" });
    }
    if (!img) {
      return res
        .status(400)
        .json({ status: false, message: "Image is required" });
    }
    if (!email) {
      return res
        .status(400)
        .json({ status: false, message: "Email is required" });
    }
    if (!phoneNumber) {
      return res
        .status(400)
        .json({ status: false, message: "Phone number is required" });
    }
    if (phoneNumber.length != 10) {
      return res
        .status(400)
        .json({ status: false, message: "Phone number must be 10 digits" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ status: false, message: "Password is required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: false, message: "Email already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      return res
        .status(500)
        .json({ status: false, message: "Error hashing password" });
    }
    const newUser = new User({
      username,
      img,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    const newUser1 = await User.findOne({ email }).select(
      "username email phoneNumber role"
    );

    return res
      .status(201)
      .json({
        status: true,
        message: "User registered successfully",
        user: newUser1,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Server error", error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { username, email, phoneNumber, password, role } = req.body;

    const updateUser = await User.findByIdAndUpdate(
      req.user.userId,
      { username, email, phoneNumber, password, role, updatedTime: Date.now() },
      { new: true }
    );
    if (updateUser) {
      return res
        .status(200)
        .json({
          success: true,
          message: "User updated successfully",
          user: updateUser,
        });
    }
    return res.status(404).json({ status: false, message: "User not found" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Server error", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    if(req.params.id === undefined){
      return res.status(400).json({status: false , message:"Id is required.."});
    }
    const deleted = await User.findByIdAndDelete(req.params.id);
    if(!deleted){
      return res.status(400).json({status:false,message : "deleteUser is not completed"});
    }
    return res.status(200).json({status : true , "message" : "user is deleted.."});

  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Server error", error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  // console.log(req);
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ status: false, message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "User not found" });
    }

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res
      .status(200)
      .json({ status: true, message: "Login successful", token });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Server error", error: error.message });
  }
};
