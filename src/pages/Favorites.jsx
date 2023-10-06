import { useContext } from "react";
import Card from "../components/Card";
import { AppContext } from "../App";
function Favorites () {

  const {favorites, onAddToFavorite} = useContext(AppContext)
  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>My Favorites</h1>
      </div>

      <div className="d-flex flex-wrap" style={{ gap: "30px" }}>
        {favorites.map((item, index) => {
          return (
            <Card
              key={index}
              favorited={true}
              onFavorite={onAddToFavorite}
              {...item}
            />
          );
        })}
      </div>
    </div>
  );
}
export default Favorites;
