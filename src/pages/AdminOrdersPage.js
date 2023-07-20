import AdminOrders from "../features/admin/components/AdminOrders";
import Navbar from "../features/navbar/Navbar"

function AdminOrdersPage(){
    return(
        <Navbar>
            <AdminOrders/>
        </Navbar>
    )
}

export default AdminOrdersPage;