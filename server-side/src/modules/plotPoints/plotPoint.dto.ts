export interface CreatePlotPointDto {
  title: string;
  content: string;
  order?: string;
}

export interface UpdatePlotPointDto extends Partial<CreatePlotPointDto> {}
