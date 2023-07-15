import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  
  selectCount, selectUserInfo, updateUserAsync,
} from '../userSlice';
import { useForm } from 'react-hook-form';
import { selectLoggedInUser } from '../../auth/authSlice';


export default function Counter() {
  const user = useSelector(selectUserInfo)
  const dispatch = useDispatch();
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1)
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: {errors},
  }  = useForm();

  const handleEdit = (addressUpdate, index) => {
    const newUser = {...user, addresses: [...user.addresses]}
    newUser.addresses.splice(index, 1, addressUpdate)
    dispatch(updateUserAsync(newUser))
    setSelectedEditIndex(-1);
    
  }

  const handleRemove = (e, index) => {
    const newUser = {...user, addresses: [...user.addresses]}
    newUser.addresses.splice(index, 1)
    dispatch(updateUserAsync(newUser))
  }

  const handleEditForm = (index) => {
    setSelectedEditIndex(index)
    const address = user.addresses[index]
    setValue('name', address.name)
    setValue('email', address.email)
    setValue('city', address.city)
    setValue('state', address.state)
    setValue('pincode', address.pincode)
  }

 


  return (
    <div>
        <div className='mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <h2 className='text-4xl font-bold tracking-tight text-orange-400 text-left'> Name: {user.name ? user.name: 'New User'}</h2>
                <h3 className='text-4xl font-bold tracking-tight text-orange-400 text-left'> Email Address: {user.email}</h3>
                {user.role==='admin' && (
                    <h3 className='text-4xl font-bold tracking-tight text-orange-400 text-left'> Role: {user.role}</h3>
                )}
            </div>
        </div>
      
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            
            <p className="mt-0.5 text-2xl text-gray-500">Your Address:</p>

            {user.addresses && user.addresses.map((address,index) => (
            <div>
            { selectedEditIndex === index ?   <form 
                    noValidate
                    onSubmit={handleSubmit((data) => {
                        console.log(data)
                        handleEdit(data)
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
                                            value={address.name}
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
                                            value={address.email}
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
                                            value={address.country}
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
                                            value={address.street}
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
                                            value={address.city}
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
                                            value={address.state}
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
                                            value={address.pincode}
                                            id="postal-code"
                                            autoComplete="postalCode"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            
                            <button
                                onClick={setSelectedEditIndex(-1)}
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Cancel Address
                            </button>
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Edit Address
                            </button>
                        </div>

                        {/* <div className="border-b border-gray-900/10 pb-12">
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
                        </div> */}
                    </div>

                </form> : null }
                <div className="flex justify-between gap-x-6 py-5">
                <div className="flex gap-x-4">

                    <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 ">{address.name}</p>
                    <p className="mt-1 truncate text-xs leading-5 ">{address.street}</p>
                    <p className="text-sm leading-6 text-gray-900"><span className='font-bold'>Phone no:</span> {address.phone}</p>
                    <p className="text-sm leading-6 text-gray-900">{address.pincode}</p>

                    </div>
                </div>
                <button
                    onClick={(e) => handleEditForm(e, index)}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                    Edit
                </button>
                <button
                    onClick={(e) => handleRemove(e, index)}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                    Remove
                </button>
                </div>
            </div>
            ))}

            
            
        </div>
    </div>
    // </div>
  );
}
