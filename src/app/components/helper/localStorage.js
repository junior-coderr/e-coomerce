const localStorage = {
  setValue: (key, value) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  },
  getValue: (key) => {
    if (typeof window !== "undefined") {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
  },
};

export default localStorage;
