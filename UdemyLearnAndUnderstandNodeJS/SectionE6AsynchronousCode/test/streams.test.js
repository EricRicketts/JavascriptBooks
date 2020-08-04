let fs = require('fs');
let path = require('path');

describe('F9 Streams', function () {
  let readable, writable, fileDirectory;
  beforeEach(() => {
    fileDirectory = path.join(__dirname, '..', '/files');
    readable = fs.createReadStream(fileDirectory + '/greet_streams.txt', { highWaterMark: 8*1024});
    writable = fs.createWriteStream(fileDirectory + '/greet_streams_copy.txt');
  });

  afterEach(() => {
    fs.writeFileSync(fileDirectory + '/greet_streams_copy.txt', '');
  });

  it('should allow the different chunk sizes', function () {
    let chunkSizes = [];
    readable.on('data', function(chunk) {
      chunkSizes.push(chunk.length)
    });

    expect(chunkSizes.length > 0).toBe(true);
  });
});