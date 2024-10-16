import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res) => { 

    // get user details from frontend username, fullname and other..
    // validation, not empty
    // check if user already exits - username or email
    // check for images, check for avater
    // upload them to cloudinary, again check avater
    // create user object - create entry in db
    // remove the password and refresh token field from response
    // check for user creation
    // return res

    const  { fullname, email, username, password } = req.body

    if(
        [fullname, email, username, password].some((field)=> field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = User.findOne({
        $or: [{ username },{ email }]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exits")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400,"Avatar file is required");
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage.url || "",
        password,
        email,
        username: username.toLowerCase()
    })

    const createUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(createUser){
        throw new ApiError(500,"Some this is wrong while register the user..")
    }

    return res.status(201).json(
        new ApiResponse(200, createUser, "User Registered Successfully")
    )
})

export {registerUser}
