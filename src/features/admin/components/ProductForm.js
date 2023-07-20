import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductByIdAsync, selectBrands, selectCategories, selectedProductById } from '../ProductSlice';
import {useForm} from 'react-hook-form'
import { createProduct, fetchProductById } from '../../product/ProductAPI';
import { clearSelectedProduct, createProductAsync, updateProductAsync } from '../../product/ProductSlice';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


function ProductForm(){
    const brands = useSelector(selectBrands)
    const categories = useSelector(selectCategories)
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: {errors},
    } = useForm();
    const dispatch = useDispatch()
    const params = useParams();
    const selectedProduct = useSelector(selectedProductById)

    useEffect(() => {
        if(params.id){
            dispatch(fetchProductByIdAsync(params.id))
        }else{
            dispatch(clearSelectedProduct());
        }

    },[params.id, dispatch])

    useEffect(() => {
        if(selectedProduct && params.id){
            setValue('title', selectedProduct.title);
            setValue('description', selectedProduct.description);
            setValue('price', selectedProduct.price);
            setValue('discountPercentage', selectedProduct.discountPercentage);
            setValue('thumbnail', selectedProduct.thumbnail);
            setValue('stock', selectedProduct.stock);
            setValue('image1', selectedProduct.images[0]);
            setValue('image2', selectedProduct.images[1]);
            setValue('image3', selectedProduct.images[2]);
            setValue('brand', selectedProduct.brand);
            setValue('categories', selectedProduct.categories);
        }        
        
    },[selectedProduct,params.id, setValue])

    const handleDelete = () => {
        const product = {...selectedProduct};
        product.deleted = true;
        dispatch(updateProductAsync(product));
    }


    return(
        <>
    <form onSubmit={handleSubmit((data) => {
        console.log(data)
        const product = {...data};
        product.images = [
            product.image1,
            product.image2,
            product.image3,
            product.thumbnail
        ];
        delete product['image1'];
        delete product['image2'];
        delete product['image3'];
        delete product['thumbnail'];
        product.rating = 0;
        product.price = +product.price;
        product.discountPercentage = +product.discountPercentage;
        product.stock = +product.stock;

        if(params.id){
            product.id = params.id;
            product.rating = selectedProduct.rating || 0;
            dispatch(updateProductAsync(product))
            reset()
        }else{
            dispatch(createProductAsync(product))
            reset()
        }

    })}>
        <div className="space-y-12 bg-white p-12">
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Add Product</h2>


                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Product Name
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">

                                <input
                                    type="text"
                                    {...register('title', {
                                        required: 'Product name is required'
                                    })}
                                    id="title"
                                    autoComplete="username"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-full">
                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                            Description
                        </label>
                        <div className="mt-2">
                            <textarea
                                id="description"
                                {...register('description', {
                                    required: 'Description is required',
                                })}
                                rows={3}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={''}
                            />
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                    </div>

                    <div className="col-span-full">
                        <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                            Brand
                        </label>
                        <div className="mt-2">
                            <select {...register('brand', {
                                required: 'Brand is required',
                            })}>
                                <option value=''>Select Brand</option>
                                {brands.map(brand => (< option value={brand.value}>{brand.label}</option>))}
                            </select>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                    </div>

                    <div className="col-span-full">
                        <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                            Category
                        </label>
                        <div className="mt-2">
                            <select {...register('category', {
                                required: 'Category is required'
                            })}>
                                <option value=''>Select Brand</option>
                                {categories.map(category => (< option value={category.value}>{category.label}</option>))}
                            </select>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                            Price
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">

                                <input
                                    type="number"
                                    {...register('price', {
                                        required: 'Price is required',
                                        min: 1,
                                        max: 100
                                    })}
                                    id="price"
                                    autoComplete="username"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                />
                            </div>
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="discount" className="block text-sm font-medium leading-6 text-gray-900">
                            Discount
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">

                                <input
                                    type="number"
                                    {...register('discount',{
                                        required: 'Discount is required',
                                        min: 0,
                                        max: 100,
                                    })}
                                    id="discount"
                                    autoComplete="username"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                />
                            </div>
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Stock
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">

                                <input
                                    type="number"
                                    {...register('stock', {
                                        required: 'Stock is required'
                                    })}
                                    id="stock"
                                    autoComplete="username"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                />
                            </div>
                        </div>
                    </div>

                    <div className="sm:col-span-4">
                        <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
                            Thumbnail
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">

                                <input
                                    type="text"
                                    {...register('thumbnail', {
                                        required: 'Thumbnail is required'
                                    })}
                                    id="thumbnail"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                />
                            </div>
                        </div>
                    </div>

                    <div className="sm:col-span-4">
                        <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                            Image
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">

                                <input
                                    type="text"
                                    {...register('image1', {
                                        required: 'Image is required'
                                    })}
                                    id="image1"
                                    autoComplete="username"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                />
                            </div>
                        </div>
                    </div>

                    <div className="sm:col-span-4">
                        <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
                            Image
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">

                                <input
                                    type="text"
                                    {...register('image2', {
                                        required: 'Image is required'
                                    })}
                                    id="image2"
                                    autoComplete="username"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                />
                            </div>
                        </div>
                    </div>

                    <div className="sm:col-span-4">
                        <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
                            Image 3
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">

                                <input
                                    type="text"
                                    {...register('image3', {
                                        required: 'Image is required'
                                    })}
                                    id="image3"
                                    autoComplete="username"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                />
                            </div>
                        </div>
                    </div>


                </div>
            </div>


            <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Extra</h2>

            <div className="mt-10 space-y-10">
                <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                <div className="mt-6 space-y-6">
                    <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                        <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                    </div>
                    <div className="text-sm leading-6">
                        <label htmlFor="comments" className="font-medium text-gray-900">
                        Comments
                        </label>
                        <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                    </div>
                    </div>
                    <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                        <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                    </div>
                    <div className="text-sm leading-6">
                        <label htmlFor="candidates" className="font-medium text-gray-900">
                        Candidates
                        </label>
                        <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                    </div>
                    </div>
                    <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                        <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                    </div>
                    <div className="text-sm leading-6">
                        <label htmlFor="offers" className="font-medium text-gray-900">
                        Offers
                        </label>
                        <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                    </div>
                    </div>
                </div>
                </fieldset>
                
            </div>
            </div>
      

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                Cancel
                </button>
                {selectedProduct && <button 
                onClick={handleDelete}
                type="button" className="text-sm font-semibold leading-6 text-red-900">
                Delete
                </button>}
                <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                Save
                </button>
            </div>
        </div>
    </form>
    </>
    )
}

export default ProductForm;