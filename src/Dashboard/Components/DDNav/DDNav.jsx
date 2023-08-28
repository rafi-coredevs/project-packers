
import dashboard from '../../../assets/icons/cd-dashboard.svg';
import dashboardWhite from '../../../assets/icons/Group-w.svg';
import order from '../../../assets/icons/cd-order.svg';
import orderWhite from '../../../assets/icons/cd-order-w.svg';
import products from '../../../assets/icons/cd-products.svg';
import userList from '../../../assets/icons/cd-user-list.svg';
import userListWhite from '../../../assets/icons/cd-user-list-w.svg';
import chat from '../../../assets/icons/cd-chat.svg';
import chatWhite from '../../../assets/icons/cd-chat-w.svg';
import NavDropdown from './NavDropdown';
import NavNoDropdown from './NavNoDropdown';
/**
 * returns JSX for admin sidebar
 * collapsible and non-collapsible
 * nav list hold the structure for the admin sidebar 
 */
const DDNav = () => {
    const navList = [
        {
            id: 1,
            title: 'Dashboard',
            icon: dashboard,
            iconWhite: dashboardWhite,
            to: '/admin',
            end: true,
            isDropdown: null
        },
        {
            id: 2,
            title: 'Order',
            icon: order,
            isDropdown: [
                {
                    id: 1,
                    title: 'Item request',
                    to: '/admin/request',
                    end: false,
                },
                {
                    id: 2,
                    title: 'All Orders',
                    to: '/admin/orders',
                    end: false,
                }
            ]
        },
        {
            id: 3,
            title: 'Products',
            icon: products,
            isDropdown: [
                {
                    id: 1,
                    title: 'All Products',
                    to: '/admin/products',
                    end: false,
                },
                {
                    id: 2,
                    title: 'Discount',
                    to: '/admin/discount',
                    end: false,
                },
                {
                    id: 3,
                    title: 'Category',
                    to: '/admin/category',
                    end: false,
                }
            ]
        },
        {
            id: 4,
            title: 'Customers',
            icon: userList,
            iconWhite: userListWhite,
            to: '/admin/customers',
            end: false,
            isDropdown: null
        },
        {
            id: 5,
            title: 'Support',
            icon: chat,
            iconWhite: chatWhite,
            to: '/admin/support',
            end: false,
            isDropdown: null
        },
        {
            id: 6,
            title: 'Staff',
            icon: order,
            iconWhite: orderWhite,
            to: '/admin/staff',
            end: false,
            isDropdown: null
        }
    ]

    return (
        <nav className='w-full h-full overflow-hidden bg-[#efefef] pt-4 border-r'>
            <div className='w-full pr-2'>
                <ul>
                    {
                        navList.map(list => (
                            <li
                                key={list.id}
                            >
                                {
                                    list.isDropdown ? <NavDropdown list={list} /> : <NavNoDropdown list={list} />
                                }
                            </li>
                        ))
                    }
                </ul>
            </div>
        </nav>
    );
};

export default DDNav;
