// Middleware to validate request body using Zod schemas

const zodValidate = (schema) => (req, res, next) => {
  const parsed = schema.safeParse(req.body);
  // console.log(parsed.success);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: parsed.error.issues.map((e) => e.message).join(", "),
    });
  }
  req.body = parsed.data;
  next();
};



// Using try catch

// const zodValidate = (schema) => (req, res, next) => {
//   try {
//     const parsed = schema.safeParse(req.body);
//     // console.log("Parsed data:", parsed);

//     if (!parsed.success) {
//       return res.status(400).json({
//         success: false,
//         message: parsed.error.issues.map((e) => e.message).join(", "),
//       });
//     }

//     req.body = parsed.data;
//     next();
//   } catch (err) {
//     return res.status(400).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

export { zodValidate };
