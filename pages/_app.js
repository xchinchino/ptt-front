import React, { useEffect } from 'react'
import t from '~/locales'
import { useStore, Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Helmet from 'react-helmet'
import Layout from '~/components/layout'
import { wrapper } from '../store/index.js'
import { demoActions } from '~/store/demo'
import { currentDemo } from '~/server/queries'
import '@antd/dist/antd.css'
import '~/public/sass/style.scss'

const App = ({ Component, pageProps }) => {
  const store = useStore()

  useEffect(() => {
    if (store.getState().demo.current !== currentDemo) {
      store.dispatch(demoActions.refreshStore(currentDemo))
    }
  }, [])

  return (
    <Provider store={store}>
      <PersistGate
        persistor={store.__persistor}
        loading={
          <div className="loading-overlay">
            <div className="bounce-loader">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
              <div className="bounce4"></div>
            </div>
          </div>
        }
      >
        <Helmet>
          <title>{t('meta.title')}</title>
          <meta charSet="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="keywords" content="React Template" />
          <meta name="description" content="Riode - React eCommerce Template" />
          <meta name="author" content="D-THEMES" />
        </Helmet>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  )
}

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  return { pageProps }
}

export default wrapper.withRedux(App)
