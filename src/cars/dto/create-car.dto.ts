import { IsString } from "class-validator";

export class CreateCarDto {
    @IsString({message: "Please enter a valid name 'brand'"})
    readonly brand: string;
    @IsString()
    readonly model: string;

}