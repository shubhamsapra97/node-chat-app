const expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage' , ()=>{

  it('should generate correct message object' , ()=>{
    var from = 'shubham sapra';
    var text = 'Hello World';
    var message = generateMessage(from,text);
    expect(message).toInclude({from,text});
    expect(message.createdAt).toBeA('number');
  });

});

describe('generateLocationMessage' , ()=>{
   
  it('should generate correct location object' , ()=>{
    var from = 'User';
    var latitude = 123;
    var longitude = 1234;
    var url = 'https://www.google.com/maps?q=123,1234';
    var res = generateLocationMessage(from,latitude,longitude);
    
    expect(res).toInclude({from,url});
    expect(res.createdAt).toBeA('number');
  });
    
});
