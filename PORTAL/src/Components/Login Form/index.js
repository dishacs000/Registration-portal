import React, { useContext, useState, } from 'react'
import instance from '@/Helpers/axios'
import { toast } from 'react-toastify'
import { parentStore } from '@/pages/_app'
import { useRouter } from 'next/router'


function LoginForm() {
    const router = useRouter()
    const [body] = useState({})
    const { parentState, setParentState } = useContext(parentStore)

    const handleSubmit = (e) => {
        e.preventDefault()
        instance.post('/admin/login', body)
            .then((response) => {
                if (response.data.loggedIn) {
                    setParentState({ admin: true })
                    sessionStorage.setItem('data', JSON.stringify({ admin: true }))
                    toast.success('Login Success')
                    router.push('/admin/registrations/all')
                }
                else toast('Login Failed')
            })
            .catch((err) => {
                toast('Error Occured')
            })
    }

    return (
        <section class="bg-gray-50 dark:bg-gray-900">
             {/* <img src="/cek4.png" alt="logo" /> */}
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <img class="w-8 h-8 mr-2" src="/logo.png" alt="logo" style={{width:'200px',height:'200px'}} />
                <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"> 
                    Registration Portal
                </a>
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        {/* <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1> */}
                        <form class="space-y-4 md:space-y-6" onSubmit={(e) => handleSubmit(e)}>
                            <div>
                                <label for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                <input type="text" name="name" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Name Here" required onChange={(e) => body.name = e.target.value} />
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={(e) => body.pwd = e.target.value} />
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div class="ml-3 text-sm">
                                        <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>
                            <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                            </p>
                        </form>
                    </div>       
                </div>
            </div>
        </section>
    )
}

export default LoginForm