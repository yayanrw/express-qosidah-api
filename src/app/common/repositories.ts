import JwtRepository from "../repositories/jwt.repository";
import KeywordQosidahRepository from "../repositories/keyword_qosidah.repository";
import QosidahRepository from "../repositories/qosidah.repository";
import QosidahDetailRepository from "../repositories/qosidah_detail.repository";
import UserRepository from "../repositories/user.repository";

const jwtRepository = new JwtRepository();
const keywordQosidahRepository = new KeywordQosidahRepository();
const qosidahDetailRepository = new QosidahDetailRepository();
const qosidahRepository = new QosidahRepository();
const userRepository = new UserRepository();

export {
  jwtRepository,
  keywordQosidahRepository,
  qosidahDetailRepository,
  qosidahRepository,
  userRepository,
};
