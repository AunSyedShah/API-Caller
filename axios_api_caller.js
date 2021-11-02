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

const postUsers = () => {
    const axios_post_call = axios.post
        (
            'https://user-api-aunsyedshah.herokuapp.com/api/adduser',
            {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
        ).then
        (
            response => {
                console.log(response);
            }
        );
}