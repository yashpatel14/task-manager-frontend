class ApiClient {
    constructor() {
      this.baseURL = "http://localhost:8000/api/v1";
      this.defaultHeaders = {
        "Content-Type": "application/json",
        "Accept": "application/json",
      };
    }
  
    async customFetch(endpoint, options = {}) {
      try {
        const url = `${this.baseURL}${endpoint}`;
        const headers = { ...this.defaultHeaders, ...options.headers };
        console.log(headers)
        const config = {
          ...options,
          headers,
          credentials: "include",
        };
        console.log(`Fetching ${url}`);
        const response = await fetch(url, config);
        //check if response.ok === value
        console.log(response)
        const data = await response.json();
        return data;
      } catch (error) {
        console.log("API Error", error);
        throw error;
      }
    }
  
    //Auth endpoints
  
    async signup(username, email, password) {
      return this.customFetch("/users/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
      });
    }
    async login(email, password) {
      return this.customFetch("/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
    }

    async logout() {
        return this.customFetch("/users/logout", {
          method: "POST",
        });
      }
  
    async getProfile() {
      return this.customFetch("/users/current-user", {
        method: "GET",
       
      });
    }
  }
  
  const apiClient = new ApiClient();
  
  export default apiClient;
  