/**
* user icon with letter
* @param {String} name user name
* @returns icon with user name letter

*/
const UserIcon = ({ name = String }) => {
    const userName = name.split(" ");
    const firstName = userName[0];
    const lastName = userName[1];
    const initials = lastName ? (firstName[0] + lastName[0]).toUpperCase() : firstName[0].toUpperCase();
    return (
        <button className='w-10 h-10 bg-primary font-bold text-secondary rounded-full duration-200 active:scale-95'>
            <span className='text-lg font-normal'>{initials}</span>
        </button>
    );
};

export default UserIcon;