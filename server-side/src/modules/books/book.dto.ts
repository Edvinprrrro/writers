export interface CreateBookDto {
  title: string;
  description?: string;
}

export interface UpdateBookDto extends Partial<CreateBookDto> {}
