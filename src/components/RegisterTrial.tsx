import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
const history = useNavigate();

interface RegisterProps {
  name: string;
  email: string;
  password: string;
}

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
    })
  .required();


function RegisterPage() {
  const [submitRegister, setSubmitRegister] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(userData: RegisterProps) {
    setSubmitRegister(true);
    try {
      await axios.post('https://mock-api.arikmpt.com/api/user/register', {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });

      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = () => {
    history('/');
};

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black p-6 rounded-md backdrop">
        <div className=' overflow-hidden rounded-md shadow border mt-0 max-w-md p-6'>

            <h3 className="text-3xl font-bold text-white mb-4">Register Here!</h3>
            {/* {submitRegister ? (
                <p className="text-red-500">Your account has been created!</p>
            ) : ( */}
                <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="name" className="text-white block mb-2">
                            Name:
                        </label>
                        <Controller
                            name='name'
                            control={control}
                            render={({ field }) => (
                        <>
                        <input
                            id="name"
                            type="text"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder=''
                            className="border border-white px-3 py-2 rounded-md w-full"
                        />
                        {errors?.name && (
                            <p className='mt-2 text-sm text-red-500'>
                              {errors.name.message}
                            </p>
                          )}
                        </>
                        )}/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="text-white block mb-2">
                            Email:
                        </label>
                        <Controller
                            name='email'
                            control={control}
                            render={({ field }) => (
                        <>
                        <input
                            id="email"
                            type="email"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder=''
                            className="border border-white px-3 py-2 rounded-md w-full"
                        />
                            {errors?.email && (
                            <p className='mt-2 text-sm text-red-500'>
                              {errors.email.message}
                            </p>
                          )}
                        </>
                        )}/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="text-white block mb-2">
                            Password:
                        </label>
                        <Controller
                            name='password'
                            control={control}
                            render={({ field }) => (
                        <>
                        <input
                            id="password"
                            type="password"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder=''

                            className="border border-white px-3 py-2 rounded-md w-full"
                        />
                            {errors?.password && (
                            <p className='mt-2 text-sm text-red-500'>
                              {errors.password.message}
                            </p>
                          )}
                        </>
                        )}/>
                    </div>
                    <div className="flex flex-row">
                    <button
                        type="submit"
                        disabled={submitRegister}
                        onClick={handleSubmit(onSubmit)}
                        className="bg-white text-red px-6 py-2 mt-4 max-w-sm rounded-md hover:bg-blue-100 block mx-auto"
                        >
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={handleLogin}
                        className="bg-red-500 text-white px-6 py-2 mt-4 max-w-sm rounded-md hover:bg-gray-300 hover:text-black block mx-auto"
                    >
                        Login
                    </button>
                    </div>
                </form>
            
            

            </div>

        </div>
    );
};

export default RegisterPage;