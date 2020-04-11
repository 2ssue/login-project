const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./db/users/userdb.json');
const db = low(adapter);

db.defaults({ users: [] }).write();

/**
 * Class user database manager
 *
 * @exports
 */
const enrollUser = {
  /**
   * Add user form data to user database
   *
   * @param {Object} data user form data
   */
  addUser(data) {
    if (this.getUserById(data.id) !== undefined) return false;
    db.get('users')
      .push({
        id: data.userid,
        password: data.password,
        name: data.name,
        birth: `${data.year}/${data.month}/${data.date}`,
        gender: data.gender,
        email: data.email,
        phone: data.phone,
        hobby: data.hobby,
      })
      .write();
    return true;
  },
  /**
   * Find user data by user id from database
   *
   * @param {String} id userId String
   * @return {Object} user data object
   */
  getUserById(id) {
    const user = db.get('users').find({ id: id }).value();
    return user;
  },
  /**
   * Get user name by user id
   *
   * @param {String} id
   * @return {String} user name string
   */
  getUserName(id) {
    return this.getUserById(id).name;
  },
};

module.exports = enrollUser;
