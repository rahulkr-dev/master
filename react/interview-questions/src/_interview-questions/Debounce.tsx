import React, { useState,useCallback } from "react";

// Get Data function 
async function getUserData() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

// Debounce funciton
const debounce = <T extends unknown[]>(cb: (...args: T) => void, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: T) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

const Debounce: React.FC = () => {
  const [value, setValue] = useState("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const myDebounce = useCallback(debounce(getUserData, 500),[])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setValue(e.target.value)
    myDebounce();
  };

  return (
    <div className="p-4">
      <input
        value={value}
        onChange={handleChange}
        className="border-2 rounded-e-sm px-4 py-2 ring-2"
        type="text"
        placeholder="Search Movies"
      />
    </div>
  );
};

export default Debounce;
