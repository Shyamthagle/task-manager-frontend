import { useContext, useEffect, ComponentType } from 'react';
import { useRouter } from 'next/navigation';
import { ContextData } from '@/context/ContextProvider';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>): ComponentType<P> => {
  return (props: P) => {
    const { isLoggedIn } = useContext(ContextData);
    const router = useRouter();

    useEffect(() => {
      if (!isLoggedIn) {
        router.replace('/login');
      }
    }, [isLoggedIn, router]);

    if (!isLoggedIn) {
      return null; 
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
