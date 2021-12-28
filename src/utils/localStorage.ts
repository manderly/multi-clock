const localStorageUtils = {

  // get from localStorage and return string parsed into JSON 
  get: (name: string) => {
    const saved = localStorage.getItem(name) as string;
    const parsed = JSON.parse(saved);
    return parsed;
  },

  // put an item into localStorage 
  put: (name: string, data: any) => {
    try {
      localStorage.setItem(name, JSON.stringify(data));
    } catch {
      console.log("could not update item " + name + " with data: " + data);
    }
  },

  delete: (name: string) => {
    try {
      localStorage.removeItem(name);
    } catch {
      console.log("could not remove item " + name);
    }
  }
}

export default localStorageUtils;