export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // 스페이스를 -로
    .replace(/[^\w\-]+/g, '') // 영문, 숫자, - 이외 제거 (한글 지원 필요 시 수정 필요)
    .replace(/\-\-+/g, '-');  // 연속된 -를 하나로
};
