import  { useEffect, useState } from 'react';
import { useGetProductCountQuery, useGetProductsQuery, useSearchProductsQuery } from '../../features/Product/ProductApi';
import moment from 'moment';
import { CiStar } from 'react-icons/ci';
import { Spinner } from '@material-tailwind/react';

const AllProduct = () => {
  const { data, isLoading: isLoadingProducts } = useGetProductsQuery();
  const [productData, setProductData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [categoryfilter, setCategoryFilter] = useState("");
  const [brandfilter, setBrandFilter] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [sort, setSort] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(4)
  const [currentPage, setCurrentPage] = useState(1)
  const [count, setCount] = useState(0)


  const { data: searchData, isLoading: isLoadingSearch } =
    useSearchProductsQuery({ searchText, categoryfilter, brandfilter, sort , currentPage, itemsPerPage });

  const { data: productCountData,isLoading: isLoadingCount } = useGetProductCountQuery({ searchText, categoryfilter, brandfilter });

  useEffect(() => {
    if (data) {
      setProductData(data);
      const categories = [...new Set(data.map(item => item?.category))];
      const brands = [...new Set(data.map(item => item?.brand))];
      setAllCategories(categories);
      setAllBrands(brands);
    }
  }, [data]);


  useEffect(() => {
    if (searchData) {
      setProductData(searchData?.result || []);
    }
  }, [searchData]);

  useEffect(() => {
    if (productCountData) {
      setCount(productCountData?.result);
     
    }
  }, [productCountData]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchText(searchText);
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleBrandChange = (e) => {
    setBrandFilter(e.target.value);
  };

    //  handle pagination button
    const handlePaginationButton = value => {
      console.log(value)
      setCurrentPage(value)
    }


const numberOfPages = Math.ceil(count / itemsPerPage)
const pages = [...Array(numberOfPages).keys()].map(element => element + 1)

  if (isLoadingProducts || isLoadingSearch) {
    return (
      <div className="flex justify-center items-center flex-col h-full p-48">
        <Spinner className="h-16 w-16 text-gray-900/50" />
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto">
      <h1 className="text-center font-bold text-xl mb-5">All Products</h1>
      <div className="flex flex-col gap-4 lg:flex-row justify-center">
        <div className="flex justify-center lg:block lg:justify-start">
          <select
            onChange={handleCategoryChange}
            value={categoryfilter}
            name="category"
            id="category"
            className="border px-3 py-3 rounded-lg"
          >
            <option value="">Filter By Category</option>
            {allCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center lg:block lg:justify-start">
          <select
            onChange={handleBrandChange}
            value={brandfilter}
            name="brand"
            id="brand"
            className="border px-3 py-3 rounded-lg"
          >
            <option value="">Filter By Brand</option>
            {allBrands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div>
          <form onSubmit={handleSearch} className="mb-10">
            <div className="flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 w-[90%] lg:w-[90%] mx-auto focus-within:ring-blue-300">
              <input
                className="px-6 py-2 text-gray-700 bg-white outline-none focus:placeholder-transparent w-[100%]"
                type="text"
                onChange={(e) => setSearchText(e.target.value)}
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
        <div className='flex justify-center lg:block lg:justify-start'>
            <select
              onChange={e => {
                setSort(e.target.value)
              }}
              value={sort}
              name='sort'
              id='sort'
              className='border px-3 py-3 rounded-md'
            >
              <option value=''>Sort By</option>
              <option value='dateDesc'>Newest</option>
              <option value='priceAsc'>Price: low to high</option>
              <option value='priceDesc'>Price: high to low</option>

            </select>
          </div>
      </div>
      {productData.length === 0 && (
        <div>
          <p className="flex justify-center text-red-400 font-bold">No data found.</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {productData.map((item) => (
          <div key={item?._id} className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="relative">
              <img className="object-cover w-full h-64" src={item?.productImage} alt="Product" />
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
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{item?.description}</p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 font-bold">${item?.price}</p>
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-center mt-4">
                  <p className="mx-1 text-xs text-gray-600 dark:text-gray-300">
                    {moment(item?.creationDate).format('MMMM Do YYYY, h:mm:ss a')}
                  </p>
                  <div className='flex gap-1 items-center'>
                    <CiStar className='text-orange-500' />
                    <p className="text-xs font-medium text-orange-500 uppercase dark:text-blue-400">
                      {item?.ratings}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
       {/* Pagination Section */}
       <div className='flex justify-center mt-12'>
        {/* Previous Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => handlePaginationButton(currentPage - 1)}
          className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white'
        >
          <div className='flex items-center -mx-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 mx-1 rtl:-scale-x-100'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M7 16l-4-4m0 0l4-4m-4 4h18'
              />
            </svg>

            <span className='mx-1'>previous</span>
          </div>
        </button>
        {/* Numbers */}
        {pages.map(btnNum => (
          <button
            onClick={() => handlePaginationButton(btnNum)}
            key={btnNum}
            className={`hidden ${
              currentPage === btnNum ? 'bg-blue-500 text-white' : ''
            } px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
          >
            {btnNum}
          </button>
        ))}
        {/* Next Button */}
        <button
          disabled={currentPage === numberOfPages}
          onClick={() => handlePaginationButton(currentPage + 1)}
          className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'
        >
          <div className='flex items-center -mx-1'>
            <span className='mx-1'>Next</span>

            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 mx-1 rtl:-scale-x-100'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              />
            </svg>
          </div>
        </button>
      </div>
    </section>
  );
}

export default AllProduct;
