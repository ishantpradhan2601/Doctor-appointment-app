import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const DoctorRegister = () => {

    const navigate = useNavigate()
    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            // if (!docImg) {
            //     return toast.error('Image Not Selected');
            // }

            const formData = new FormData();

            formData.append('image', docImg);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('experience', experience);
            formData.append('fees', Number(fees));
            formData.append('about', about);
            formData.append('speciality', speciality);
            formData.append('degree', degree);
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

            const { data } = await axios.post(`${backendUrl}/api/doctor/register`, formData)

            if (data.success) {
                toast.success(data.message)
                navigate('/')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
            console.error(error);
        }
    }

    return (
        <div className='min-h-screen py-10 bg-[#F8F9FD] flex flex-col items-center'>
            <div className="w-28 mb-4">
                <img src={assets.logo} alt="Logo" className="w-full cursor-pointer" onClick={() => navigate('/')} />
            </div>
            <form onSubmit={onSubmitHandler} className='bg-white px-8 py-8 border rounded w-full max-w-4xl shadow-lg'>

                <p className='mb-6 text-2xl font-semibold text-primary text-center'>Doctor Registration</p>

                <div className='flex items-center gap-4 mb-8 text-gray-500'>
                    <label htmlFor="doc-img">
                        <img className='w-20 h-20 bg-gray-100 rounded-full cursor-pointer object-cover' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
                    <p className='text-sm'>Upload profile picture <br /> (Optional)</p>
                </div>

                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>

                    <div className='w-full lg:flex-1 flex flex-col gap-4'>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p className='text-sm font-medium'>Full Name</p>
                            <input onChange={e => setName(e.target.value)} value={name} className='border rounded px-3 py-2 text-sm focus:border-primary outline-none' type="text" placeholder='Your Name' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p className='text-sm font-medium'>Email Address</p>
                            <input onChange={e => setEmail(e.target.value)} value={email} className='border rounded px-3 py-2 text-sm focus:border-primary outline-none' type="email" placeholder='Email' required />
                        </div>


                        <div className='flex-1 flex flex-col gap-1'>
                            <p className='text-sm font-medium'>Set Password</p>
                            <input onChange={e => setPassword(e.target.value)} value={password} className='border rounded px-3 py-2 text-sm focus:border-primary outline-none' type="password" placeholder='Password' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p className='text-sm font-medium'>Experience</p>
                            <select onChange={e => setExperience(e.target.value)} value={experience} className='border rounded px-2 py-2 text-sm outline-none' >
                                <option value="1 Year">1 Year</option>
                                <option value="2 Year">2 Years</option>
                                <option value="3 Year">3 Years</option>
                                <option value="4 Year">4 Years</option>
                                <option value="5 Year">5 Years</option>
                                <option value="6 Year">6 Years</option>
                                <option value="8 Year">8 Years</option>
                                <option value="9 Year">9 Years</option>
                                <option value="10 Year">10+ Years</option>
                            </select>
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p className='text-sm font-medium'>Consultation Fees</p>
                            <input onChange={e => setFees(e.target.value)} value={fees} className='border rounded px-3 py-2 text-sm focus:border-primary outline-none' type="number" placeholder='Fees' required />
                        </div>

                    </div>

                    <div className='w-full lg:flex-1 flex flex-col gap-4'>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p className='text-sm font-medium'>Speciality</p>
                            <select onChange={e => setSpeciality(e.target.value)} value={speciality} className='border rounded px-2 py-2 text-sm outline-none'>
                                <option value="General physician">General physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>


                        <div className='flex-1 flex flex-col gap-1'>
                            <p className='text-sm font-medium'>Degree</p>
                            <input onChange={e => setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2 text-sm focus:border-primary outline-none' type="text" placeholder='Degree' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p className='text-sm font-medium'>Address</p>
                            <input onChange={e => setAddress1(e.target.value)} value={address1} className='border rounded px-3 py-2 text-sm focus:border-primary outline-none' type="text" placeholder='Address line 1' required />
                            <input onChange={e => setAddress2(e.target.value)} value={address2} className='border rounded px-3 py-2 text-sm focus:border-primary outline-none' type="text" placeholder='Address line 2' required />
                        </div>

                    </div>

                </div>

                <div>
                    <p className='mt-6 mb-2 text-sm font-medium'>About Me</p>
                    <textarea onChange={e => setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded text-sm focus:border-primary outline-none' rows={5} placeholder='Tell us about yourself' required></textarea>
                </div>

                <div className='flex flex-col items-center mt-8 gap-4'>
                    <button type='submit' className='bg-primary px-20 py-3 text-white rounded-full font-medium transition-all hover:bg-[#4a4a4a]'>Register Now</button>
                    <p className='text-sm'>Already have an account? <span onClick={() => navigate('/')} className='text-primary underline cursor-pointer'>Login here</span></p>
                </div>

            </form>
        </div>
    )
}

export default DoctorRegister
