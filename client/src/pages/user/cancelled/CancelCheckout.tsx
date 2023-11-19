
import axios from 'axios';
import { useEffect } from 'react';
import { MdOutlineErrorOutline } from 'react-icons/md';
import {  useParams } from 'react-router-dom';

const CancelCheckout = () => {
    const { id } = useParams();

    useEffect(() => {
        const makeRequest = async () => {
            try {
                await axios.delete(`http://localhost:8080/stripe/cancelled/${id}`, {
                    headers: {
                        clear: true,
                    },
                });
            } catch (error) {
                console.log((error as any).message);
            }
        };

        makeRequest();
    }, [id]);

    return (
        <div className="bg-gray-100 h-screen flex items-center">
            <div className="bg-white p-6 max-w-3xl w-full rounded md:mx-auto">
                <div className="text-center flex flex-col justify-center gap-y-2">
                <MdOutlineErrorOutline className="text-[100px] block w-full text-red-500"/>
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                        Thanh toán không thành công!
                    </h3>

                    <div className="py-10 text-center">
                        <a href="/" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                            GO BACK
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CancelCheckout;
