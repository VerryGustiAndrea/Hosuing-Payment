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

export class CheckoutTagihanDto {

    @IsOptional()
    session_id: string;

    @IsOptional()
    url: string;
}


