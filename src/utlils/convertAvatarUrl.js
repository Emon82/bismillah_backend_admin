// import { baseUrl } from '../constants/api';

const convertAvatarUrl = (data) => {
  if (data) {
    const avatarUrl = `https://www.bismillahmarriage.com/${data?.host}/${data?.path.join('/')}/${
      data?.id
    }/${data?.name}`;
    return avatarUrl;
  }
  return null;
};
export default convertAvatarUrl;
