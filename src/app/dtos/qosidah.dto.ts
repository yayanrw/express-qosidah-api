interface QosidahDto {
  title: string;
  titleLatin?: string;
  titleTranslate?: string;
  keyword?: string[];
  published?: boolean;
  qosidahDetail: QosidahDetailDto[];
}

interface QosidahDetailDto {
  order: number;
  lyrics: string;
  lyricsLatin?: string;
  lyricsTranslate?: string;
}

export { QosidahDto, QosidahDetailDto };
