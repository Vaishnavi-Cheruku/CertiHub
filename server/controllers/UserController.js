export const getUserData = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(400).json({ success: false, message: "User not authenticated" });
        }

        res.status(200).json({
            success: true,
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                phone: req.user.phone,
                address: req.user.address,
                isAccountVerified: req.user.isAccountVerified
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};
