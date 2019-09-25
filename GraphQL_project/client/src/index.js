import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import App from "./App";

const client = new ApolloClient({
  uri: "http://localhost:6301"
});

const AppSet = () => (
  <ApolloProvider client={client}>
    <div>
      {/* <h2>My first Apollo app</h2> */}
      <App />
    </div>
  </ApolloProvider>
);

ReactDOM.render(<AppSet />, document.getElementById("root"));

// client
//   .query({
//     query: gql`
//       {
//         getPost(id: "5d74865ab4bb230f7c6d4f4d") {
//           title
//           body
//           createdAt
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));

// const graphQM = gql`
//   {
//     getPost(id: "5d74865ab4bb230f7c6d4f4d") {
//       id
//       title
//       body
//       createdAt
//     }
//   }
// `;

// function ApolloGraphQM() {
//   const { loading, error, data } = useQuery(graphQM);
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error:</p>;

//   console.log("data", data);

//   return (
//     <div>
//       <p>{data.getPost.title}</p>
//     </div>
//   );

// return data.getPost.map(({ title, id }) => {
//   return (
//     <div key={id}>
//       <p>{title}</p>
//     </div>
//   );
// });
// }
