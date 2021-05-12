import {
    IsEmail,
    IsString,
    IsNumber,
    IsOptional,
    IsMobilePhone,
    IsDateString,
    IsEthereumAddress,
    IsBtcAddress,
    IsNotEmpty,
    ValidateNested,
    IsAlphanumeric,
    IsAlpha,
    MinLength,
    MaxLength,
    isAlphanumeric,

} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInboxDto {

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    user_id: number;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    message: string;

    @IsNotEmpty()
    date: Date;

}


