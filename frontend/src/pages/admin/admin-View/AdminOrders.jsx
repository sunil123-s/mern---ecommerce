import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog} from '@/components/ui/dialog';
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table';
import { useState }from 'react'
import OrderView from './OrderView';
import PublicOrderView from '@/pages/public-view/Accounts/PublicOrderView';

const AdminOrders = () => {
  const [orderDetialOpen, setorderDetialOpen] = useState(false);

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
                <Dialog open={orderDetialOpen} onOpenChange={setorderDetialOpen}>
                  <Button onClick={() => setorderDetialOpen(true)} >Details</Button>
                  <OrderView/>
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminOrders;
