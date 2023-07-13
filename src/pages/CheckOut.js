import {Link, Navigate} from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectItems, updateCartAsync, deleteItemFromCartAsync } from '../features/cart/cartSlice'
import { checkUserAsync, selectLoggedInUser, updateUserAsync } from '../features/auth/authSlice'
import {useForm} from 'react-hook-form'
import { createOrder } from '../features/order/orderAPI'
import { createOrderAsync, selectCurrentOrder } from '../features/order/orderSlice'

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
]


function CheckOut() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true)
  const items = useSelector(selectItems)
  const currentOrder = useSelector(selectCurrentOrder)
  const user = useSelector(selectLoggedInUser)
  const totalAmount = items.reduce((amount, item) => item.price * item.quantity + amount, 0)

  const totalItems = items.reduce((total, item) => item.quantity + total, 0)

  const [selectedAddress, setSelectedAddress] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('cash')

  const handleQuantity = (e,item) => {
    dispatch(updateCartAsync({...item, quantity: +e.target.value}))
  }

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id))
  }



  const{
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();

  const handleAddress = (e) => {
    setSelectedAddress(user.addresses[e.target.value])
  }

  const handlePayment = (e) => {
    setPaymentMethod(e.target.value)
  }

  const handleOrder = (e) => {
    const order = {
                    items, 
                    totalAmount, 
                    totalItems, 
                    user, 
                    paymentMethod, 
                    selectedAddress,
                    status: 'pending',
                }

    dispatch(createOrderAsync(order))
  }


    return (
        <>
        {!items.length && <Navigate to='/' replace={true}></Navigate>}
        {currentOrder && <Navigate to={`/order-success/${currentOrder.id}`} replace={true}></Navigate>}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10  lg:grid-cols-5 ">
                <div className="lg:col-span-3 bg-white px-4 py-2">
                    <form 
                        noValidate
                        onSubmit={handleSubmit((data) => {
                            console.log(data)
                            dispatch(updateUserAsync({...user, addresses: [...user.addresses, data]}))
                            reset();
                        })}
                    >
                        <div className="space-y-12  ">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-4">
                                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Full name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...register('name', {required: 'name is required'})}
                                                id="name"
                                                autoComplete="given-name"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>


                                    <div className="sm:col-span-4">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                {...register('email', {required: 'email is required'})}
                                                type="email"
                                                autoComplete="email"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                            Country
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id="country"
                                                {...register('country', {required: 'country is required'})}
                                                autoComplete="country-name"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            >
                                                <option>United States</option>
                                                <option>Canada</option>
                                                <option>Mexico</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                                            Street address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...register('street', {required: 'street is required'})}
                                                id="street"
                                                autoComplete="street-address"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                            City
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...register('city', {required: 'city is required'})}
                                                id="city"
                                                autoComplete="address-level2"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                            State / Province
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...register('region', {required: 'region is required'})}
                                                id="region"
                                                autoComplete="address-level1"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="postalCode" className="block text-sm font-medium leading-6 text-gray-900">
                                            ZIP / Postal code
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...register('postalCode', {required: 'postal code is required'})}
                                                id="postal-code"
                                                autoComplete="postalCode"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Save
                                    </button>
                            </div>

                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900 text-left">Address</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600 text-left">
                                    Choose from existing address
                                </p>

                                <ul role="list" className="divide-y divide-gray-100">
                                    {user.addresses.map((address, index) => (
                                        <li key={index} className="flex justify-between gap-x-6 py-5">
                                            <div className="flex gap-x-4">
                                                <input
                                                    onChange={handleAddress}
                                                    name='address'
                                                    type='radio'
                                                    value={index}
                                                    className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600' />
                                                <div className="min-w-0 flex-auto">
                                                    <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
                                                </div>
                                            </div>
                                            <div className="hidden sm:flex sm:flex-col sm:items-end">
                                                <p className="text-sm leading-6 text-gray-900"><span className='font-bold'>Phone no:</span> {address.phone}</p>
                                                <p className="text-sm leading-6 text-gray-900">{address.pincode}</p>
                                                
                                            </div>
                                        </li>
                                    ))}
                                </ul>


                                <div className="mt-10 space-y-10">
                                    <fieldset>
                                        <legend className="text-sm font-semibold leading-6 text-gray-900 text-left">Payment</legend>
                                        <p className="mt-1 text-sm leading-6 text-gray-600 text-left">Choose one</p>
                                        <div className="mt-6 space-y-6">
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="cash"
                                                    name="payments"
                                                    onClick={handlePayment}
                                                    value = 'cash'
                                                    type="radio"
                                                    checked= {paymentMethod === 'cash'}
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Cash
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="card"
                                                    name="payments"
                                                    onClick={handlePayment}
                                                    checked={paymentMethod==='card'}
                                                    value = 'card'
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                                                Card                                        </label>
                                            </div>
                                            
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
                <div className="lg:col-span-2">
                    <div className='mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8'>
                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <h2 className='text-4xl font-bold tracking-tight text-orange-400 text-left'>Cart</h2>
                            <div className="flow-root">
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                    {items.map((item) => (
                                        <li key={item.id} className="flex py-6">
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                <img
                                                    src={item.imageSrc}
                                                    alt={item.imageAlt}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                        <h3>
                                                            <a href={item.href}>{item.title}</a>
                                                        </h3>
                                                        <p className="ml-4">${item.price}</p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <div className="text-gray-500">
                                                        <label htmlFor="qty" className="inline mr-4 text-lg font-medium leading-6 text-gray-900">
                                                            Qty:
                                                        </label>
                                                        <select onChange={(e) => handleQuantity(e, item)} value={item.quantity}>
                                                            <option value='1'>1</option>
                                                            <option value='2'>2</option>
                                                            <option value='3'>3</option>
                                                            <option value='4'>4</option>
                                                        </select>
                                                    </div>

                                                    <div className="flex">
                                                        <button
                                                            onClick={(e) => handleRemove(e, item.id)}
                                                            type="button"
                                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Subtotal</p>
                                <p>{totalAmount}</p>
                            </div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Total Items in Cart</p>
                                <p>{totalItems}</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                            <div className="mt-6">
                                <div 
                                    onClick={handleOrder}
                                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                >
                                    Order Now
                                </div>
                            </div>
                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                <p>
                                    or
                                    <Link to='/'>
                                        <button
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                            onClick={() => setOpen(false)}
                                        >
                                            Continue Shopping
                                            <span aria-hidden="true"> &rarr;</span>
                                        </button>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default CheckOut;