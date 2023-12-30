import React, { useState } from 'react'
import instance from '@/Helpers/axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import events from '@/Helpers/constants/events'

function RegistrationForm() {
    const router = useRouter()
    const [body] = useState({ items: [], })
    const [isVrSelected, setIsVRSelected] = useState(false)

    async function handleRegister(e) {
        e.preventDefault()
        if (body.items) {
            body.items = body.items.map((item) => item.value)
        }
        instance.post('/admin/register', body)
            .then(({data}) => {
                if(!data.data)  toast("Error Occured")
                else{
                    router.push({
                        pathname:`/admin/registrationDetails/${data.data._id}`,
                        query:{isRegisterdNow:true}
                    })
                    toast("Applied Successfully")
                }
            })
            .catch((err) => toast("Error Occured"))
    }

    function getType(item) {
        if (['name', 'college', 'department'].includes(item)) return 'text'
        else if (item == 'email') return 'email'
        else if (item === 'phone') return 'tel'
        else return 'text'
    }

    return (

        <form style={{ display: 'flex', flexDirection: "column" }} className='bg-white bg-opacity-50 backdrop-filter backdrop-blur-md border-2 border-gray-300 border-opacity-50 rounded-lg p-6 shadow-lg regForm' >
            <h1 className='mb-8'>Spot Registration Form</h1>
            {
                ['name', 'college', 'department', 'email', 'phone',].map((item) => {
                    return (
                        <div class="md:flex md:items-center mb-6">
                            <div class="md:w-1/3">
                                <label >
                                    {item.toUpperCase()}
                                </label>
                            </div>
                            <div >
                                <input id="inline-full-name"  type={() => getType(item)} onChange={(e) => body[item] = e.target.value} />
                            </div>
                        </div>
                    )
                })
            }
            <div className='event_parent'>
                <label htmlFor="">Events</label>
                <select name="Event" id="" onChange={(e) => {
                    if (e.target.value == "VR & GAMING EXPERIENCE CENTRE") setIsVRSelected(true)
                    else setIsVRSelected(false)
                    body.event = e.target.value
                }}> Events
                    {
                        events.map((event, index) => {
                            return (
                                <option name={event}>{event}</option>
                            )
                        })
                    }
                </select>
            </div>

            {isVrSelected && <div className='item_parent'>
                {[{ value: "VR EXPIRENCE", count: 0 }, { value: "VR GAMING", count: 0 }, { value: "PS5", count: 0 }, { value: "STEERING WHEEL", count: 0 }].map((item) => {
                    return (
                        <button style={{ borderRadius: '10px', padding: '5px' }} onClick={(e) => {
                            e.preventDefault()
                            item.count = item.count + 1
                            if (item.count % 2 !== 0) {
                                body.items.push(item)
                                e.target.style.background = "#219ebc"
                            } else {
                                body.items.pop(item)
                                e.target.style.background = "white"
                            }
                        }}>{item.value}</button>
                    )
                })}
            </div>}
            <button onClick={(e) => handleRegister(e)} class='bg-blue-500 bg-opacity-70 backdrop-filter backdrop-blur-lg border-2 border-gray-300 border-opacity-50 rounded-lg px-4 py-2 shadow-lg hover:bg-opacity-80 hover:border-opacity-80 hover:shadow-xl transition-all duration-300' type='submit'>Register</button>
        </form>

    )
}

export default RegistrationForm