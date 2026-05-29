import React from 'react';
import { createRoot } from 'react-dom/client';
import 'katex/dist/katex.min.css';
import Popup from './Popup';

const root = createRoot(document.getElementById('root'));
root.render(<Popup />);