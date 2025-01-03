import Address from "../../model/Address.js";

export const createAddress = async (req, res) => {
  try {
    const { userId, address, city, phone, pincode } = req.body;

    if (!userId || !address || !city || !phone || !pincode) {
      return res
        .status(404)
        .json({ success: false, messsage: "Required All Deatils" });
    }

    const newAddress = new Address({
      userId,
      address,
      city,
      phone,
      pincode,
    });

    await newAddress.save();
    res.status(200).json({ success: true, data: newAddress });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: true, messsage: "Falied to Add Address" });
  }
};

export const fetchAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(404).json({ success: false, message: "Id Not Found" });
    }

    const AddressList = await Address.find({ userId });

     if (!AddressList) {
       return res
         .status(404)
         .json({ success: false, message: "Address Not Found" });
     }

    res.status(200).json({ success: true, data:AddressList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: true, messsage: "Falied to Add Address" });
  }
};

export const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const { address, city, phone, pincode } = req.body;

    if (!userId || !addressId) {
      res.status(404).json({ success: false, message: "Id Not Found" });
    }

    if (!address && !city && !phone && !pincode) {
      return res
        .status(400)
        .json({
          success: false,
          message: "At least one field to update is required",
        });
    }

    const editAddress = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      { address, city, phone, pincode },
      { new: true, omitUndefined: true }
    );

    if (!editAddress) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found or unauthorized" });
    }

    res.status(200).json({ success: true, data: editAddress });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: true, messsage: "Falied to Add Address" });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      res.status(404).json({ success: false, message: "Id Not Found" });
    }

    const deleteaddress = await Address.findOneAndDelete({
      userId,
      _id: addressId,
    });

    if (!deleteaddress) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found or unauthorized" });
    }

    res.status(200).json({ success: true, message: "Address Not Found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: true, messsage: "Falied to Add Address" });
  }
};
