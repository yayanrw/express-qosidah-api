import AuthService from "../services/auth.service";
import KeywordQosidahService from "../services/keyword_qosidah.service";
import QosidahService from "../services/qosidah.service";
import QosidahDetailService from "../services/qosidah_detail.service";
import UserService from "../services/user.service";

const authService = new AuthService();
const keywordQosidahService = new KeywordQosidahService();
const qosidahService = new QosidahService();
const qosidahDetailService = new QosidahDetailService();
const userService = new UserService();

export {
  authService,
  keywordQosidahService,
  qosidahService,
  qosidahDetailService,
  userService,
};
