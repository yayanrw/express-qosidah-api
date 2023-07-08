import QosidahDetailDto from "./qosidah_detail.dto";

export default interface QosidahDto {
  title: string;
  titleLatin?: string;
  titleTranslate?: string;
  keyword?: string[];
  published?: boolean;
  qosidahDetail: QosidahDetailDto[];
}
