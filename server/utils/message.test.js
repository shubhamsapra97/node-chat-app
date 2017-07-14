const expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage' , ()=>{

  it('should generate correct message object' , ()=>{
    var from = 'shubham sapra';
    var text = 'Hello World';
    var message = generateMessage(from,text);
    expect(message).toInclude({from,text});
    expect(message.createdAt).toBeA('number');
  });

});
