import React, { useEffect, useState } from 'react'
import { useGetProductsQuery, useSearchProductsQuery } from '../../features/Product/ProductApi';
import moment from "moment";
import { CiStar } from "react-icons/ci";
import { Spinner } from "@material-tailwind/react";


const AllProduct = () => {
  const { data, isLoading, refetch } = useGetProductsQuery();
  const [productData, setProductData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const { data: searchData, isLoading: isLoadingSearch, refetch: refetchSearch } = useSearchProductsQuery(search);



  useEffect(() => {
    if (data) {
      setProductData(data);
    }
  }, [data]);

  useEffect(() => {
    if (searchData) {
      setProductData(searchData?.result);
    }
  }, [searchData]);


  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchText);
  };

  if (isLoading || isLoadingSearch) {
    return <div className="flex justify-center items-center flex-col h-full p-48">
    <Spinner className="h-16 w-16 text-gray-900/50" />
      </div>
  }

  return (
  <section className='max-w-6xl mx-auto'>
      <h1 className="text-center font-bold text-xl mb-5">All Products</h1>
      <div className="flex flex-col gap-4 lg:flex-row justify-center">
      <div>
          <form onSubmit={handleSearch} className="mb-10">
            <div className="flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 w-[90%] lg:w-[90%] mx-auto focus-within:ring-blue-300">
              <input
                className="px-6 py-2 text-gray-700  bg-white outline-none focus:placeholder-transparent w-[100%]"
                type="text"
                onChange={(e) =>             
                setSearchText(e.target.value)
                }
                value={searchText}
                name="search"
                placeholder="Enter Product Name"
              />

              <button className="px-1 md:px-4 py-2 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-blue-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
     
   <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {data?.length === 0 && (
            <div>
              <p className="flex justify-center text-red-400 font-bold">
                No data found.
              </p>
            </div>
          )}
          {productData.map((item) => (
            <div className="" key={item?._id}>
              <div
                className={`max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800`}
              >
                <div className="relative">
                  <img
                    className="object-cover w-full h-64"
                    src={item?.productImage}
                    alt="Product"
                  />
                </div>
                <div className="p-6">
                  <div>
                    <p className="text-xs font-bold text-gray-600 uppercase dark:text-blue-400">
                      {item?.productName}
                    </p>
                    <div className="flex justify-between">
                     
                      <p className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400 mt-3">
                        {item?.category}
                      </p>
                      <p className="text-xs font-medium text-green-600 uppercase dark:text-blue-400 mt-3">
                        #{item?.brand}
                      </p>
                    </div>

                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {item?.description}
                    </p>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between items-center mt-4">
                      <div>
                        <p className="mx-1 text-xs text-gray-600 dark:text-gray-300">
                          {moment(item?.creationDate).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                        </p>
                      </div>
                      <div className='flex gap-1 items-center'>
                      <p>   <CiStar className='text-orange-500'/></p>
                      <p className="text-xs font-medium text-orange-500 uppercase dark:text-blue-400">
                        {item?.ratings}
                      </p>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
    </div>
  </section>
  )
}

export default AllProduct