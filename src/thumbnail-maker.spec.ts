import * as fs from 'fs';
import * as gm from 'gm';
import { join } from 'path';
import { makeThumbnail } from './thumbnail-maker';
import * as assert from 'assert';

const im = gm.subClass({ imageMagick: true });

const resourceDir = join(__dirname, '..', 'resource');
const testPdf = join(resourceDir, 'test.pdf');
const testThumbnail = join(resourceDir, 'tmp', 'test.png');

describe('thumbnailMaker', () => {
  it('should create a thumbnail file', done => {
    const readStream = fs.createReadStream(testPdf);
    const writeStream = fs.createWriteStream(testThumbnail);
    const thumbnailStream = makeThumbnail(readStream, 400, 400);

    thumbnailStream
      .pipe(writeStream)
      .on('error', err => { throw err; })
      .on('finish', () =>
        im(testThumbnail)
          .size((err, size) => {
            if (err) {
              throw err;
            }
            assert.equal(size.height <= 400, true);
            assert.equal(size.width <= 400, true);
            done();
          })
      );
  });
});
