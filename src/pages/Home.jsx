import Card from "../components/Card";

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) {

  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
      (isLoading
      ? [...Array(8)]
      : filteredItems).map((item, index) => {
          return (
            <Card
              key={index}
              onFavorite={(obj) => onAddToFavorite(obj)}
              onPlus={(obj) => onAddToCart(obj)}
              loading={isLoading}
              {...item}
            />
          );
        })
    );
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
        </h1>
        <div className="search-block d-flex">
          <img src="img/search.svg" alt="Search" />
          {searchValue && (
            <img
              className="clear cu-p"
              src="img/btn-remove.svg"
              alt="Close"
              onClick={() => setSearchValue("")}
            />
          )}
          <input
            onChange={onChangeSearchInput}
            type="text"
            value={searchValue}
            placeholder="Поиск..qwe."
          />
        </div>
      </div>

      <div className="d-flex flex-wrap" style={{ gap: "30px" }}>
        {renderItems()}
      </div>
    </div>
  );
}
export default Home;
