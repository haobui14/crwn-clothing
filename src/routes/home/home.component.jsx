import { Outlet } from 'react-router-dom';

import Directory from '../../components/directory/directory.component';

const Home = () => {
  const { ClipboardItem } = window;
  let shareCartURL = '';
  let showMessage = false;
  let shareCartURLIteam = null;

  const copy = async () => {
    shareCartURL = 'Hi Guys';
    const blob = new Blob([shareCartURL], { type: 'text/plain' });
    shareCartURLIteam = new ClipboardItem({ 'text/plain': blob });
    if (typeof ClipboardItem && navigator.clipboard.write) {
      navigator.clipboard.write([shareCartURLIteam]);
    } else {
      await navigator.clipboard.writeText(shareCartURL);
    }
    showMessage = true;
    setTimeout(() => {
      showMessage = false;
    }, 3000);
  };
  return (
    <div>
      <button onClick={copy}>Copy</button>
      <Directory />
      <Outlet />
    </div>
  );
};

export default Home;
