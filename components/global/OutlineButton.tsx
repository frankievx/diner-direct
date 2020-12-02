const OutlineButton = ({ icon, label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex rounded-lg py-1 tracking-wide text-center cursor-pointer bg-white text-primary shadow-md border border-solid border-primary"
    >
      <div className="text-left ml-4 my-auto">
        <ion-icon class="block" name={icon}></ion-icon>
      </div>
      <div className="mx-auto">{label}</div>
    </div>
  );
};
export default OutlineButton;
