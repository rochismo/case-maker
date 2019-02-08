import {
    Events
} from './data.js';
export class Service {
    constructor() {
        this.sock = io({
            transports: ['websocket'],
            upgrade: false
        });
        this.setUp();
    }
    setUp() {
        for (let key in Events) {
            const {name, cb} = Events[key]
            this.on(name, cb);
        }
    }

    emit(msg, data = null) {
        this.sock.emit(msg, data);
    }

    on(msg, cb) {
        this.sock.on(msg, cb);
    }
}