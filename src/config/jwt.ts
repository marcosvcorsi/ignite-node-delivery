export const jwtConfig = {
  clientSecret: String(process.env.JWT_CLIENT_SECRET),
  deliverymanSecret: String(process.env.JWT_DELIVERYMAN_SECRET),
};
