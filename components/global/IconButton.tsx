const IconButton = ({ icon, onClick, size }) => {
  console.log('size', size);
  let textSize = (size) ? 'text-' + size : 'text-sm'
  console.log('textSize', textSize);
  return (
    <div
      className={'text-gray-600 my-auto mr-1 h-auto cursor-pointer rounded-full hover:bg-gray-200 p-1 ' + textSize}
      onMouseDown={onClick}
    >
      <ion-icon class="block" name={icon}></ion-icon>
    </div>
  );
};
export default IconButton;
