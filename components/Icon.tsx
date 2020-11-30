const Icon = (props) => {
  const { icon } = props
  return (
    <div className="p-1 mx-auto w-8">
      <ion-icon
        className="hover:bg-gray-300 cursor-pointer mx-auto"
        name={icon}
      ></ion-icon>
    </div>
  );
}

export default Icon;