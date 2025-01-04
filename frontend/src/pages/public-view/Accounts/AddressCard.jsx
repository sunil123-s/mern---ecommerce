import { Card,CardContent,CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { deleteAddress, fetchAddress } from '@/store/Thunk/Publics/AddressThunk';
import { ChatState } from '@/store/Context/UserContext';
import toast from 'react-hot-toast';
import { setselectedAddress } from "@/store/Slices/Public-slice/addressSlice";

const AddressCard = ({ addressInfo, handelEditAddress }) => {
  const { user } = ChatState();
  const dispatch = useDispatch();

  const handelAddressDelete = (addressId) => {
    dispatch(deleteAddress({user, addressId })).then((data) => {
      if (data.payload.success) {
        toast.success("Address Deleted");
        dispatch(fetchAddress(user));
      }
    });
  };

  const handelSelcetAddress =(selectedAddress) => {
    toast.success("Address Selected")
    dispatch(setselectedAddress(selectedAddress));
  }

  return (
    <Card className="hover:shadow-2xl transition-shadow">
      <CardContent
        className="grid gap-4 p-4 cursor-pointer"
        onClick={() => handelSelcetAddress(addressInfo)}
      >
        <Label>Address : {addressInfo?.address}</Label>
        <Label>City : {addressInfo?.city}</Label>
        <Label>Pincode : {addressInfo?.pincode}</Label>
        <Label>Phone : {addressInfo?.phone}</Label>
      </CardContent>
      <CardFooter className="flex justify-between p-3 ">
        <Button
          className="h-6 p-4"
          onClick={() => handelEditAddress(addressInfo)}
        >
          Edit
        </Button>
        <Button
          className="h-6 p-4"
          onClick={() => handelAddressDelete(addressInfo?._id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard
