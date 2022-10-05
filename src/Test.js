const Test = () => {
  let itemTypeCode = 0;

  return (
    <div>
      <h1>This is Test component</h1>
      {itemTypeCode === 0 || itemTypeCode === 5 ? `${product.inNetwork} In Vandor` : `${product.inNetwork} In network`}
    </div>
  );
};

export default Test;
