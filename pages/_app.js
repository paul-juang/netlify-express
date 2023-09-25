import "../styles/global.css"
import Link from 'next/link'
import {useRouter} from 'next/router'

export default function App({Component, pageProps}) {
  const router = useRouter()
  return (
      <>
         <div>
          <nav className="header-nav">
            <ul>
             <li>
              <Link className={router.pathname=="/" ? "active" : ""} href="/"></Link>
             </li>         
            </ul>
          </nav>
         </div>
          <Component {...pageProps} />
      </>
    );
}