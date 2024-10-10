class Storage {
  save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  get(key) {
    const info = localStorage.getItem(key);
    return JSON.parse(info);
  }
}

const storage = new Storage();

export default storage;
