import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { CompositePattern } from './pattern/composite-pattern'
// import { FactoryPattern } from './pattern/factory-pattern'

// import { SingletonPattern } from './pattern/singleton-pattern'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <SingletonPattern /> */}
    {/* <FactoryPattern /> */}
    <CompositePattern />
  </React.StrictMode>,
)
