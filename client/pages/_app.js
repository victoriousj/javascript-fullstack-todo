import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import NavigationBar from "../Components/NavigationBar";


import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css'


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

function MyApp({ Component, pageProps }) {

  return (
    <ApolloProvider client={client} >
      <NavigationBar />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
