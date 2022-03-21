import { UserModule } from '~/types/vite-ssg';

export const install: UserModule = ({ router, isClient }) => {
  if (isClient) {
    router.beforeEach(async (to) => {
      console.log(to.name);
      if (to.name === 'summary' || to.name === 'thank-you') return true;
      return { name: 'thank-you' };
    });
  }
};
