export const fetcherWithFetch = async (url) => {
  
  var response = null;

  try{
      response = await fetch(url, {
      headers: {
        Accept: "application/json"
      }
    });
  } catch(exception) {
      console.log(exception)
  }
  
    if (!response.ok) {
      throw new Error(`HTTP error: Status ${response.status}`);
    }
  
    return response.json();
    
  };
  
  export const getRequestWithNativeFetch = async (
    url,
    signal = null
  ) => {
    const response = await fetch(url, { signal });
  
    if (!response.ok) {
      throw new Error(`HTTP error: Status ${response.status}`);
    }
  
    return response.json();
  };