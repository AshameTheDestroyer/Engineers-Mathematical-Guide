import { IsOptional, IsString } from "class-validator";

export class LocalString {
  @IsOptional()
  @IsString({ message: 'en text must be a string' })
  en?: string;
  
  @IsOptional()
  @IsString({ message: 'ar text must be a string' })
  ar?: string;

  constructor(en?: string, ar?: string) {
    if (en) this.en = en;
    if (ar) this.ar = ar;
  }
}