import { useSnapshot } from 'valtio';
import { state } from '../state';
import { GetStarted } from './GetStarted';
import { Study } from './Study';

export const App = () => {
  const snap = useSnapshot(state);

  if (snap.step === 0) {
    return <GetStarted />;
  }

  if (snap.step === 1) {
    return <Study />;
  }

  return null;
};
