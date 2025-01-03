import { Card,CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CommonForm from '@/pages/common/CommonForm'
import { ChatState } from '@/store/Context/UserContext'
import { AddNewAddress, fetchAddress,updateAddress } from '@/store/Thunk/Publics/AddressThunk'
import { addressFormControls } from '@/utils/DummyData/AddProductsData'
import {useState,useEffect} from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import AddressCard from './AddressCard'

const initialAddress = {
    address:"",
    city: "",
    phone: "",
    pincode: "",
}

const Address = () => {
  const [formData, setformData] = useState(initialAddress);
  const [currentid, setcurrentid] = useState(null)
  const { user } = ChatState();
  const dispatch = useDispatch();

  const { addressList } = useSelector((state) => state?.Address);
  
  const handelEditAddress = (currentAddress) => {
      setcurrentid(currentAddress?._id);
      setformData({
        ...formData,
        address: currentAddress?.address,
        city: currentAddress?.city,
        pincode: currentAddress?.pincode,
        phone: currentAddress?.phone,
      });
  } 
  
  const handelAddress = (e) => {
    e.preventDefault();
       
    if(addressList.length >= 2 && currentid === null){
       toast.error("You can only 2 address")
       setformData(initialAddress)

       return;
    }

      if(currentid !== null) {
        dispatch(updateAddress({userId:user?.id, addressId:currentid, formData}))
        .then((data) => {
           if(data.payload.success){
            dispatch(fetchAddress(user?.id))
            toast.success("Address Updated")
            setformData(initialAddress)
            setcurrentid(null)
           } 
        })
      }else{
        dispatch(AddNewAddress({ userId: user?.id, ...formData })).then((data) => {
          if (data.payload.success) {
            dispatch(fetchAddress(user?.id));
            toast.success("Address Added");
          }
        });
      };
      }


  useEffect(() => {
    dispatch(fetchAddress(user?.id));
  }, [dispatch]);

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {addressList && addressList.length > 0
          ? addressList?.map((addressItem) => (
              <AddressCard
                key={addressItem?._id}
                addressInfo={addressItem}
                handelEditAddress={handelEditAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentid !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formdata={formData}
          setformdata={setformData}
          buttonText={currentid !== null ? "Edit Address" : "Add New Address"}
          onSubmit={handelAddress}
        />
      </CardContent>
    </Card>
  );
}

export default Address
