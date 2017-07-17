const expect = require('expect');

const {Users} = require('./users');

describe('Users' , ()=>{
    
    var users;
    beforeEach(()=>{
       users = new Users();
       users.users = [{
           id: '1',
           name: 'Shubham',
           room: 'Friends'
       } ,
       {
           id: '2',
           name: 'Peeps',
           room: 'Breaking Bad'
       } ,
       {
           id: '3',
           name: 'Scooter',
           room: 'Friends'
       }];
    });
   
    it('should add new users' , ()=>{
       var users = new Users();
       var user = {
           id: '123',
           name: 'Shubham',
           room: 'Friends'
       };
       var resUser = users.addUser(user.id,user.name,user.room);
       expect(users.users).toEqual([user]);    
    });
    
    it('should return name for Friends room' , ()=>{
       var namesArray = users.getUserList('Friends');
       expect(namesArray).toEqual(['Shubham' , 'Scooter']);    
    });
    
    it('should return name for Breaking Bad room' , ()=>{
       var namesArray = users.getUserList('Breaking Bad');
       expect(namesArray).toEqual(['Peeps']);    
    });
    
    it('should return a user' , ()=>{
       var resUser = users.getUser('1');
       expect(resUser).toEqual(users.users[0]);
    });
    
    it('should not return a user' , ()=>{
       var resUser = users.getUser('99');
       expect(resUser).toNotExist();
    });
    
    it('should remove a user' , ()=>{
       var expectedUser = users.users[0];
       var user = users.removeUser('1');
       expect(user).toEqual(expectedUser);
       expect(users.users.length).toBe(2);    
    });
    
    it('should not remove a user' , ()=>{
       var user = users.removeUser('99');
       expect(user).toNotExist();
       expect(users.users.length).toBe(3);    
    });
    
});