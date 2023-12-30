import instance from '@/Helpers/axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import events from '@/Helpers/constants/events';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


function all() {
    const router = useRouter()
    const [data, setData] = useState([])
    const [loader, setLoader] = useState(true)
    const [noOfPages,setNoOfPages] = useState(null)
    const [isPaginationOn,setIsPaginationOn] = useState(true)
    const [query,setQuery]= useState(false)
    const [queryValue,setQueryValie] = useState('')

    const getAllRegistrations = (page) => {
        instance.get('/admin/registrations/valid/total').then((response)=>{
            const pageCount = response.data.data.total/10
            setNoOfPages(Math.ceil(pageCount))
        })
        instance.get('/admin/registrations/all', { params: { sort: { createdAt: -1 }, page: page ? page : 1 } }).then((res) => {
            setData(res.data.data)
            setLoader(false)
        }).catch((err) => {
            toast("Error Occured")
            setLoader(false)
        })
    }

    const handleSort = (sortKey) => {
        instance.get('/admin/registrations/all', { params: {sort:{ createdAt: sortKey }} }).then((res) => {
            if(sortKey==-1) setIsPaginationOn(true)
            else setIsPaginationOn(false)
            setData(res.data.data)
        }).catch((err) => {
            toast("Error Occured")
        })
    }

    const handleSearch = (text) => {
        setQueryValie(text)
        if (text == '' || text==null ||  text==undefined ) {
            setIsPaginationOn(true)
            getAllRegistrations(1)
            setQuery(false)
        }
        else {
            instance.get('/admin/registration/search', { params: { name: text } })
                .then((res) => {
                    setIsPaginationOn(false)
                    setData(res.data.data)
                    setLoader(false)
                    setQuery(true)
                }).catch((err) => {
                    toast("Error Occured")
                    setIsPaginationOn(true)
                    setLoader(false)
                })
        }
    }

    const handleFilter = async (value, event) => {
        const key = event.target.options[event.target.selectedIndex].text
        let query = { [value] :key }
        if(key=="Valid" || key == "Invalid"){
        query = {valid:value}
        }
        instance.get('/admin/registration/filter', { params: query }).then((res) => {
            setData(res.data.data)
            setIsPaginationOn(false)
            if(key=="Valid") setIsPaginationOn(true)
        }).catch((err) => {
            setIsPaginationOn(true)
            toast("Error Occured")
        })
    }

    const handleDelete = async(e,id)=>{
        e.stopPropagation()
        await instance.delete('/admin/registration/delete',{params:{id:id}})
        .then((response)=>{
            toast("Delted Successfully")
            getAllRegistrations()
        })
        .catch((err) => {
            toast("Error Occured")
        })
    }

    const handleReset = (e)=>{
     router.reload()
    }

    useEffect(() => {
        getAllRegistrations(1)
    }, [])

    useEffect(() => {
        if (query==false) {
            setIsPaginationOn(true)
            getAllRegistrations(1)
        }
    },[query])

    if (loader) return (
        <div style={{ justifyContent: 'center', display: 'flex', marginTop: '70px' }}>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress size="5rem" />
            </Box>
        </div>
    )

    else
        return (
            <div>
                <div style={{ marginTop: "30px" }}>
                    <h1 className='mb-12'>All Registrations</h1>
                    <div style={{ display: 'flex', margin: 'auto' }}>
                        <div class="w-80 flex items-center pl-10">
                            <label for="input-box" class="mr-3 text-sm font-medium text-gray-700">Search</label>
                            <input value={queryValue} id="input-box" name="input-box" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 text-sm" onChange={(e) => handleSearch(e.target.value)} />
                        </div>
                        <div class="sort-container" style={{ marginLeft: 'auto', width: 'max-content' }}>
                            <span>Sort by:</span>
                            <select id="tailwing-sort" onChange={(e) => handleSort(e.target.value)}>
                                <option name='-1' value={-1} >Recently Created</option>
                                <option name='1' value={1}> Previously Created </option>
                            </select>
                        </div>
                        <div class="sort-container" style={{paddingLeft:'30px',margin:'auto'}} >
                            <span>Filter by:</span>
                            <select id="tailwing-sort" onChange={(e) => handleFilter(e.target.value, e)}>
                                <option name='valid' value={'true'}> Valid </option>
                                <option name='valid' value={'false'} >Invalid</option>
                                {
                                    events.map((event)=>
                                    <option name='event' value={'event'} >{event}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div style={{ margin: 'auto', width: 'max-content' }}>
                        <button onClick={(e)=>handleReset(e)}>Reset</button>
                        </div>
                        {/* </div> */}

                    </div>
                    <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
                        <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
                            <thead class="bg-gray-50">
                                <tr>
                                <th scope="col" class="px-6 py-4 font-medium text-gray-900">SL NO</th>
                                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">Name</th>
                                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">Event</th>
                                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">College</th>
                                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">Valid</th>
                                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">Items</th>
                                    <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                                {data && data.map((registration) => {
                                    return (
                                        <tr class="hover:bg-gray-50" style={{ cursor: 'pointer' }} onClick={() => router.push(`/admin/registrationDetails/${registration._id}`)}>
                                            <td class="px-6 py-4">{registration.registerId}</td>
                                            <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                                <div class="relative h-10 w-10">
                                                    <img
                                                        class="h-full w-full rounded-full object-cover object-center"
                                                        src="https://cdn-icons-png.flaticon.com/512/147/147133.png"
                                                        alt=""
                                                    />
                                                    <span class="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                                                </div>
                                                <div class="text-sm">
                                                    <div class="font-medium text-gray-700">{registration.name}</div>
                                                    <div class="text-gray-400">{registration.phone}</div>
                                                </div>
                                            </th>
                                            <td class="px-6 py-4">
                                                <span
                                                    class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
                                                >
                                                    <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                                    {registration.event}
                                                </span>
                                            </td>
                                            <td class="px-6 py-4">{registration.college}</td>
                                            <td class="px-6 py-4">{registration.valid ? "Valid" : "Invalid"}</td>
                                            <td class="px-6 py-4">
                                                <div class="flex gap-2">
                                                    {registration.items.length > 1 ? <>
                                                        {
                                                            registration.items.map((item) => {
                                                                return (
                                                                    <span
                                                                        class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
                                                                    >
                                                                        {item}
                                                                    </span>
                                                                )
                                                            })
                                                        }
                                                    </> : <span
                                                        class="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600"
                                                    >
                                                        {registration.event}
                                                    </span>}
                                                </div>
                                            </td>
                                            <td class="px-6 py-4">
                                                <div class="flex justify-end gap-4" onClick={(e)=>handleDelete(e,registration._id)}>
                                            <a x-data="{ tooltip: 'Delete' }" href="#">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    class="h-6 w-6"
                                                    x-tooltip="tooltip"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                    />
                                                </svg>
                                            </a>
                                           
                                        </div>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
                {(noOfPages > 1 && isPaginationOn) && <Stack  alignItems="center">
                    <Pagination className='pagination-center' count={noOfPages} onChange={(e,value)=>getAllRegistrations(value)} />
                </Stack>}
            </div>
        )
}


export default all