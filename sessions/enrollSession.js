const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const uuid = require('uuid/v1');

const adapter = new FileSync('sessions/sessiondb.json');
const db = low(adapter);

db.defaults({ sessions: [] }).write();

/**
 * Class session database manager
 *
 * @exports
 */
const enrollSession = {
  /**
   * Add session data to database
   *
   * @param {String} sessionId
   * @param {String} id
   * @param {String} name
   */
  addSession(sessionId, id, name) {
    db.get('sessions')
      .push({
        sessionID: sessionId,
        userInfo: {
          id: id,
          name: name,
        },
      })
      .write();

    return true;
  },
  /**
   * Delete session object by session id
   *
   * @param {String} id session id
   */
  deleteSession(id) {
    db.get('sessions').remove({ sessionID: id }).write();

    return true;
  },
  /**
   * Find session by session id
   *
   * @param {String} id session id
   * @return {Object||Boolean} if session exist return session object else false
   */
  findSession(id) {
    const session = db.get('sessions').find({ sessionID: id }).value();

    return session ? session : false;
  },
  /**
   * generate session id using uuid module
   *
   * @return {String} unique session id
   */
  generateSessionID() {
    return uuid();
  },
};

module.exports = enrollSession;
