import { App } from './src/App';
import { createRoot } from 'react-dom/client'

const root = createRoot(document.querySelector('#app'));

root.render(<App />)