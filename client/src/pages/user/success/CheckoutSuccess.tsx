import { useMeQuery } from '@/services/auth';
import { useUpdateOrderStatusMutation } from '@/services/order';
import { clear } from '@/slices/cart';
import { useAppDispatch } from '@/store/hook';
import { Status } from '@/types/status';
import { runFireworks } from '@/utils/success';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CheckoutSuccess = () => {
    const { id } = useParams();
    const router = useNavigate();
    const dispatch = useAppDispatch();

    const [update] = useUpdateOrderStatusMutation();
    const { data } = useMeQuery();

    const makeRequest = () => {
        update({
            orderId: id!,
            status: Status.ORDER_CONFIRM,
        });
    };

    useEffect(() => {
        makeRequest();
        runFireworks();
        dispatch(clear());

        setTimeout(() => {
            router('/');
        }, 3000);
    }, []);

    return (
        <div className="bg-gray-100 h-screen flex items-center">
            <div className="bg-white p-6 max-w-3xl w-full rounded md:mx-auto">
                <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                    <path
                        fill="currentColor"
                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                    ></path>
                </svg>
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
                    <p className="text-gray-600 my-2">
                        Cảm ơn khách hàng{' '}
                        <span className="text-red-500 font-semibold text-lg">
                            {data ? data?.username : ''} đã ủng hộ
                        </span>
                    </p>
                 
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

export default CheckoutSuccess;
