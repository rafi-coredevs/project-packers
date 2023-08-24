/**
 * Icon() returns JSX Element
 * @param {string} type  style will be applied based on type
 * @param {any} icon icons
 * @param {boolean} unread indicator will flash based on this
 * 
 * @returns JSX Element
 */

const Icon = ({ type, icon, unread }) => {
  const styles = {
    active: "bg-[#FBE697]",
    actual: "bg-[#A2EEE7]",
  };
  return (
    <div
      className={
        (type ? styles[type] : styles.actual) +
        ` relative  flex items-center justify-center rounded-full h-9 w-9 p-[6px] `
      }
    >
      {unread && (
        <>
          <span className=" flex absolute top-0 right-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
        </>
      )}
      <img className="h-9 w-9 shrink-0" src={icon} alt="" />
    </div>
  );
};

export default Icon;
