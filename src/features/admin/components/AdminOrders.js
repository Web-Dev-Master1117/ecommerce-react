import { useEffect, useState } from "react";
import { fetchAllOrdersAsync, selectOrders, selectTotalOrders } from "../../order/orderSlice";
import { ITEMS_PER_PAGE } from "../../../app/constants"
import { useDispatch, useSelector } from "react-redux";
import {EyeIcon, PencilIcon} from '@heroicons/react/24/outline'
import Pagination from "../../common/Pagination";


function AdminOrders(){
    const [page, setPage] = useState(1);
    const dispatch = useDispatch()
    const orders = useSelector(selectOrders);
    const totalOrders = useSelector(selectTotalOrders);
    const [editableOrderId, setEditableOrderId] = useState(-1)


    const handleEdit = (order) => {
        setEditableOrderId(order.id)
    }

    const handleShow = () => {
        
    }

    const handleUpdate = (e, order) => {
        const updatedOrder = {...order, status: e.target.value}
        dispatch(updateOrderAsync(updatedOrder))
        setEditableOrderId(-1)
    }

    const chooseColor = (status) => {
        switch(status){
            case 'pending': 
                return 'bg-purple-200 text-purple-600';
            case 'dispatched':
                return 'bg-yellow-200 text-purple-600';
            case 'delivered':
                return 'bg-green-200 text-green-600';
            case 'cancelled':
                return 'bg-red-200 text-red-600';
            default: 
                return 'bg-purple-200 text-purple-600';
        }
    }


    useEffect(() => {
        const pagination = {_page: page, _limit: ITEMS_PER_PAGE};
        dispatch(fetchAllOrdersAsync(pagination))
    },[page, dispatch])



    return(
        <div className="overflow-x-auto">
            <div className="bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
                <div className="w-full">
                    <div className="bg-white shadow-md rounded my-6">
                        <table className="min-w-max w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">Order#</th>
                                    <th className="py-3 px-6 text-left">Items</th>
                                    <th className="py-3 px-6 text-center">Total Amount</th>
                                    <th className="py-3 px-6 text-center">Address</th>
                                    <th className="py-3 px-6 text-center">Status</th>
                                    <th className="py-3 px-6 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {orders.map(order => (<tr className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="mr-2">
                                                
                                            </div>
                                            <span className="font-medium">{order.id}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        {order.items.map(item => (<div className="flex items-center">
                                            <div className="mr-2">
                                                <img
                                                    className="w-6 h-6 rounded-full"
                                                    src={item.thumbnail}
                                                />
                                            </div>
                                            <span>{item.title} - #{item.quantity} - ${discountedPrice(item)}</span>
                                        </div>))}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex items-center justify-center">
                                            ${order.totalAmount}
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="">
                                            <strong>{order.selectedAddress.name}</strong>,
                                            {order.selectedAddress.street}
                                            {order.selectedAddress.city}
                                            {order.selectedAddress.state}
                                            {order.selectedAddress.pinCode}
                                            {order.selectedAddress.phone}
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        {order.id === editableOrderId ? (
                                        <select onChange={e => handleUpdate(e, order)}>
                                            <option value = 'pending'>Pending</option>
                                            <option value = 'dispatched'>Dispatched</option>
                                            <option value = 'delivered'>Delivered</option>
                                            <option value = 'cancelled'>Cancelled</option>
                                        </select>) : (
                                            <span className={`${chooseColor(order.status)} py-1 px-3 rounded-full text-xs`}>  {order.status}
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex item-center justify-center">
                                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                <EyeIcon className="w-6 h-4" onClick={e => handleShow(order)}/>
                                            </div>
                                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                <PencilIcon className="w-6 h-4" onClick={e => handleEdit(order)}/>
                                            </div>
                                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </td>
                                </tr>))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Pagination
              page={page}
              setPage={setPage} 
              handlePage = {handlePage}
              totalItems={totalOrders}
            />
        </div>
    )
}

export default AdminOrders;