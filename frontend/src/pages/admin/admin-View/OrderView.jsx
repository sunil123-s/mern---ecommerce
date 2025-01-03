import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { DialogContent } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import CommonForm from '@/pages/common/CommonForm'
 
const initalFormdata ={
    status: ""
}
const OrderView = () => {
    const [formdata, setformdata] = useState(initalFormdata)

    const handelstatus = (e) => {
        e.preventDefault();
        
    }
  return (
    <div>
      <DialogContent className="sm:max-w-[600px]">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <div className="flex items-center justify-between mt-6">
              <p className="font-medium">Order ID</p>
              <Label>12122</Label>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="font-medium">Order Date</p>
              <Label>12/12/12</Label>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="font-medium">Order Status</p>
              <Label>In process</Label>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="font-medium">Order Price</p>
              <Label>$2000</Label>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Order Details</div>
              <ul className="grid gap-3">
                <li className="flex justify-between items-center">
                  <span>Product One</span>
                  <span>$2000</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Shipping Info</div>
              <div className="grid gap-0.5 text-muted-foreground">
                <span>sunil kumar</span>
                <span>address</span>
                <span>city</span>
                <span>phone</span>
                <span>pincode</span>
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <CommonForm
              formControls={[
                {
                  label: "Order Status",
                  name: "status",
                  componentType: "select",
                  options: [
                    { id: "in pendding", label: "Pendding" },
                    { id: "in prcesss", label: "In Process" },
                    { id: "in shipping", label: "In Shipping" },
                    { id: "rejected", label: "Rejected" },
                    { id: "delivered", label: "Delivered" },
                  ],
                },
              ]}
              formdata={formdata}
              setformdata={setformdata}
              buttonText={"update Status"}
              onSubmit={handelstatus}
            />
          </div>
        </div>
      </DialogContent>
    </div>
  );
}

export default OrderView
