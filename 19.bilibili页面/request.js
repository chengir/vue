axios.defaults.baseURL = 'https://developer.duyiedu.com/vue/bz/';

// axios请求拦截器
axios.interceptors.response.use((response) => {
    const {
        status
    } = response;
    const {
        baseURL,
        url
    } = response.config;

    if (status === 200) {

        if (url === 'video') {
            return {
                count: response.data.count,
                data: response.data.data
            }
        }
        return response.data.data;
    }
    return response;
})