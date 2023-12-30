import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import instance from '@/Helpers/axios'
import { toast } from 'react-toastify'
import oldDateFormatter from '@/Helpers/Functions/General/oldDateFormatter'


function registrationDetails() {
    const router = useRouter()
    const [data, setData] = useState(null)

    useEffect(() => {
        if (router.query.id === null || router.query.id == undefined) return
        else {
            instance.get('/admin/registration', { params: { id: router.query.id } })
                .then((response) => {
                    setData(response.data.data)
                })
                .catch((err) => toast("Error Occured"))
        }
    }, [router.query.id])


    const TextDisplay = ({ label, value }) => {
        return (
            <div className="flex justify-between items-center mb-4">
                <span className="font-medium font-medium w-24">{label}:</span>
                <span>{value}</span>
            </div>
        );
    };

    const markAsRead = async () => {
        await instance.patch('/admin/registration/markasread', null, { params: { id: router.query.id } })
            .then((response) => {
                setData(response.data.data)
                toast("Registration Marked As Read")
            }).catch((err) => {
                toast("Error Occured")
            })
    }

    return (
        <div style={{ marginTop: '50px' }}>
          
            {data !== null && <div className=" flex flex-col items-center ">
                <h1 className="text-2xl font-bold mb-4">Registration Details</h1>
                <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                    <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                        <div class="text-gray-600">
                        <img src='/cek.png' style={{height:'60px',width:'90%'}} />
                            {/* <p class="font-medium text-lg span-2">  </p> */}
                            {/* <p>Please fill out all the fields.</p> */}
                        </div>

                        <div class="lg:col-span-2">
                            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                <div class="md:col-span-5">
                                    <label for="full_name">Full Name</label>
                                    <input id="full_name" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={data.name} disabled />
                                </div>
                                <div class="md:col-span-5">
                                    <label for="address">College</label>
                                    <input id="address" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={data.college} disabled />
                                </div>


                                <div class="md:col-span-5">
                                    <label for="email">Phone</label>
                                    <input id="email" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={data.phone} disabled />
                                </div>


                                <div class="md:col-span-2">
                                    <label for="city">Email Address</label>
                                    <input id="city" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={data.email} disabled />
                                </div>

                                <div class="md:col-span-2">
                                    <label for="state">Registration ID</label>
                                    <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                        <input id="state" class="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" value={data.registerId} disabled />
                                    </div>
                                </div>

                                <div class="md:col-span-2">
                                    <label for="country">Event</label>
                                    <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                        <input id="country" class="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" value={data.event} disabled />
                                    </div>
                                </div>

                                <div class="md:col-span-2">
                                    <label for="country">Registerd  At</label>
                                    <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                        <input id="country" class="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" value={oldDateFormatter(data.createdAt)} disabled />
                                    </div>
                                </div>


                                <div class="md:col-span-5">
                                    <label for="zipcode">Items</label>
                                    <input id="zipcode" class="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" disabled value={`${data.items.map((item) => ` ${item}  `)} `} />
                                </div>

                                <div class="md:col-span-4 text-right mt-6">
                                    {data.valid == true && <div class="inline-flex items-end">
                                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " onClick={() => markAsRead()}>Mark As Read</button>
                                    </div>}
                                    <div class="inline-flex items-end pl-5">
                                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " className={`${data.valid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'} text-white py-2 px-4 rounded mr-4`}> {data.valid === true ? "Valid" : "Invalid"}</button>
                                    </div>
                                    <div class="inline-flex items-end pl-5">
                                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " onClick={()=>router.push('/admin/register')} >New Registration</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>}
        </div>
    )
}

export default registrationDetails