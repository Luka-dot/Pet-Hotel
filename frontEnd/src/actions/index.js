import { FETCH_LOGIN } from './types';

export const fetchLogIn = ( body ) => dispatch => {
    console.log(JSON.stringify(body))
    
      fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
          .then(function (response) {
    console.log(response)
    dispatch({ type: FETCH_LOGIN, payload: response })
    })
    .catch(function (error) {
        console.log(error);
      });
        
    //   .then(res => {
    //       console.log(res)
    //     if (res.status !== 200 && res.status !== 201) {
    //       throw new Error('Log in has Failed!');
    //     }
    //     return res.json();
    //   })
    //   .then(resData => {
    //     console.log(resData, 'user is logged in');
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };




  


//   .then(function (response) {
//     console.log(response)
//     dispatch({ type: FETCH_LOGIN, payload: response.data })
// })

//   fetch('http://localhost:8000/graphql', {
//       method: 'POST',
//       body: JSON.stringify(requestBody),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//       .then(res => {
//         if (res.status !== 200 && res.status !== 201) {
//           throw new Error('Log in has Failed!');
//         }
//         return res.json();
//       })
//       .then(resData => {
//         console.log(resData, 'user is logged in');
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };







// export const increment = (number) => {
//     return {
//         type: 'INCREMENT',
//         payload: number
//     };
// };

// export const decrement = () => {
//     return {
//         type: 'DECREMENT'
//     };
// };
