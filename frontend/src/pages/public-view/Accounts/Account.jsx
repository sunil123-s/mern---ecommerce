import React from 'react'
import accountImg from "../../../assets/account.jpg"
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Orders from './PublicOrders';
import Address from './Address';

const Account = () => {
  return <div className='flex flex-col'>
            <div className='relative h-[300px] w-full overflow-hidden'>
              <img
               className='h-full w-full object-cover object-center'  
              src={accountImg}
              />
            </div>
            <div className='container mx-auto grid grid-cols-1 gap-8 py-8'>
              <div className='flex flex-col rounded-lg border  bg-background p-6 shadow-sm'>
                <Tabs defaultValue="orders">
                  <TabsList>
                     <TabsTrigger value="orders">Orders</TabsTrigger>
                     <TabsTrigger value="address">Address</TabsTrigger>
                  </TabsList>
                  <TabsContent value="orders">
                     <Orders />
                  </TabsContent>
                  <TabsContent value="address">
                     <Address />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>;
}

export default Account
