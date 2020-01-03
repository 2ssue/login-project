const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const uuid = require('uuid/v1');

const adapter = new FileSync('sessions/sessiondb.json');
const db = low(adapter);

db.defaults({ sessions: [] }).write();

const enrollSession = {
    addSession(sessionId, id, name){
        db.get('sessions')
        .push({
            sessionID: sessionId,
            userInfo: {
                id: id,
                name: name
            }
        }).write();

        return true;
    },
    deleteSession(id){
        db.get('sessions')
        .remove({ userInfo:{
            id: id
        }})
        .write();
    },
    findSession(id){
        const session = db.get('sessions')
        .find({sessionID: id})
        .value();
        
        return session ? session : false;
    },
    generateSessionID(){
        return uuid();
    }
}

module.exports = enrollSession;