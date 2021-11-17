let users_array = []


function printArrayTable(users_array) {
    const output_table = document.getElementById('tableBodyOutPut');
    for (let index = 0; index < users_array.length; index++) {
        let row = `
                <tr id="${users_array[index]._id}">
                    <th scope="row">${users_array[index]._id}</th>
                    <td>${users_array[index].name}</td>
                    <td>${users_array[index].email}</td>
                    <td>${users_array[index].address}</td>
                    <td><button type="button" class="btn btn-danger" onclick="deleteUser('${users_array[index]._id}')">Delete</button></td>
                    <td><button type="button" class="btn btn-info" onclick="editUser('${users_array[index]._id}', ${index})">Edit</button></td>
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
                    users_array = response.data;
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



const getUser = (id) => {
    const axios_get_call = axios.get(`https://user-api-aunsyedshah.herokuapp.com/api/users/${id}`);
    axios_get_call.then
        (
            response => {
                const user_object = response.data;
                document.getElementById('user_id').value = user_object._id;
                document.getElementById('name').value = user_object.name;
                document.getElementById('email').value = user_object.email;
                document.getElementById('address').value = user_object.address;
            }).catch(error => {
                alert(error);
            });
}

function editUser(_id, index) {
    console.log(_id, index);

    const userObject = users_array[index]

    console.log("userObject: ", userObject);

    document.getElementById(_id).innerHTML = `
    <tr id="${_id}"> 
        
            <th scope="row">${_id}</th>
            <td><input type="text" id="${_id}-name" value="${userObject.name}" /></td>
            <td><input type="text" id="${_id}-email" value="${userObject.email}" /></td>
            <td><input type="text" id="${_id}-address" value="${userObject.address}" /></td>
            <td>
                <button type="button" onclick="updateUser('${_id}')" class="btn btn-success">Update</button>
            </td>
        </tr>`;
}

function updateUser(_id) {

    const name = document.getElementById(`${_id}-name`).value
    const email = document.getElementById(`${_id}-email`).value
    const address = document.getElementById(`${_id}-address`).value

    axios.put(`https://user-api-aunsyedshah.herokuapp.com/api/users/${_id}`, { name, email, address })
        .then(function (response) {
            getUsers();
        })
}
