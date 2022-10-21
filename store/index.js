import { createStore } from "redux";
import reducer from "../redux/reducer";
import storage from "redux-persist/lib/storage/session";
import { persistStore, persistReducer } from "redux-persist";

const reduxStore = () => {
  const isClient = typeof window !== "undefined";
  if (isClient) {
    const persistConfig = {
      key: "koders-attendance",
      version: 1,
      storage,
      blacklist: ["isFilterQueryInUse", "dateFilteredBy"],
    };
    const persistedReducer = persistReducer(persistConfig, reducer);
    const store = createStore(persistedReducer);
    const persistor = persistStore(store);
    return { persistor, store };
  } else {
    const store = createStore(reducer);
    const persistor = persistStore(store);
    return { persistor, store };
  }
};

export default reduxStore;
