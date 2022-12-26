import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillSetting } from "react-icons/ai"
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";

const Home = () => {
  // Initial
  const dispatch = useDispatch();
  const [refetch, setRefetch] = useState(false);




  // Modal
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [loading, setLoading] = useState(false)

  const [getProducts, setGetProducts] = useState({
    loading: "false",
    results: {
      data: []
    }
  })

  // State Management
  const { data: auth } = useSelector((state) => state.auth);
  // const { data: getProjects, loading } = useSelector((state) => state.projects);


  // pagination
  // const [paginante, setPaginante] = useSearchParams();
  // const [params, setParams] = useState({
  //   pageNumber: 1,
  //   pageSize: 4,
  // });

  // Get Data
  const [query, setQuery] = useState({})
  const loadProducts = async () => {
    return await axios.get(`http://localhost:5500/api/v1/restaurants/`)
      .then((res) => {
        setGetProducts({
          loading: false,
          results: res.data
        })
      }).catch((err) => console.log(err))
  }
  useEffect(() => {
    loadProducts()
  }, [refetch, query]);

  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("")

  // Add Data Products
  const [formAdd, setFormAdd] = useState({});

  // Edit Data Products
  const [formEdit, setFormEdit] = useState({});


  const formData = new FormData()
  formData.append("restaurants_name", formEdit.restaurants_name || formAdd.restaurants_name)
  formData.append("restaurants_categories", formEdit.restaurants_categories || formAdd.restaurants_categories)
  formData.append("restaurants_image", formEdit.restaurants_image || formAdd.restaurants_image)
  formData.append("restaurants_location", formEdit.restaurants_location || formAdd.restaurants_location)
  formData.append("restaurants_rating", formEdit.restaurants_rating || formAdd.restaurants_rating)
  formData.append("restaurants_desc", formEdit.restaurants_desc || formAdd.restaurants_desc)



  const handleAddProducts = async (e) => {
    e.preventDefault();
    try {
      const result = await axios({
        method: "POST",
        data: formData,
        url: `http://localhost:5500/api/v1/restaurants`,
        headers: {
          authorization: auth.token,
        },
      });
      if (result) {
        Swal.fire({
          icon: "success",
          text: "Add Products Success!",
        });
        setRefetch(!refetch); //refetch data
      }
    } catch (err) {
      alert(err.response.data.message);
      console.log(err)
    }
  };

  // Update Data Products


  const handleUpdateProducts = async (id) => {
    console.log(formData.get('restaurants_name'))
    try {
      const result = await axios({
        method: "PATCH",
        data: formData,
        url: `http://localhost:5500/api/v1/restaurants/${id}`,
        headers: {
          authorization: auth.token,
        },
      });
      if (result) {
        Swal.fire({
          icon: "success",
          text: "Products Successfully Updated",
        });
        setRefetch(!refetch); //refetch data
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Products Failed",
        text: "Please Try Again",
      });
      console.log(err);
    }
  };

  // Delete data Projects
  const handleDeleteProducts = (id) => {
    console.log(id, "xixixixii")
    Swal.fire({
      title: "Are you sure ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          method: "DELETE",
          url: `http://localhost:5500/api/v1/restaurants/${id}`,
          headers: {
            authorization: auth.token,
          },
        }).then(() => {
          Swal.fire("Deleted!", "Your restaurants has been deleted", "success");
          setRefetch(!refetch);
        });

      }

    });
  };

  // handle reset
  const handleReset = () => {
    loadProducts()
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    return await axios.get(`http://localhost:5500/api/v1/restaurants/?restaurants_name=${search}`)
      .then((res) => {
        setGetProducts({
          loading: false,
          results: res.data
        })
        setSearch("")
      })
      .catch((err) => console.log(err))
  }


  //Loading
  const Loading = () => {
    return (
      <div role="status" className="flex flex-col justify-center items-center">
        <svg
          aria-hidden="true"
          className="mr-2 w-8 h-8 text-gray-200 animate-spin fill-[#315872]"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
        <p className="mt-2 text-md font-bold text-[#205375]">Loading....</p>
      </div>
    );
  };

  // sort
  const sortOptions = ["restaurants_name", "restaurants_categories", "restaurants_location", "restaurants_rating"]
  const restoNaming = ["Nama", "Kategori", "Lokasi", "Rating"]
  const handleSort = async (e) => {
    let value = e.target.value
    setSort(value)
    console.log(value, "ayha")
    return await axios.get(`http://localhost:5500/api/v1/restaurants/?order=${value}&sortBy=ASC`)
      .then((res) => {
        setGetProducts({
          loading: false,
          results: res.data
        })
      })
      .catch((err) => console.log(err))
  }
  const handleFilterCategories = async (value) => {
    return await axios.get(`http://localhost:5500/api/v1/restaurants/?restaurants_categories=${value}&sortBy=ASC`)
      .then((res) => {
        setGetProducts({
          loading: false,
          results: res.data
        })
      })
      .catch((err) => console.log(err))
  }
  const handleFilterLocations = async (value) => {
    return await axios.get(`http://localhost:5500/api/v1/restaurants/?restaurants_location=${value}&sortBy=ASC`)
      .then((res) => {
        setGetProducts({
          loading: false,
          results: res.data
        })
      })
      .catch((err) => console.log(err))
  }
  return (
    <>
      <Navbar />
      <div className=' relative bg-[#252836] flex text-[#fff] font-barlow'>
        <div className='w-[100vw] mx-8 my-8 mb-10'>
          <h1 className=' text-3xl font-semibold'>MANAGEMEN MENU RESTORAN</h1>
          <div className='mt-8 block bg-[#1F1D2B] py-5 px-10 pb-16 rounded-lg'>
            <div className='flex items-center justify-between'>
              <div className='flex'>
                <h3 className='text-xl '>Daftar Menu</h3>
              </div>
              <div>
                <div className='flex gap-2 bg-[#FFCA40] px-3 py-2 rounded-lg text-sm font-bold'>
                  <span>+</span>
                  <button onClick={() => setAddModal(true)}>Tambah Menu</button>
                </div>
              </div>
            </div>
            <hr className='opacity-10 mt-10 mb-5' />
            <form className="flex gap-4" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Cari nama resto"
                className="px-4 py-2 rounded-xl text-[#ABBBC2] bg-[#393C49] placeholder:text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  className="bg-slate-900 px-2 py-1 rounded-md"
                  onClick={handleSearch}
                >
                  Search
                </button>
                <button
                  className="bg-blue-600 px-2 py-1 rounded-md"
                  onClick={() => handleReset()}
                >
                  Reset
                </button>
              </div>
            </form>
            <div className="flex flex-row gap-10 items-start">
              <div className="flex flex-col mt-3 mb-2 gap-2">
                <label>Pilih sorting :</label>
                <select
                  onChange={handleSort}
                  value={sort}
                  className=' w-full px-2 py-1 rounded-md text-white bg-[#434657] text-sm'
                >
                  {sortOptions.map((item, index) => {
                    return <option value={item} key={index}>{restoNaming[index]}</option>
                  })}
                </select>
              </div>
              <div className="mt-3 mb-2">
                <h5>Filter Berdasarkan :</h5>
                <div className="flex text-base mt-2">
                  <h1>Kategori :</h1>
                  <div className="ml-5 flex text-sm gap-5 items-center  font-semibold">
                    <button className="px-2 py-1 hover:bg-yellow-800 text-[#EFEFEF] bg-[#FFCA40] rounded-md" onClick={() => handleFilterCategories("Pizzaria")}>Pizzaria</button>
                    <button className="px-2 py-1 hover:bg-yellow-800 text-[#EFEFEF] bg-[#FFCA40] rounded-md" onClick={() => handleFilterCategories("fast food")}>Fast Food</button>
                    <button className="px-2 py-1 hover:bg-yellow-800 text-[#EFEFEF] bg-[#FFCA40] rounded-md" onClick={() => handleFilterCategories("Coffee shop")}>Coffee Shop</button>
                  </div>
                </div>
                <div className="flex text-base mt-2">
                  <h1>Lokasi :</h1>
                  <div className="ml-5 flex text-sm gap-5 items-center  font-semibold">
                    <button className="px-2 py-1 hover:bg-yellow-800 text-[#EFEFEF] bg-[#FFCA40] rounded-md" onClick={() => handleFilterLocations("Jakarta")}>Jakarta</button>
                    <button className="px-2 py-1 hover:bg-yellow-800 text-[#EFEFEF] bg-[#FFCA40] rounded-md" onClick={() => handleFilterLocations("Bandung")}>Bandung</button>
                    <button className="px-2 py-1 hover:bg-yellow-800 text-[#EFEFEF] bg-[#FFCA40] rounded-md" onClick={() => handleFilterLocations("Semarang")}>Semarang</button>
                    <button className="px-2 py-1 hover:bg-yellow-800 text-[#EFEFEF] bg-[#FFCA40] rounded-md" onClick={() => handleFilterLocations("Surabaya")}>Surabaya</button>
                  </div>
                </div>


              </div>
            </div>



            <div className='flex flex-col pt-6'>
              <div className='flex gap-16 flex-wrap '>

                <>
                  <table className="text-black border-2 table-auto w-full text-sm">
                    <thead className="border-2 ">
                      <tr className="border-2 bg-yellow-800 text-white">
                        <th className="border-2 p-3">No.</th>
                        <th className="border-2 ">Gambar</th>
                        <th className="border-2 w-[150px]">Nama</th>
                        <th className="border-2 w-[100px]">Kategori</th>
                        <th className="border-2 w-[100px]">Rating</th>
                        <th className="border-2 w-[150px] ">Lokasi</th>
                        <th className="border-2 ">Deskripsi</th>
                        <th className="border-2" colspan="2">Action</th>
                      </tr>
                    </thead>
                    {getProducts.results.data.map((restaurants, index) => {
                      return (
                        <>
                          <tbody className="border-2 text-center bg-[#252836] text-white">
                            <tr key={index} className="border-2">
                              <td className="border-2 font-bold">
                                {index + 1}
                              </td>
                              <td className="border-2">
                                <img
                                  src={`http://localhost:5500/uploads/${restaurants.restaurants_image}`}
                                  className="w-[140px] h-[100px] p-2"
                                  alt="makanan"
                                />
                              </td>
                              <td className="border-2">{restaurants.restaurants_name}</td>
                              <td className="border-2">{restaurants.restaurants_categories}</td>
                              <td className="border-2">
                                <div className="flex justify-center">
                                  {" "}
                                  {Array(restaurants.restaurants_rating)
                                    .fill()
                                    .map((_, i) => (
                                      <p className="flex">⭐</p>
                                    ))}
                                </div>
                              </td>
                              <td className="border-2">{restaurants.restaurants_location}</td>
                              <td className="border-2">{restaurants.restaurants_desc}</td>
                              <td className="border-2 text-white">
                                <button
                                  className="w-13 py-2 px-3 bg-blue-900 rounded-lg"
                                  onClick={() => {
                                    setEditModal(true);
                                    setFormEdit((prevData) => ({
                                      ...prevData,
                                      ...restaurants,
                                    }));
                                  }}
                                >
                                  <FaEdit />
                                </button>
                              </td>
                              <td className="border-2 text-white">
                                <button
                                  className="w-13 py-2 px-3 bg-red-600 rounded-lg"
                                  onClick={() =>
                                    handleDeleteProducts(restaurants.restaurants_id)
                                  }
                                >
                                  <RiDeleteBin6Line />
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </>
                      );
                    })}
                  </table>
                </>
                {addModal ?
                  <>
                    <div className="flex justify-center items-center overflow-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-black/60">
                      <div className='absolute right-0 top-0 bg-[#1F1D2B] w-[450px] h-[100vh]'>
                        <form
                          encType="multipart/form-data"
                          onSubmit={(e) => handleAddProducts(e)}
                        >
                          <div className='flex items-center justify-between pl-6'>
                            <p className='pt-3 pb-3'>Tambah Menu</p>
                            <button
                              className="bg-transparent border-0 text-black float-right"
                              onClick={() => setAddModal(false)}
                            >
                              <span className="text-white opacity-7 h-8 w-8 text-xl block rounded-3xl font-bold mr-5 mt-1 hover:bg-[#564730] bg-[#FFCA40] transition">
                                x
                              </span>
                            </button>
                          </div>
                          <hr className='mt-3 opacity-10' />
                          <div className='text-[#FFCA40] text-sm'>
                            <div className='px-10'>
                              <label className="block text-gray-700 text-sm font-bold my-2" for="file">
                                Image
                              </label>
                              <input
                                type="file"
                                className="border border-white border-opacity-70 rounded-lg w-full py-2 px-1"
                                onChange={(e) => {
                                  setFormAdd((prevData) => ({
                                    ...prevData,
                                    restaurants_image: e.target.files[0],
                                  }));
                                }}
                              />
                            </div>
                          </div>
                          <div className='px-10'>
                            <label className="block text-gray-700 text-sm font-bold my-2" for="username">
                              Name
                            </label>
                            <input
                              className=" px-3 py-2 w-full rounded-lg bg-[#393C49] text-[#E0E6E9] text-sm border border-white border-opacity-30"
                              id="username"
                              type="text"
                              placeholder="Click here..."
                              onChange={(e) => {
                                setFormAdd((prevData) => ({
                                  ...prevData,
                                  restaurants_name: e.target.value,
                                }));
                              }}
                            />
                            <label className="block text-gray-700 text-sm font-bold my-2" for="username">
                              Categories
                            </label>
                            <input
                              className=" px-3 py-2 w-full rounded-lg bg-[#393C49] text-[#E0E6E9] text-sm border border-white border-opacity-30"
                              id="username"
                              type="text"
                              placeholder="Click here..."
                              onChange={(e) => {
                                setFormAdd((prevData) => ({
                                  ...prevData,
                                  restaurants_categories: e.target.value,
                                }));
                              }}
                            />
                            <label className="block text-gray-700 text-sm font-bold my-2" for="username">
                              Location
                            </label>
                            <input
                              className=" px-3 py-2 w-full rounded-lg bg-[#393C49] text-[#E0E6E9] text-sm border border-white border-opacity-30"
                              id="username"
                              type="text"
                              placeholder="Click here..."
                              onChange={(e) => {
                                setFormAdd((prevData) => ({
                                  ...prevData,
                                  restaurants_location: e.target.value,
                                }));
                              }}
                            />
                            <label className="block text-gray-700 text-sm font-bold my-2" for="username">
                              Rating
                            </label>
                            <input
                              className=" px-3 py-2 w-full rounded-lg bg-[#393C49] text-[#E0E6E9] text-sm border border-white border-opacity-30"
                              id="username"
                              type="text"
                              placeholder="Click here..."
                              onChange={(e) => {
                                setFormAdd((prevData) => ({
                                  ...prevData,
                                  restaurants_rating: e.target.value,
                                }));
                              }}
                            />
                            <label className="block text-gray-700 text-sm font-bold my-2" for="username">
                              Description
                            </label>
                            <input
                              className=" px-3 py-2 w-full rounded-lg bg-[#393C49] text-[#E0E6E9] text-sm border border-white border-opacity-30"
                              id="username"
                              type="text"
                              placeholder="Click here..."
                              onChange={(e) => {
                                setFormAdd((prevData) => ({
                                  ...prevData,
                                  restaurants_desc: e.target.value,
                                }));
                              }}
                            />
                          </div>
                          <div className='flex flex-col items-center justify-center mt-4'>
                            <button
                              className='bg-[#FFCA40] px-1 py-2 text-white font-bold w-[80%] rounded-lg'
                              onClick={(e) => {
                                handleAddProducts(e);
                                setAddModal(false);
                              }}
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </> : ''
                }
                {editModal ?
                  <>
                    <div className="flex justify-center items-center overflow-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-black/60">
                      <div className='absolute right-0 top-0 bg-[#1F1D2B] w-[450px] h-[100vh]'>
                        <form encType="multipart/form-data" onSubmit={() => handleUpdateProducts(formEdit.restaurants_id)}>
                          <div className='flex items-center justify-between pl-6'>
                            <p className='py-5'>Edit Products</p>
                            <button
                              className="bg-transparent border-0 text-black"
                              onClick={() => setEditModal(false)}
                            >
                              <span className="text-white opacity-7 h-8 w-8 text-xl block rounded-3xl font-bold mr-5 mt-1 hover:bg-[#564730] bg-[#FFCA40] transition">
                                x
                              </span>
                            </button>

                          </div>
                          <hr className='mt-3 opacity-10' />
                          <div className='text-[#FFCA40] text-sm'>
                            <div className='px-10'>
                              <label className="block text-gray-700 text-sm font-bold my-2" for="file">
                                Image
                              </label>
                              <input
                                type="file"
                                className="border border-white border-opacity-70 rounded-lg w-full py-2 px-1"
                                onChange={(e) => {
                                  setFormEdit((prevData) => ({
                                    ...prevData,
                                    restaurants_image: e.target.files[0],
                                  }));
                                }}
                              />
                            </div>
                          </div>
                          <div className='px-10'>
                            <label className="block text-gray-700 text-sm font-bold my-2" for="username">
                              Nama Restoran
                            </label>
                            <input
                              onChange={(e) => {
                                setFormEdit((prevData) => ({
                                  ...prevData,
                                  restaurants_name: e.target.value,
                                }));
                              }}
                              defaultValue={formEdit.restaurants_name}
                              className=" px-3 py-2 w-full rounded-lg bg-[#393C49] text-[#E0E6E9] text-sm border border-white border-opacity-30"
                              id="username"
                              type="text"
                            />
                            <label className="block text-gray-700 text-sm font-bold my-2" for="username">
                              Kategori Restoran
                            </label>
                            <input
                              className=" px-3 py-2 w-full rounded-lg bg-[#393C49] text-[#E0E6E9] text-sm border border-white border-opacity-30"
                              id="username"
                              type="text"
                              onChange={(e) => {
                                setFormEdit((prevData) => ({
                                  ...prevData,
                                  restaurants_categories: e.target.value,
                                }));
                              }}
                              defaultValue={formEdit.restaurants_categories}
                            />
                            <label className="block text-gray-700 text-sm font-bold my-2" for="username">
                              Rating
                            </label>
                            <input
                              className=" px-3 py-2 w-full rounded-lg bg-[#393C49] text-[#E0E6E9] text-sm border border-white border-opacity-30"
                              id="username"
                              type="number"
                              min={0}
                              max={5}
                              onChange={(e) => {
                                setFormEdit((prevData) => ({
                                  ...prevData,
                                  restaurants_rating: e.target.value,
                                }));
                              }}
                              defaultValue={formEdit.restaurants_rating}
                            />
                            <label className="block text-gray-700 text-sm font-bold my-2" for="username">
                              Lokasi
                            </label>
                            <input
                              className=" px-3 py-2 w-full rounded-lg bg-[#393C49] text-[#E0E6E9] text-sm border border-white border-opacity-30"
                              id="username"
                              type="text"
                              onChange={(e) => {
                                setFormEdit((prevData) => ({
                                  ...prevData,
                                  restaurants_location: e.target.value,
                                }));
                              }}
                              defaultValue={formEdit.restaurants_location}
                            />
                            <label className="block text-gray-700 text-sm font-bold my-2" for="username">
                              Deskripsi
                            </label>
                            <input
                              className=" px-3 py-2 w-full rounded-lg bg-[#393C49] text-[#E0E6E9] text-sm border border-white border-opacity-30"
                              id="username"
                              type="text"
                              onChange={(e) => {
                                setFormEdit((prevData) => ({
                                  ...prevData,
                                  restaurants_desc: e.target.value,
                                }));
                              }}
                              defaultValue={formEdit.restaurants_desc}
                            />
                          </div>
                          <div className='flex flex-col items-center justify-center mt-4'>
                            <button
                              className='bg-[#FFCA40] px-1 py-2 text-white font-bold w-[80%] rounded-lg'
                              onClick={() => {
                                handleUpdateProducts(formEdit.restaurants_id);
                                setEditModal(false);
                              }}
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </> : ''
                }
              </div>
            </div>
            <hr className='mt-10 opacity-10' />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;