import { ReadStream } from 'fs';
import * as gm from 'gm';

const im = gm.subClass({ imageMagick: true });

export const makeThumbnail = (
  stream: Buffer | ReadStream,
  maxWidth: number,
  maxHeight: number
) => {
  return im(stream, '[0]')
    .setFormat('png')
    .fuzz(1, true)
    .trim()
    .repage('+')
    .resize(maxWidth, maxHeight)
    .strip()
    .stream();
};
