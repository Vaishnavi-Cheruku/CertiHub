import staffModel from "../models/staffModel.js";

export const getStaffData = async (req, res) => {
    try {
        const { staffId } = req.body; // Ensure staffId is passed in the request

        if (!staffId) {
            return res.json({ success: false, message: 'Staff ID is required' });
        }

        const staff = await staffModel.findById(staffId);
        if (!staff) {
            return res.json({ success: false, message: 'Staff member not found' });
        }

        return res.json({
            success: true,
            staffData: {
                fullName: staff.fullName,
                email: staff.email,
                phone: staff.phone,
                role: staff.role,
                isActive: staff.isActive
            }
        });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};
