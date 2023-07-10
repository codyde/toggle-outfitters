// hooks/useErrorHandling.ts
import { useState } from 'react';
import { useShoppingCart } from 'use-shopping-cart';

const useErrorHandling = () => {
  const [errorState, setErrorState] = useState(false);
  
  const { clearCart } = useShoppingCart();

  const errorTesting = async () => {
    try {
      const response = await fetch("/api/checkout", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const jsonData = await response.json();
      console.log(jsonData)
      if (jsonData == "the API is unreachable") {
        setErrorState(true);
        clearCart()
        return 502;
      } else {
        setErrorState(false);
      }
    } catch (e) {
      setErrorState(true);
      console.log("is it running?");
      console.log(e)
      clearCart()
      return 502;
    }
  };

  return { errorState, setErrorState, errorTesting };
};

export default useErrorHandling;
