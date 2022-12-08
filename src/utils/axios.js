import axios from 'axios';

export default axios.create({
    baseURL: `http://localhost:8080/api`,
    headers: {
        permission : `2021D@T@f@RSt*6&%2-D@T@`
        }
});