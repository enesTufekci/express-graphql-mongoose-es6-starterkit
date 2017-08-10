import Dataloader from 'dataloader';
import { groupBy } from 'lodash';

import User from '../../models/user';

const batchUser = async (keys) => {
  const users = await User.find({ _id: { $in: keys } }).then(result => result);

  const userGroup = groupBy(users, '_id');

  const data = keys.map(key => userGroup[key][0]);

  return data;
};

const UserLoader = new Dataloader(keys => batchUser(keys));

export default UserLoader;
