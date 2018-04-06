module.exports = (ctx, next) => {
  console.log('Need Auth: ', ctx.request);
  const { user } = ctx.request;
  if(!user) {
    ctx.status = 401; // Unauthorized
    return null;
  }
  return next();
};