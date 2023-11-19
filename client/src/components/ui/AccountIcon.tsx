import { useLogoutMutation, useMeQuery } from '@/services/auth';
import { Avatar, Button, Dropdown, MenuProps, Popover } from 'antd';
import { useEffect } from 'react';
import { AiOutlineDropbox, AiOutlineUser } from 'react-icons/ai';
import { CiLogout } from 'react-icons/ci';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const text = <span>Tài khoản</span>;

const content = (
    <div>
        <Link to="/account/signin" className="">
            <p>Đăng nhập</p>
        </Link>
        <Link to="/account/signup" className="">
            <p>Đăng kí</p>
        </Link>
    </div>
);

const AccountIcon: React.FC = () => {
    const { data: authData } = useMeQuery();
    const [logout, { data }] = useLogoutMutation();

    const handleLogout = async () => {
        await logout();
    };

    useEffect(() => {
        if (data === true) {
            window.location.reload();
        }
    }, [data]);

    const items: MenuProps['items'] = [
        {
            label: (
                <Link className="text-base" to={'/account/details'}>
                    Cá nhân
                </Link>
            ),
            key: '0',
            icon: <AiOutlineUser style={{ fontSize: '18px' }} />,
        },
        {
            label: (
                <Link className="text-base" to={`/orders/${authData?._id}`}>
                    Hàng đã đặt
                </Link>
            ),
            key: '1',
            icon: <AiOutlineDropbox style={{ fontSize: '18px' }} />,
        },
        {
            type: 'divider',
        },
        {
            label: (
                <Button onClick={handleLogout} className="text-base">
                    Đăng xuất
                </Button>
            ),
            key: '3',
            icon: <CiLogout style={{ fontSize: '18px' }} />,
        },
    ];

    return (
        <div className="clear-both whitespace-nowrap flex items-center">
            <div className="flex items-center">
                {authData ? (
                    <Dropdown menu={{ items }} trigger={['click']} arrow>
                        <Avatar size={'default'} src="./vite.svg" />
                    </Dropdown>
                ) : (
                    <Popover placement="bottom" title={text} arrow content={content} trigger="click">
                        <span className="relative inline-block mr-5 text-2xl cursor-pointer">
                            <IoPersonCircleOutline className="text-3xl" />
                        </span>
                    </Popover>
                )}
            </div>
        </div>
    );
};

export default AccountIcon;
