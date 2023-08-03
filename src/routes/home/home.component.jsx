import { Outlet } from 'react-router-dom';

import Directory from '../../components/directory/directory.component';

const Home = () => {
  const { ClipboardItem } = window;
  let shareCartURL = '';
  let showMessage = false;
  const copy = async () => {
    try {
      const response = await fetch(`https://api.publicapis.org/entries`, {
        method: 'GET',
      });
      if (response.ok) {
        let data = await response.json();
        shareCartURL = data?.count;
        //Using this for Safari browser on IOS
        if (typeof ClipboardItem && navigator.clipboard.write) {
          const blob = new Blob([shareCartURL], { type: 'text/plain' });
          const shareCartURLIteam = new ClipboardItem({ 'text/plain': blob });
          navigator.clipboard.write([shareCartURLIteam]);
        } else {
          await navigator.clipboard.writeText(shareCartURL);
        }
        showMessage = true;
        setTimeout(() => {
          showMessage = false;
        }, 3000);
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
  return (
    <div>
    <button onClick={copy}>Copy</button>
      <Directory />
      <Outlet />
    </div>
  );
};

export default Home;
