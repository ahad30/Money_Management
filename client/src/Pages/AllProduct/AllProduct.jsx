import React, { useEffect, useState } from 'react'
import { useGetProductsQuery } from '../../features/Product/ProductApi';
import moment from "moment";
import { Link } from 'react-router-dom';

const AllProduct = () => {
  const { data, isLoading, refetch } = useGetProductsQuery();
  const [productData, setProductData] = useState([]);
  // console.log(productData);

  useEffect(() => {
    if (data) {
      setProductData(data);
    }
  }, [data]);

  return (
  <section className='max-w-6xl mx-auto'>
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
                      <p className="text-xs font-medium text-orange-300 uppercase dark:text-blue-400 mt-3">
                        {item?.ratings}
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

                      <Link to={`/articleDetails/${item?._id}`}>
                        <button
                          className="disabled:cursor-not-allowed text-sm bg-[#23BE0A] p-2 text-white rounded-md"
                        >
                          Details
                        </button>
                      </Link>
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