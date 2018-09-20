
import { schema } from 'normalizr';

// 音乐列表
const songList = new schema.Entity('songList', {}, {
  idAttribute: 'id'
});

export const SONGLIST = [songList];

