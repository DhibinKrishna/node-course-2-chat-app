const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'raju',
            room: 'kaadu'
        }, {
            id: '2',
            name: 'radha',
            room: 'kaadu'
        }, {
            id: '3',
            name: 'luttappi',
            room: 'marakkoodu'
        }];
    });

    it('should add new user', () => {
        let users = new Users();
        let user = {
            id: '123',
            name: 'Andrew',
            room: 'The Office Fans'
        };
        let resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);                
    });

    it('should remove a user', () => {
        let userId = '1';
        let user = users.removeUser(userId);
        let user1 = users.getUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
        expect(user1).toBeFalsy();
    });

    it('should not remove user', () => {
        let userId = '99';
        let user = users.removeUser(userId);

        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        let userId = '2';
        let user = users.getUser(userId);
        
        expect(user.id).toBe(userId);
    });

    it('should not find user', () => {
        let userId = '99';
        let user = users.getUser(userId);
        
        //expect(user).toNotExist();
        expect(user).toBeFalsy();
    });

    it('should return names for kaadu room', () => {
        let userList = users.getUserList('kaadu');

        expect(userList).toEqual(['raju', 'radha']);
    });

    it('should return names for marakkoodu room', () => {
        let userList = users.getUserList('marakkoodu');

        expect(userList).toEqual(['luttappi']);
    });    
});