const Icon = (props) => {
  const { icon } = props
  return (
      <ion-icon
        class="block"
        name={icon}
      ></ion-icon>
  );
}

export default Icon;