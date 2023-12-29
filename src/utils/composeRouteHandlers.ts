// import { NextRequest } from 'next/server'

// export default function composeHandlers(...handlers) {
//   return async function (req: NextRequest, params: {}) {
//     const fn = handlers.reduceRight((next, handler) => {
//       return handler.bind(null, req, params, next)
//     }, null)

//     return fn(req, params)
//   }
// }
