import { useState } from "react";

export default function useLocalStorage(key, value) {
  const localStorageItem = localStorage.getItem(key);
  const initialState = JSON.parse(localStorageItem) || value;
  const [state, setState] = useState(initialState);

  function setStateAndLocalStorage(value) {
    setState(value);
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  }

  return [state, setStateAndLocalStorage];
}
