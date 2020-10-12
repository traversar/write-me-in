const jwt = require('jsonwebtoken');
const uuid = require('uuid').v4;

const { jwtConfig: { secret, expiresIn } } = require('../../config');
const { User } = require('../../db/models');

function generateToken(user) {
  const data = user.toSafeObject();
  const jwtid = uuid();

  return {
    jti: jwtid,
    token: jwt.sign({ data }, secret, { expiresIn: Number.parseInt(expiresIn), jwtid })
  };
}

function restoreUser(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    return next({ status: 401, message: 'no token' });
  }

  return jwt.verify(token, secret, null, async (err, payload) => {
    if (err) {
      res.clearCookie('token');
      err.status = 401;
      return next(err);
    }

    const tokenId = payload.jti;
    console.log(tokenId);
    let user = await User.findOne({where: { tokenId } });
    console.log(user);

    try {
      req.user = await User.findOne({ where: { tokenId } });
    } catch (e) {
      res.clearCookie("token");
      return next({ status: 401, message: "user not found" });
    }

    next();
  });
}

async function loginUser(user) {
  const{ jti, token } = generateToken(user);
  user.tokenId = jti;
  await user.save();
}

const authenticated = [restoreUser];

module.exports = { generateToken, authenticated, loginUser };
