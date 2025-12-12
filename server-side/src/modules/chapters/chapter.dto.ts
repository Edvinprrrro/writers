export interface CreateChapterDto {
  title: string;
  content: string;
  order: number;
}

export interface UpdateChapterDto extends Partial<CreateChapterDto> {}
