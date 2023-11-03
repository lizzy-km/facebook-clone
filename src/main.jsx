import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/services/store.js";
import { ChakraProvider } from "@chakra-ui/react";
import { inject } from "@vercel/analytics";

inject();

// const element = mount(App, document.getElementById('root'));

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </Provider>
);
