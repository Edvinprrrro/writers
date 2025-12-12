export interface CreateCharacterDto {
  name: string;
  description: string;
  narrativeRole: string;
}

export interface UpdateCharacterDto extends Partial<CreateCharacterDto> {}
