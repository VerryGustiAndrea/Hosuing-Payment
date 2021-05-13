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

    // @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    trx_id: number;

    // @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    sid: number;

    // @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    status: number;

    via: string;

}

