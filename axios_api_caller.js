const getUsers = () => {
    const axios_get_call = axios.get
        ('https://user-api-aunsyedshah.herokuapp.com/api/users');
    axios_get_call.then
        (
            response => {
                document.getElementById('result').innerHTML = response.data.map(user => `<li>${user.name}</li>`).join('');
            }).catch(error => {
                return error;
            });
}

const sendUser = () => {
    const axios_post_call = axios.post('https://user-api-aunsyedshah.herokuapp.com/api/adduser', {
            name: 'Shah',
            email: 'aun',
            address: 'aun',
        });
    axios_post_call.then
        (
            response => {
                console.log(response);
            }).catch(error => {
                return error;
            });
}