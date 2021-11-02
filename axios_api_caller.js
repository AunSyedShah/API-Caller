const getUsers = () => {
    const axios_get_call = axios.get('https://user-api-aunsyedshah.herokuapp.com/api/users');
    axios_get_call.then(response => {
        document.getElementById('result').innerHTML = response.data.map(user => `<li>${user.name}</li>`).join('');
        return response.data;
    }).catch(error => {
        return error;
    });
}