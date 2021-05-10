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

export class ApprovalTagihanDto {

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    tagihan_id: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    status: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    user_id: number;

}

