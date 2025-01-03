import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { useState } from 'react';
import PublicOrderView from './PublicOrderView';


const PublicOrders = () => {
  const [orderViewOpen, setorderViewOpen] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1246515</TableCell>
              <TableCell>12/12/12</TableCell>
              <TableCell>Delevired</TableCell>
              <TableCell>$2000</TableCell>
              <TableCell>
                <Dialog open={orderViewOpen} onOpenChange={setorderViewOpen}>
                  <Button onClick={() => setorderViewOpen(true)}>Details</Button>
                  <PublicOrderView/>
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default PublicOrders;
