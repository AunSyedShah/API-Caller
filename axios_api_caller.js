function printArrayTable(arr) {
    const output_table = document.getElementById('tableBodyOutPut');
    for (let index = 0; index < arr.length; index++) {
        let row = `
                <tr>
                    <td>
                    ${arr[index].name}
                    </td>
                    <td>
                    ${arr[index].email}
                    </td>
                    <td>
                    ${arr[index].address}
                    </td>
                    <td><button type="button" class="btn btn-danger" onclick="deleteUser('${arr[index]._id}')">Delete</button></td>
                    <td><button type="button" class="btn btn-info" onclick="getUser('${arr[index]._id}')">Edit</button></td>
                </tr>
                `
        output_table.innerHTML += row;

    }
}


const getUsers = () => {
    const axios_get_call = axios.get
        ('https://user-api-aunsyedshah.herokuapp.com/api/users');
    axios_get_call.then
        (
            response => {
                if (response.data.length === 0) {
                    const output_table = document.getElementById('tableBodyOutPut');
                    const no_user_message = `
                    <tr>
                        <td colspan="4">No User Found</td>
                    </tr>
                    `
                    output_table.innerHTML = no_user_message;
                }
                else {
                    document.getElementById('tableBodyOutPut').innerHTML = '';
                    const users_array = response.data;
                    printArrayTable(users_array);
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
    }
    else {
        const userObject = {
            name: name,
            email: email,
            address: address,
        }
        axios.post('https://user-api-aunsyedshah.herokuapp.com/api/users', userObject).then
            (
                response => {
                    getUsers();
                }).catch(error => {
                    return error;
                });
    }
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('address').value = '';
}

const deleteUser = (id) => {
    const axios_delete_call = axios.delete(`https://user-api-aunsyedshah.herokuapp.com/api/users/${id}`);
    axios_delete_call.then
        (
            response => {
                getUsers();
            }).catch(error => {
                alert(error);
            });
}

const updateUser = (id) => {
    const axios_update_call = axios.put(`https://user-api-aunsyedshah.herokuapp.com/api/users/${id}`);
    axios_update_call.then
        (
            response => {
                getUsers();
            }).catch(error => {
                alert(error);
            });
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('address').value = '';
}


const getUser = (id) => {
    const axios_get_call = axios.get(`https://user-api-aunsyedshah.herokuapp.com/api/users/${id}`);
    axios_get_call.then
        (
            response => {
                const user_object = response.data;
                document.getElementById('name').value = user_object.name;
                document.getElementById('email').value = user_object.email;
                document.getElementById('address').value = user_object.address;
            }).catch(error => {
                alert(error);
            });
}
