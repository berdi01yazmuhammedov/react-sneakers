import { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { createContext } from "react";
import Orders from "./pages/Orders";

export const AppContext = createContext({});

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
    try {
      const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
        axios.get(
          "https://64e3433fbac46e480e787d32.mockapi.io/cart"
        ),
        axios.get(
          "https://650edbf854d18aabfe9987ff.mockapi.io/favorites"
        ),
        axios.get(
          "https://64e3433fbac46e480e787d32.mockapi.io/items"
        ),
      ])
      setIsLoading(false);
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
      
    } catch (error) {
      alert("Error on getting things from database");
      console.error(error);
    }
    
  }
  fetchData();

    
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(`https://64e3433fbac46e480e787d32.mockapi.io/cart/${findItem.id}`)
      } else {
        setCartItems((prev) => [...prev, obj]);
        const {data} = await axios.post("https://64e3433fbac46e480e787d32.mockapi.io/cart", obj);
        setCartItems((prev) => prev.map(item => {
          if(item.parentId === data.parentId){
            return{
              ...item,
              id: data.id
            }
          }
          return item;
        }));
      }
    } catch (error) {
      alert("Error on adding to cart");
      console.error(error)
    }
    
  };
  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://64e3433fbac46e480e787d32.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      alert("Error on removing from cart");
      console.error(error)
    }
    
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(
          `https://650edbf854d18aabfe9987ff.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prev) =>
        prev.filter((item) => Number(item.id) !== Number(obj.id))
      );
      } else {
        const { data } = await axios.post(
          `https://650edbf854d18aabfe9987ff.mockapi.io/favorites`,
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Can't add to the favorites");
      console.error(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  }

  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems, onAddToCart}}>
<div className="wrapper clear">
  
  <Drawer
          items={cartItems}
          onRemove={onRemoveItem}
          onClose={() => setCartOpened(false)}
          opened={cartOpened}
        />
 
        
      <Header onClickCart={() => setCartOpened(true)} />
      <Routes>
        <Route
          path=""
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              cartItems={cartItems}
              isLoading={isLoading}
            />
          }
        ></Route>
        <Route
          path="favorites"
          element={
            <Favorites />
          }
        ></Route>
        <Route
          path="orders"
          element={
            <Orders />
          }
        ></Route>
      </Routes>
    </div>
    </AppContext.Provider>
    
  );
}

export default App;
