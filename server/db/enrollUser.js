const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

// const adapter = new FileSync('./server/db/userdb.json');
const adapter = new FileSync('db/userdb.json');
const db = low(adapter);

db.defaults({ users: [] }).write();

const enrollUser = {
    addUser(data){
        if(this.getUserById(data.id) !== undefined) return false;
        db.get('users')
        .push({
            id: data.userid,
            password: data.password,
            name: data.name,
            birth: `${data.year}/${data.month}/${data.date}`,
            gender: data.gender,
            email: data.email,
            phone: data.phone,
            hobby: data.hobby
        })
        .write();
        return true;
    },
    getUserById(id){
        const user = db.get('users')
        .find({ id:id })
        .value();
        return user;
    },
    getUserName(id){
        return this.getUserById(id).name;
    }
}

module.exports = enrollUser;