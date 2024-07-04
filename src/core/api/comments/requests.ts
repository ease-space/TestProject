import {Comment} from './responses';

import {comments_mock} from './mocks';

export const getComments = () => {
  return new Promise<Comment[]>(resolve => {
    setTimeout(() => resolve(comments_mock), 2000);
  });
};
