import jwt from "jsonwebtoken";

export default function tokenValited(
  request,
  response,
  next
) {
  const [, token] = request.headers.authorization?.split(' ') || [' ', ' '];
  
  if(!token) return response.status(401).send('Access denied. No token provided.');

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(payload);
    const verified = typeof payload !== 'string' && payload.user;

    if(!payload.user && !verified) {
      return response.send(401).json({ message: 'Invalid token' });
    }

    request.headers['user'] = payload.user;

    return next();
  } catch(error) {
    console.log(error);
    return response.status(401).json({ message: 'Invalid token' });
  }
}