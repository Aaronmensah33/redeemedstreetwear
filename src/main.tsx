/* Dit is het startpunt van je hele app.
Je kunt het zien als:

“Zet mijn React app in de browser, in dat ene HTML element.”

Niks van je shop-logic zit hier — dit is puur opstarten en inladen. 

dit gaat naar index.html, pakt het element met id "root" en rendert daar de hele React app in.
*/

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import App from './App.tsx'

//pakt de root element van index.html en rendert daar de app in
createRoot(document.getElementById('root')!).render(
  // StrictMode is een hulpprogramma dat helpt bij het opsporen van problemen in de applicatie. Het activeert extra controles en waarschuwingen voor zijn kinderen.
  <StrictMode>
    {/* BrowserRouter is een component dat de routing-functionaliteit van React Router inschakelt. Het maakt het mogelijk om verschillende pagina's te hebben binnen de applicatie zonder dat de pagina volledig opnieuw hoeft te laden. */}
    <BrowserRouter>
        {/* App is het hoofdcomponent van de applicatie dat alle andere componenten bevat. Hier worden de routes en navigatie gedefinieerd. */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)
