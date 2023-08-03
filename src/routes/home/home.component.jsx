import { Outlet } from 'react-router-dom';

import Directory from '../../components/directory/directory.component';

const Home = () => {
  const { ClipboardItem } = window;
  let shareCartURL = '';
  let showMessage = false;
  let shareCartURLIteam = null;
  const retrieveData = async () => {
    try {
      const response = await fetch(`https://api.publicapis.org/entries`, {
        method: 'GET',
      });
      if (response.ok) {
        let data = await response.json();
        shareCartURL = data?.count;
        const blob = new Blob([shareCartURL], { type: 'text/plain' });
        shareCartURLIteam = new ClipboardItem({ 'text/plain': blob });
      } else {
        // Print user message Unable to copy the Link
        console.error('error getting share a cart Url');
      }
    } catch (error) {
      // Print user message Unable to copy the Link
      console.error(error);
    }
    return;
  };
  const copy = () => {
    retrieveData();
    if (typeof ClipboardItem && navigator.clipboard.write) {
      navigator.clipboard.write([shareCartURLIteam]);
    } else {
      navigator.clipboard.writeText(shareCartURL);
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
