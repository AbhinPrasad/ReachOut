import User from "../models/User.js";
import jwt from "jsonwebtoken"
//READ

export const getUser = async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findById(id)
        res.status(200).json(user)

    } catch (err) {
        res.status(404).json({ message: err.message });
    }

}
export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id)
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }


}

//UPDATE

export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params
        const user = await User.findById(id)
        const friend = await User.findById(friendId)

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId)
            friend.friends = friend.friends.filter((id) => id !== id)
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();


        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        res.status(200).json(formattedFriends)

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}



export const updateUser = async (req, res) => {
    const id = req.params.id;
    // console.log("Data Received", req.body)
    const { _id,
        firstName,
        lastName,
        location,
        occupation } = req.body;

    if (id === _id) {
        try {

            const user = await User.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            const token = jwt.sign({ id: user._id }, process.env.JWt_SECRET)


            console.log({ user })
            res.status(200).json({ user, token, success: true, });
        } catch (error) {
            console.log(error, "Error ")
            res.status(400).json(error, 'hello');
        }
    } else {
        res
            .status(403)
            .json("Access Denied! You can update only your own Account.");
    }
};



