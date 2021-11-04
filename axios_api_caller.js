const getUsers = () => {
    const axios_get_call = axios.get
        ('https://user-api-aunsyedshah.herokuapp.com/api/users');
    axios_get_call.then
        (
            response => {
                if (response.data.length === 0) {
                    document.getElementsByClassName('table')[0].innerHTML = 'No users found';
                }
                else {
                    document.getElementsByClassName('table')[0].innerHTML = response.data.map(user => `<tr><td>${user.id}</td><td>${user.name}</td><td>${user.email}</td><td>${user.address}</td></tr>`).join('');
                }
            }).catch(error => {
                return error;
            });
}

const sendUser = () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    if (name === '' || email === '' || address === '') {
        alert('Please fill all the fields');
    } else {
        const axios_post_call = axios.post('https://user-api-aunsyedshah.herokuapp.com/api/adduser', {
            name: name,
            email: email,
            address: address,
        });
        axios_post_call.then
            (
                response => {
                    console.log(response);
                    location.reload();
                }).catch(error => {
                    return error;
                });
    }
}

const deleteUser = () => {
    const user_id = document.getElementById('delete_user_id').value;
    const axios_delete_call = axios.delete(`https://user-api-aunsyedshah.herokuapp.com/api/deleteuser/${user_id}`);
    axios_delete_call.then
        (
            response => {
                console.log(response);
                location.reload();
            }).catch(error => {
                return error;
            });
}