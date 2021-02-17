class Client{
  connect() {
    return new Promise(()=> {
        return;
    }, ()=>{
        return;
    });
  }

  query(str) {
    if (str.includes('undefined')) {
      throw new Error();
    } else {
      return str;
    }
  }
}

module.exports = {
    Client
}